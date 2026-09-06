import {
    createContext,
    useContext,
} from "react";

import type {
    AuthResponse,
    ChangePasswordRequest,
    ForgotPasswordRequest,
    LoginRequest,
    RegisterRequest,
    ResetPasswordRequest,
} from "../types/auth";

export interface AuthContextValue {


    // State-------------------------------------------------------


    user: AuthResponse | null;

    isAuthenticated: boolean;

    isLoading: boolean;

    // Authentication-------------------------------------------------------

    login: (
        data: LoginRequest
    ) => Promise<AuthResponse>;

    register: (
        data: RegisterRequest
    ) => Promise<void>;

    logout: () => Promise<void>;
    // Password-------------------------------------------------------


    forgotPassword: (
        data: ForgotPasswordRequest
    ) => Promise<void>;

    resetPassword: (
        data: ResetPasswordRequest
    ) => Promise<void>;

    changePassword: (
        data: ChangePasswordRequest
    ) => Promise<void>;


    // Session-------------------------------------------------------


    refreshSession: () => Promise<boolean>;

    loadCurrentUser: () => Promise<void>;
}

export const AuthContext =
    createContext<AuthContextValue | undefined>(
        undefined
    );

// Hook------------------------------------------------------


export function useAuth(): AuthContextValue {

    const context =
        useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider."
        );
    }

    return context;
}