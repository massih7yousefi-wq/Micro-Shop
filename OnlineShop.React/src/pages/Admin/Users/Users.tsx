import {
    useEffect,
    useState,
} from "react";

import axios from "axios";

import {
    deleteUser,
    updateUser,
    changeUserRole,
    setUserActive,
    setUserLock,
} from "../../../api/adminUserApi";

import type {
    AdminUser,
    AdminUpdateUserModel,
    IdentityError,
} from "../../../types/adminUser";

import {
    useAdminUsers,
} from "../../../hooks/useAdminUsers";

import UserSearch
    from "./components/UserSearch";

import UserTable
    from "./components/UserTable";

import UserPagination
    from "./components/UserPagination";

import UserDetailsModal
    from "./components/UserDetailsModal";

import EditUserModal
    from "./components/EditUserModal";

import ChangeRoleModal
    from "./components/ChangeRoleModal";

import DeleteUserModal
    from "./components/DeleteUserModal";

import UserStatusModal
    from "./components/UserStatusModal";


type ModalType =
    | "details"
    | "edit"
    | "role"
    | "delete"
    | "status"
    | null;


type StatusAction =
    | "active"
    | "lock"
    | null;


interface ApiErrorResponse {
    message?: string;
}


// Users
// ------------------------------------------------------------

export default function Users() {

    const [search, setSearch] =
        useState("");


    const {
        users,
        totalCount,
        totalPages,
        currentPage,
        setCurrentPage,
        loading,
        error,
        refetch,
    } = useAdminUsers({
        search,
        pageSize: 20,
    });


    const [
        selectedUser,
        setSelectedUser,
    ] =
        useState<AdminUser | null>(null);


    const [
        modal,
        setModal,
    ] =
        useState<ModalType>(null);


    const [
        statusAction,
        setStatusAction,
    ] =
        useState<StatusAction>(null);


    const [
        actionLoading,
        setActionLoading,
    ] =
        useState(false);


    const [
        actionError,
        setActionError,
    ] =
        useState<string | null>(null);


    // Search
    // ------------------------------------------------------------

    useEffect(() => {

        setCurrentPage(1);

    }, [
        search,
        setCurrentPage,
    ]);


    // Open Modal
    // ------------------------------------------------------------

    const openModal = (
        user: AdminUser,
        type: ModalType
    ) => {

        setSelectedUser(user);

        setModal(type);

        setActionError(null);
    };


    // Close Modal
    // ------------------------------------------------------------

    const closeModal = () => {

        setModal(null);

        setSelectedUser(null);

        setStatusAction(null);

        setActionError(null);
    };


    // Update User
    // ------------------------------------------------------------

    const handleUpdate =
        async (
            model: AdminUpdateUserModel
        ) => {

            if (!selectedUser) {
                return;
            }

            try {

                setActionLoading(true);
                setActionError(null);

                await updateUser(
                    selectedUser.id,
                    model
                );

                closeModal();

                await refetch();

            } catch (error: unknown) {

                setActionError(
                    extractApiError(error)
                );

            } finally {

                setActionLoading(false);
            }
        };


    // Change Role
    // ------------------------------------------------------------

    const handleChangeRole =
        async (
            role: string
        ) => {

            if (!selectedUser) {
                return;
            }

            try {

                setActionLoading(true);
                setActionError(null);

                await changeUserRole(
                    selectedUser.id,
                    role
                );

                closeModal();

                await refetch();

            } catch (error: unknown) {

                setActionError(
                    extractApiError(error)
                );

            } finally {

                setActionLoading(false);
            }
        };


    // Set Active
    // ------------------------------------------------------------

    const handleSetActive =
        async () => {

            if (!selectedUser) {
                return;
            }

            try {

                setActionLoading(true);
                setActionError(null);

                await setUserActive(
                    selectedUser.id,
                    !selectedUser.isActive
                );

                closeModal();

                await refetch();

            } catch (error: unknown) {

                setActionError(
                    extractApiError(error)
                );

            } finally {

                setActionLoading(false);
            }
        };


    // Set Lock
    // ------------------------------------------------------------

    const handleSetLock =
        async () => {

            if (!selectedUser) {
                return;
            }

            try {

                setActionLoading(true);
                setActionError(null);

                await setUserLock(
                    selectedUser.id,
                    !selectedUser.isLockedOut
                );

                closeModal();

                await refetch();

            } catch (error: unknown) {

                setActionError(
                    extractApiError(error)
                );

            } finally {

                setActionLoading(false);
            }
        };


    // Delete User
    // ------------------------------------------------------------

    const handleDelete =
        async () => {

            if (!selectedUser) {
                return;
            }

            try {

                setActionLoading(true);
                setActionError(null);

                await deleteUser(
                    selectedUser.id
                );

                closeModal();

                if (
                    users.length === 1 &&
                    currentPage > 1
                ) {

                    setCurrentPage(
                        currentPage - 1
                    );

                    return;
                }

                await refetch();

            } catch (error: unknown) {

                setActionError(
                    extractApiError(error)
                );

            } finally {

                setActionLoading(false);
            }
        };


    // Render
    // ------------------------------------------------------------

    return (
        <section>

            <header>

                <h1>
                    Users
                </h1>

                <p>
                    Total users: {totalCount}
                </p>

            </header>


            <UserSearch
                value={search}
                onChange={setSearch}
            />


            {loading && (
                <p>
                    Loading users...
                </p>
            )}


            {error && (
                <div>

                    <p>
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() => {
                            void refetch();
                        }}
                    >
                        Retry
                    </button>

                </div>
            )}


            {!loading &&
                !error && (

                    <UserTable
                        users={users}

                        onView={(user) =>
                            openModal(
                                user,
                                "details"
                            )
                        }

                        onEdit={(user) =>
                            openModal(
                                user,
                                "edit"
                            )
                        }

                        onRole={(user) =>
                            openModal(
                                user,
                                "role"
                            )
                        }

                        onActive={(user) => {

                            openModal(
                                user,
                                "status"
                            );

                            setStatusAction(
                                "active"
                            );
                        }}

                        onLock={(user) => {

                            openModal(
                                user,
                                "status"
                            );

                            setStatusAction(
                                "lock"
                            );
                        }}

                        onDelete={(user) =>
                            openModal(
                                user,
                                "delete"
                            )
                        }
                    />

                )}


            {!loading &&
                !error && (

                    <UserPagination
                        currentPage={
                            currentPage
                        }

                        totalPages={
                            totalPages
                        }

                        onPageChange={
                            setCurrentPage
                        }
                    />

                )}


            <UserDetailsModal
                user={
                    modal === "details"
                        ? selectedUser
                        : null
                }

                onClose={
                    closeModal
                }
            />


            <EditUserModal
                user={
                    modal === "edit"
                        ? selectedUser
                        : null
                }

                loading={
                    actionLoading
                }

                error={
                    actionError
                }

                onClose={
                    closeModal
                }

                onSubmit={
                    handleUpdate
                }
            />


            <ChangeRoleModal
                user={
                    modal === "role"
                        ? selectedUser
                        : null
                }

                loading={
                    actionLoading
                }

                error={
                    actionError
                }

                onClose={
                    closeModal
                }

                onSubmit={
                    handleChangeRole
                }
            />


            <DeleteUserModal
                user={
                    modal === "delete"
                        ? selectedUser
                        : null
                }

                loading={
                    actionLoading
                }

                error={
                    actionError
                }

                onClose={
                    closeModal
                }

                onConfirm={
                    handleDelete
                }
            />


            <UserStatusModal
                user={
                    modal === "status"
                        ? selectedUser
                        : null
                }

                action={
                    statusAction
                }

                loading={
                    actionLoading
                }

                error={
                    actionError
                }

                onClose={
                    closeModal
                }

                onConfirm={
                    statusAction === "active"
                        ? handleSetActive
                        : handleSetLock
                }
            />

        </section>
    );
}


// API Error Helper
// ------------------------------------------------------------

function extractApiError(
    error: unknown
): string {

    if (!axios.isAxiosError(error)) {

        if (error instanceof Error) {
            return error.message;
        }

        return "Something went wrong.";
    }


    const data: unknown =
        error.response?.data;


    if (Array.isArray(data)) {

        const identityErrors =
            data as IdentityError[];

        return identityErrors
            .map(
                item =>
                    item.description
            )
            .filter(Boolean)
            .join(", ")
            ||
            "Request failed.";
    }


    if (
        typeof data === "object" &&
        data !== null &&
        "message" in data
    ) {

        const response =
            data as ApiErrorResponse;

        if (
            typeof response.message ===
            "string"
        ) {
            return response.message;
        }
    }


    if (
        typeof data === "string"
    ) {
        return data;
    }


    switch (
        error.response?.status
    ) {

        case 400:
            return "Invalid request.";

        case 401:
            return "Your session has expired.";

        case 403:
            return "You do not have permission to perform this action.";

        case 404:
            return "User not found.";

        case 500:
            return "Server error.";

        default:
            return "Request failed.";
    }
}

