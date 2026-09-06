import { api } from "../services/api";

import type {
    AdminUser,
    AdminUserListResponse,
    AdminUpdateUserModel,
    ChangeUserRoleModel,
    ApiMessageResponse,
} from "../types/adminUser";

// Get Users----------------------------------------------

export async function getUsers(
    search?: string,
    page: number = 1,
    pageSize: number = 20
): Promise<AdminUserListResponse> {

    const response =
        await api.get<AdminUserListResponse>(
            "/admin/users",
            {
                params: {
                    search:
                        search?.trim() || undefined,

                    page,
                    pageSize,
                },
            }
        );

    return response.data;
}


// Get User----------------------------------------------
export async function getUser(
    id: string
): Promise<AdminUser> {

    const response =
        await api.get<AdminUser>(
            `/admin/users/${id}`
        );

    return response.data;
}


// Update User----------------------------------------------

export async function updateUser(
    id: string,
    model: AdminUpdateUserModel
): Promise<ApiMessageResponse> {

    const response =
        await api.put<ApiMessageResponse>(
            `/admin/users/${id}`,
            model
        );

    return response.data;
}


// Change Role----------------------------------------------

export async function changeUserRole(
    id: string,
    role: string
): Promise<ApiMessageResponse> {

    const model: ChangeUserRoleModel = {
        role: role.trim(),
    };

    const response =
        await api.patch<ApiMessageResponse>(
            `/admin/users/${id}/role`,
model
);

return response.data;
}


// Set Active----------------------------------------------

export async function setUserActive(
    id: string,
    value: boolean
): Promise<ApiMessageResponse> {

    const response =
        await api.patch<ApiMessageResponse>(
            `/admin/users/${id}/active`,
            null,
            {
                params: {
                    value,
                },
            }
        );

    return response.data;
}


// Set Lock----------------------------------------------

export async function setUserLock(
    id: string,
    value: boolean
): Promise<ApiMessageResponse> {

    const response =
        await api.patch<ApiMessageResponse>(
            `/admin/users/${id}/lock`,
            null,
            {
                params: {
                    value,
                },
            }
        );

    return response.data;
}


// Delete User----------------------------------------------


export async function deleteUser(
    id: string
): Promise<void> {

    await api.delete(
        `/admin/users/${id}`
    );
}

