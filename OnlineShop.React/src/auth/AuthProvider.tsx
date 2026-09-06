import {
    useCallback,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import { accountApi } from "../api/accountApi";

import type {
    AuthResponse,
    ChangePasswordRequest,
    ForgotPasswordRequest,
    LoginRequest,
    RegisterRequest,
    ResetPasswordRequest,
} from "../types/auth";

import {
    clearAuth,
    getRefreshToken,
    getStoredUser,
    saveAuth,
} from "./authStorage";

import {
    AuthContext,
    type AuthContextValue,
} from "./AuthContext";
// Props----------------------------------------------

interface AuthProviderProps {
    children: ReactNode;
}

// Provider----------------------------------------------


export function AuthProvider({
                                 children,
                             }: AuthProviderProps) {

    const [user, setUser] =
        useState<AuthResponse | null>(
            () => getStoredUser()
        );

    const [isLoading, setIsLoading] =
        useState(true);

    // Login----------------------------------------------

    const login = useCallback(
        async (
            data: LoginRequest
        ): Promise<AuthResponse> => {

            const auth =
                await accountApi.login(data);

            saveAuth(auth);

            setUser(auth);

            return auth;
        },
        []
    );
    // Register----------------------------------------------

    const register = useCallback(
        async (
            data: RegisterRequest
        ): Promise<void> => {

            await accountApi.register(data);
        },
        []
    );

    // Logout----------------------------------------------

    const logout = useCallback(
        async (): Promise<void> => {

            const refreshToken =
                getRefreshToken();

            try {

                if (refreshToken) {

                    await accountApi.logout({
                        refreshToken,
                    });
                }

            } finally {

                clearAuth();

                setUser(null);
            }
        },
        []
    );

    // Forgot Password----------------------------------------------

    const forgotPassword = useCallback(
        async (
            data: ForgotPasswordRequest
        ): Promise<void> => {

            await accountApi.forgotPassword(
                data
            );
        },
        []
    );
    // Reset Password----------------------------------------------

    const resetPassword = useCallback(
        async (
            data: ResetPasswordRequest
        ): Promise<void> => {

            await accountApi.resetPassword(
                data
            );
        },
        []
    );

    // Change Password-----------------------------------------------

    const changePassword = useCallback(
        async (
            data: ChangePasswordRequest
        ): Promise<void> => {

            await accountApi.changePassword(
                data
            );

            // Backend revokes all refresh tokens
            // after successful password change.

            clearAuth();

            setUser(null);
        },
        []
    );

    // Refresh Session--------------------------------------------


    const refreshSession =
        useCallback(
            async (): Promise<boolean> => {

                const refreshToken =
                    getRefreshToken();

                if (!refreshToken) {

                    clearAuth();

                    setUser(null);

                    return false;
                }

                try {

                    const auth =
                        await accountApi.refresh({
                            refreshToken,
                        });

                    saveAuth(auth);

                    setUser(auth);

                    return true;

                } catch {

                    clearAuth();

                    setUser(null);

                    return false;
                }
            },
            []
        );

    // Load Current User----------------------------------------------

    const loadCurrentUser =
        useCallback(
            async (): Promise<void> => {

                try {

                    const currentUser =
                        await accountApi
                            .getCurrentUser();

                    setUser(
                        previous => {

                            if (!previous) {
                                return previous;
                            }

                            return {
                                ...previous,
                                userId:
                                currentUser.userId,
                                userName:
                                currentUser.userName,
                                email:
                                currentUser.email,
                                roles:
                                currentUser.roles,
                            };
                        }
                    );

                } catch {

                    clearAuth();

                    setUser(null);
                }
            },
            []
        );


    // Initial Authentication----------------------------------------------

    useEffect(() => {

        let mounted = true;

        async function initializeAuth() {

            const storedUser =
                getStoredUser();

            const refreshToken =
                getRefreshToken();

            // No stored authentication----------------------------------------------

            if (
                !storedUser ||
                !refreshToken
            ) {

                if (mounted) {
                    setIsLoading(false);
                }

                return;
            }
            // Try current access token first----------------------------------------------

            try {

                await accountApi
                    .getCurrentUser();

                if (mounted) {
                    setUser(storedUser);
                }

            } catch {


                // Access token may be expired.
                // Try refresh----------------------------------------------


                try {

                    const auth =
                        await accountApi.refresh({
                            refreshToken,
                        });

                    saveAuth(auth);

                    if (mounted) {
                        setUser(auth);
                    }

                } catch {

                    clearAuth();

                    if (mounted) {
                        setUser(null);
                    }
                }
            }

            if (mounted) {
                setIsLoading(false);
            }
        }

        initializeAuth();

        return () => {
            mounted = false;
        };

    }, []);

    // Derived State----------------------------------------------


    const isAuthenticated =
        user !== null;

    // Context Value----------------------------------------------


    const value =
        useMemo<AuthContextValue>(
            () => ({
                user,
                isAuthenticated,
                isLoading,

                login,
                register,
                logout,

                forgotPassword,
                resetPassword,
                changePassword,

                refreshSession,
                loadCurrentUser,
            }),
            [
                user,
                isAuthenticated,
                isLoading,

                login,
                register,
                logout,

                forgotPassword,
                resetPassword,
                changePassword,

                refreshSession,
                loadCurrentUser,
            ]
        );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}