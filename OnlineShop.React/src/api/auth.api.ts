import { api, revokeRefreshToken } from "../services/api";

// Types-----------------------------------------------------

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
    userId: string;
    userName: string;
    email: string;
    roles: string[];
}

export interface CurrentUserResponse {
    userId: string;
    userName: string;
    email: string;
    roles: string[];
}

export interface RegisterRequest {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    email: string;
    token: string;
    newPassword: string;
    confirmNewPassword: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

// API Response Types----------------------------------------------


export interface MessageResponse {
    message: string;
}

export interface IdentityError {
    code: string;
    description: string;
}

export interface ApiErrorResponse {
    message?: string;
    errors?: IdentityError[];
}
// Register-----------------------------------------------


export async function register(
    data: RegisterRequest
): Promise<MessageResponse> {
    const response =
        await api.post<MessageResponse>(
            "/Account/register",
            data
        );

    return response.data;
}

// Login-----------------------------------------------


export async function login(
    data: LoginRequest
): Promise<AuthResponse> {
    const response =
        await api.post<AuthResponse>(
            "/Account/login",
            data
        );

    return response.data;
}

// Confirm Email-----------------------------------------------


export async function confirmEmail(
    userId: string,
    token: string
): Promise<MessageResponse> {
    const response =
        await api.get<MessageResponse>(
            "/Account/confirm-email",
            {
                params: {
                    userId,
                    token,
                },
            }
        );

    return response.data;
}

// Forgot Password-----------------------------------------------

export async function forgotPassword(
    data: ForgotPasswordRequest
): Promise<MessageResponse> {
    const response =
        await api.post<MessageResponse>(
            "/Account/forgot-password",
            data
        );

    return response.data;
}

// Reset Password-----------------------------------------------
export async function resetPassword(
    data: ResetPasswordRequest
): Promise<MessageResponse> {
    const response =
        await api.post<MessageResponse>(
            "/Account/reset-password",
            data
        );

    return response.data;
}

// Change Password-----------------------------------------------
export async function changePassword(
    data: ChangePasswordRequest
): Promise<MessageResponse> {
    const response =
        await api.post<MessageResponse>(
            "/Account/change-password",
            data
        );

    return response.data;
}

// Refresh Token-----------------------------------------------

export async function refreshToken(
    data: RefreshTokenRequest
): Promise<AuthResponse> {
    const response =
        await api.post<AuthResponse>(
            "/Account/refresh",
            data
        );

    return response.data;
}

// Logout----------------------------------------------------

export async function logout(): Promise<void> {
    await revokeRefreshToken();
}

// Current User----------------------------------------

export async function getCurrentUser(): Promise<CurrentUserResponse> {
    const response =
        await api.get<CurrentUserResponse>(
            "/Account/me"
        );

    return response.data;
}

