import axios, {
    AxiosError,
    type AxiosRequestConfig,
    type InternalAxiosRequestConfig,
} from "axios";

import {
    clearAuth,
    getAccessToken,
    getRefreshToken,
    saveAuth,
} from "../auth/authStorage";

import type {
    AuthResponse,
} from "../types/auth";

export const API_BASE =
    import.meta.env.VITE_API_BASE_URL;

if (!API_BASE) {
    throw new Error(
        "VITE_API_BASE_URL is not configured."
    );
}


// Axios Instances----------------------------------------------

export const api = axios.create({
    baseURL: `${API_BASE}/api`,
    timeout: 30000,
    headers: {
        Accept: "application/json",
    },
});

const refreshClient = axios.create({
    baseURL: `${API_BASE}/api`,
    timeout: 30000,
    headers: {
        Accept: "application/json",
    },
});

// Types----------------------------------------------

type RetryableRequestConfig =
    AxiosRequestConfig & {
    _retry?: boolean;
};


// Refresh State----------------------------------------------


let refreshPromise:
    Promise<AuthResponse | null> | null = null;


// Request Interceptor----------------------------------------------

api.interceptors.request.use(
    (
        config: InternalAxiosRequestConfig
    ) => {

        const accessToken =
            getAccessToken();

        if (
            accessToken &&
            !config.headers.Authorization
        ) {
            config.headers.Authorization =
                `Bearer ${accessToken}`;
        }

        return config;
    }
);


// Response Interceptor----------------------------------------------

api.interceptors.response.use(

    response => response,

    async (
        error: AxiosError
    ) => {

        const status =
            error.response?.status;

        const originalRequest =
            error.config as
                | RetryableRequestConfig
                | undefined;

        // Only handle 401----------------------------------------------

        if (
            status !== 401 ||
            !originalRequest
        ) {
            return Promise.reject(error);
        }

        // Never retry the same request twice----------------------------------------------

        if (
            originalRequest._retry
        ) {
            clearAuth();

            return Promise.reject(error);
        }
        // Don't refresh authentication endpoints----------------------------------------------

        const requestUrl =
            originalRequest.url ?? "";

        const isAuthRequest =
            requestUrl.includes(
                "/account/login"
            ) ||
            requestUrl.includes(
                "/account/register"
            ) ||
            requestUrl.includes(
                "/account/refresh"
            ) ||
            requestUrl.includes(
                "/account/logout"
            );

        if (isAuthRequest) {
            return Promise.reject(error);
        }

        // Refresh Token----------------------------------------------

        const refreshToken =
            getRefreshToken();

        if (!refreshToken) {

            clearAuth();

            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {

            // Prevent multiple refresh requests----------------------------------------------

            if (!refreshPromise) {

                refreshPromise =
                    refreshAccessToken(
                        refreshToken
                    );

            }

            const auth =
                await refreshPromise;

            refreshPromise = null;

            // Refresh failed----------------------------------------------

            if (!auth) {

                clearAuth();

                return Promise.reject(error);
            }

            // Retry original request---------------------------------------

            originalRequest.headers =
                originalRequest.headers ?? {};

            originalRequest.headers.Authorization =
                `Bearer ${auth.accessToken}`;

            return api.request(
                originalRequest
            );

        } catch (refreshError) {

            refreshPromise = null;

            clearAuth();

            return Promise.reject(
                refreshError
            );
        }
    }
);
// Refresh Access Token----------------------------------------------


async function refreshAccessToken(
    refreshToken: string
): Promise<AuthResponse | null> {

    try {

        const response =
            await refreshClient.post<AuthResponse>(
                "/account/refresh",
                {
                    refreshToken,
                }
            );

        const auth =
            response.data;

        // Backend rotates BOTH tokens----------------------------------------------

        saveAuth(auth);

        return auth;

    } catch {

        return null;
    }
}