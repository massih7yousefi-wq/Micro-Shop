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

import "./Users.css";


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
    // --------------------------------------------------------

    useEffect(() => {

        setCurrentPage(1);

    }, [
        search,
        setCurrentPage,
    ]);


    // Open Modal
    // --------------------------------------------------------

    const openModal = (
        user: AdminUser,
        type: ModalType
    ) => {

        setSelectedUser(user);

        setModal(type);

        setActionError(null);
    };


    // Close Modal
    // --------------------------------------------------------

    const closeModal = () => {

        setModal(null);

        setSelectedUser(null);

        setStatusAction(null);

        setActionError(null);
    };


    // Update User
    // --------------------------------------------------------

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
    // --------------------------------------------------------

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
    // --------------------------------------------------------

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
    // --------------------------------------------------------

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
    // --------------------------------------------------------

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
    // --------------------------------------------------------

    return (
        <section className="admin-users">

            <div className="admin-users__background">

                <div className="admin-users__glow admin-users__glow--one" />

                <div className="admin-users__glow admin-users__glow--two" />

                <div className="admin-users__grid" />

            </div>


            <div className="admin-users__container">

                {/* Header ------------------------------------ */}

                <header className="admin-users__header">

                    <div className="admin-users__heading">

                        <div className="admin-users__icon">

                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                                />

                                <circle
                                    cx="9"
                                    cy="7"
                                    r="4"
                                />

                                <path
                                    d="M22 21v-2a4 4 0 0 0-3-3.87"
                                />

                                <path
                                    d="M16 3.13a4 4 0 0 1 0 7.75"
                                />
                            </svg>

                        </div>


                        <div>

                            <span className="admin-users__eyebrow">
                                ADMINISTRATION
                            </span>

                            <h1>
                                Users
                            </h1>

                            <p>
                                Manage accounts, roles, access and user status.
                            </p>

                        </div>

                    </div>


                    <div className="admin-users__total">

                        <span>
                            Total Users
                        </span>

                        <strong>
                            {totalCount}
                        </strong>

                    </div>

                </header>


                {/* Toolbar ----------------------------------- */}

                <div className="admin-users__toolbar">

                    <UserSearch
                        value={search}
                        onChange={setSearch}
                    />

                    <div className="admin-users__result">

                        <span className="admin-users__result-dot" />

                        {loading
                            ? "Updating users..."
                            : `${users.length} users displayed`}

                    </div>

                </div>


                {/* Loading ---------------------------------- */}

                {loading && (
                    <div className="admin-users__loading">

                        <span className="admin-users__spinner" />

                        <div>

                            <strong>
                                Loading users
                            </strong>

                            <span>
                                Fetching the latest account data...
                            </span>

                        </div>

                    </div>
                )}


                {/* Error ------------------------------------ */}

                {error && (
                    <div className="admin-users__error">

                        <div className="admin-users__error-icon">

                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="9"
                                />

                                <path
                                    d="M12 8v4"
                                />

                                <path
                                    d="M12 16h.01"
                                />
                            </svg>

                        </div>


                        <div>

                            <strong>
                                Unable to load users
                            </strong>

                            <p>
                                {error}
                            </p>

                        </div>


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


                {/* Table ------------------------------------ */}

                {!loading &&
                    !error && (

                        <div className="admin-users__table-card">

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

                        </div>
                    )}


                {/* Pagination ------------------------------- */}

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

            </div>


            {/* Modals ----------------------------------------- */}

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