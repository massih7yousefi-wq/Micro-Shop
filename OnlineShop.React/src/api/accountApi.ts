import { api } from "./client.ts";

import type {
    ApiMessageResponse,
    AuthResponse,
    ChangePasswordRequest,
    CurrentUserResponse,
    ForgotPasswordRequest,
    LoginRequest,
    RefreshTokenRequest,
    RegisterRequest,
    ResetPasswordRequest,
} from "../types/auth";

// Account API--------------------------------------------------

export const accountApi = {

    // Register
    // POST /api/account/register--------------------------------------------------

    register: async (
        data: RegisterRequest
    ): Promise<ApiMessageResponse> => {

        const response =
            await api.post<ApiMessageResponse>(
                "/account/register",
                data
            );

        return response.data;
    },

    // Login
    // POST /api/account/login--------------------------------------------------


    login: async (
        data: LoginRequest
    ): Promise<AuthResponse> => {

        const response =
            await api.post<AuthResponse>(
                "/account/login",
                data
            );

        return response.data;
    },


    // Confirm Email
    // GET /api/account/confirm-email--------------------------------------------------


    confirmEmail: async (
        userId: string,
        token: string
    ): Promise<ApiMessageResponse> => {

        const response =
            await api.get<ApiMessageResponse>(
                "/account/confirm-email",
                {
                    params: {
                        userId,
                        token,
                    },
                }
            );

        return response.data;
    },

    // Forgot Password
    // POST /api/account/forgot-password--------------------------------------------------


    forgotPassword: async (
        data: ForgotPasswordRequest
    ): Promise<ApiMessageResponse> => {

        const response =
            await api.post<ApiMessageResponse>(
                "/account/forgot-password",
                data
            );

        return response.data;
    },

    // Reset Password
    // POST /api/account/reset-password--------------------------------------------------

    resetPassword: async (
        data: ResetPasswordRequest
    ): Promise<ApiMessageResponse> => {

        const response =
            await api.post<ApiMessageResponse>(
                "/account/reset-password",
                data
            );

        return response.data;
    },

    // Change Password
    // POST /api/account/change-password--------------------------------------------------

    changePassword: async (
        data: ChangePasswordRequest
    ): Promise<ApiMessageResponse> => {

        const response =
            await api.post<ApiMessageResponse>(
                "/account/change-password",
                data
            );

        return response.data;
    },

    // Refresh Token
    // POST /api/account/refresh--------------------------------------------------

    refresh: async (
        data: RefreshTokenRequest
    ): Promise<AuthResponse> => {

        const response =
            await api.post<AuthResponse>(
                "/account/refresh",
                data
            );

        return response.data;
    },

    // Logout
    // POST /api/account/logout--------------------------------------------------

    logout: async (
        data: RefreshTokenRequest
    ): Promise<ApiMessageResponse> => {

        const response =
            await api.post<ApiMessageResponse>(
                "/account/logout",
                data
            );

        return response.data;
    },

    // Current User
    // GET /api/account/me--------------------------------------------------

    getCurrentUser: async (): Promise<CurrentUserResponse> => {

        const response =
            await api.get<CurrentUserResponse>(
                "/account/me"
            );

        return response.data;
    },

    // Admin Check
    // GET /api/account/admin-------------------------------

    adminCheck: async (): Promise<ApiMessageResponse & {
        userName: string;
    }> => {

        const response =
            await api.get<
                ApiMessageResponse & {
                userName: string;
            }
            >(
                "/account/admin"
            );

        return response.data;
    },
};