import type { AuthResponse } from "../types/auth";

const ACCESS_TOKEN_KEY = "microshop_access_token";
const REFRESH_TOKEN_KEY = "microshop_refresh_token";
const AUTH_USER_KEY = "microshop_auth_user";


// Access Token----------------------------------------

export function getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(
    accessToken: string
): void {
    localStorage.setItem(
        ACCESS_TOKEN_KEY,
        accessToken
    );
}

export function removeAccessToken(): void {
    localStorage.removeItem(
        ACCESS_TOKEN_KEY
    );
}

// Refresh Token----------------------------------------

export function getRefreshToken(): string | null {
    return localStorage.getItem(
        REFRESH_TOKEN_KEY
    );
}

export function setRefreshToken(
    refreshToken: string
): void {
    localStorage.setItem(
        REFRESH_TOKEN_KEY,
        refreshToken
    );
}

export function removeRefreshToken(): void {
    localStorage.removeItem(
        REFRESH_TOKEN_KEY
    );
}
// Auth User----------------------------------------

export function getStoredUser(): AuthResponse | null {

    const storedUser =
        localStorage.getItem(
            AUTH_USER_KEY
        );

    if (!storedUser) {
        return null;
    }

    try {

        return JSON.parse(
            storedUser
        ) as AuthResponse;

    } catch {

        localStorage.removeItem(
            AUTH_USER_KEY
        );

        return null;
    }
}

export function setStoredUser(
    user: AuthResponse
): void {

    localStorage.setItem(
        AUTH_USER_KEY,
        JSON.stringify(user)
    );
}

export function removeStoredUser(): void {
    localStorage.removeItem(
        AUTH_USER_KEY
    );
}

// Save Authentication----------------------------------------

export function saveAuth(
    auth: AuthResponse
): void {

    setAccessToken(
        auth.accessToken
    );

    setRefreshToken(
        auth.refreshToken
    );

    setStoredUser(
        auth
    );
}


// Clear Authentication----------------------------------------


export function clearAuth(): void {

    removeAccessToken();

    removeRefreshToken();

    removeStoredUser();
}