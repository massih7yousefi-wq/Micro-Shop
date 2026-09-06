export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
    userId: string;
    userName: string;
    email: string;
    roles: string[];
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
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

export interface ApiMessageResponse {
    message: string;
}

export interface ApiError {
    code?: string;
    description?: string;
}

export interface ApiErrorResponse {
    message?: string;
    errors?: ApiError[];
}

export interface CurrentUserResponse {
    userId: string;
    userName: string;
    email: string;
    roles: string[];
}