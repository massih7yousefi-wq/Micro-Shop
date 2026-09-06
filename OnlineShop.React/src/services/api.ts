import axios, {
    AxiosError,
    type AxiosRequestConfig,
} from "axios";

// Configuration----------------------------------------------


export const API_BASE =
    import.meta.env.VITE_API_BASE_URL;

if (!API_BASE) {
    throw new Error(
        "VITE_API_BASE_URL is not configured."
    );
}

// Types-------------------------------------------------------

interface RetryableRequestConfig
    extends AxiosRequestConfig {
    _retry?: boolean;
}


// Storage Keys----------------------------------------------------


const ACCESS_TOKEN_KEY = "microshop_access_token";
const REFRESH_TOKEN_KEY = "microshop_refresh_token";


// Token Storage-------------------------------------------------


export const tokenStorage = {
    getAccessToken(): string | null {
        return localStorage.getItem(
            ACCESS_TOKEN_KEY
        );
    },

    getRefreshToken(): string | null {
        return localStorage.getItem(
            REFRESH_TOKEN_KEY
        );
    },

    setTokens(
        accessToken: string,
        refreshToken: string
    ): void {
        localStorage.setItem(
            ACCESS_TOKEN_KEY,
            accessToken
        );

        localStorage.setItem(
            REFRESH_TOKEN_KEY,
            refreshToken
        );
    },

    clear(): void {
        localStorage.removeItem(
            ACCESS_TOKEN_KEY
        );

        localStorage.removeItem(
            REFRESH_TOKEN_KEY
        );
    },
};


// Axios Instance--------------------------------------------------


export const api = axios.create({
    baseURL: `${API_BASE}/api`,
timeout: 30000,
    headers: {
    Accept: "application/json",
        "Content-Type": "application/json",
},
});


// Refresh State--------------------------------------------------------


let isRefreshing = false;

let refreshPromise: Promise<string | null> | null =
    null;

// Refresh Access Token-----------------------------------------------------------


async function refreshAccessToken(): Promise<string | null> {
    const refreshToken =
        tokenStorage.getRefreshToken();

    if (!refreshToken) {
        return null;
    }

    if (isRefreshing && refreshPromise) {
        return refreshPromise;
    }

    isRefreshing = true;

    refreshPromise = (async () => {
        try {
            const response =
                await axios.post<{
                    accessToken: string;
                    refreshToken: string;
                    expiresAt: string;
                    userId: string;
                    userName: string;
                    email: string;
                    roles: string[];
                }>(
                    `${API_BASE}/api/Account/refresh`,
                    {
                        refreshToken,
                    },
                    {
                        timeout: 30000,
                        headers: {
                            Accept:
                                "application/json",
                            "Content-Type":
                                "application/json",
                        },
                    }
                );

            const {
                accessToken,
                refreshToken: newRefreshToken,
            } = response.data;

            tokenStorage.setTokens(
                accessToken,
                newRefreshToken
            );

            return accessToken;
        } catch {
            tokenStorage.clear();

            return null;
        } finally {
            isRefreshing = false;
            refreshPromise = null;
        }
    })();

    return refreshPromise;
}

// Request Interceptor-----------------------------------------------------

api.interceptors.request.use(
    (config) => {
        const accessToken =
            tokenStorage.getAccessToken();

        if (accessToken) {
            config.headers.Authorization =
                `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor--------------------------------------------

api.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
        const originalRequest =
            error.config as
                | RetryableRequestConfig
                | undefined;

        if (!originalRequest) {
            return Promise.reject(error);
        }

        const status =
            error.response?.status;

        const requestUrl =
            originalRequest.url ?? "";

        const isAuthRequest =
            requestUrl.includes(
                "/Account/login"
            ) ||
            requestUrl.includes(
                "/Account/register"
            ) ||
            requestUrl.includes(
                "/Account/refresh"
            ) ||
            requestUrl.includes(
                "/Account/logout"
            );

        if (
            status !== 401 ||
            originalRequest._retry ||
            isAuthRequest
        ) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        const newAccessToken =
            await refreshAccessToken();

        if (!newAccessToken) {
            return Promise.reject(error);
        }

        originalRequest.headers =
            originalRequest.headers ?? {};

        originalRequest.headers.Authorization =
            `Bearer ${newAccessToken}`;

        return api(originalRequest);
    }
);
// Logout Helper---------------------------------------------------------
export async function revokeRefreshToken(): Promise<void> {
    const refreshToken =
        tokenStorage.getRefreshToken();

    if (!refreshToken) {
        tokenStorage.clear();
        return;
    }

    try {
        await axios.post(
            `${API_BASE}/api/Account/logout`,
            {
                refreshToken,
            },
            {
                timeout: 30000,
                headers: {
                    Accept:
                        "application/json",
                    "Content-Type":
                        "application/json",
                },
            }
        );
    } finally {
        tokenStorage.clear();
    }
}

