export interface AdminUser {
    id: string;
    userName: string;
    email: string;
    phoneNumber: string | null;

    emailConfirmed: boolean;

    isActive: boolean;
    isLockedOut: boolean;

    lockoutEnd: string | null;

    roles: string[];
}

export interface AdminUserListResponse {
    users: AdminUser[];

    page: number;
    pageSize: number;

    totalCount: number;
    totalPages: number;
}

export interface AdminUpdateUserModel {
    userName: string;
    email: string;
    phoneNumber: string | null;
}

export interface ChangeUserRoleModel {
    role: string;
}

export interface ApiMessageResponse {
    message: string;
}

export interface IdentityError {
    code: string;
    description: string;
}

export const ADMIN_ROLES = [
    "User",
    "Admin",
] as const;

export type AdminRole =
    typeof ADMIN_ROLES[number];

