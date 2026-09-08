import type {
    AdminUser,
} from "../../../../types/adminUser";


interface UserTableProps {
    users: AdminUser[];

    onView: (
        user: AdminUser
    ) => void;

    onEdit: (
        user: AdminUser
    ) => void;

    onRole: (
        user: AdminUser
    ) => void;

    onActive: (
        user: AdminUser
    ) => void;

    onLock: (
        user: AdminUser
    ) => void;

    onDelete: (
        user: AdminUser
    ) => void;
}


export default function UserTable({
                                      users,
                                      onView,
                                      onEdit,
                                      onRole,
                                      onActive,
                                      onLock,
                                      onDelete,
                                  }: UserTableProps) {

    if (users.length === 0) {

        return (
            <div className="admin-users-empty">

                <div className="admin-users-empty__icon">

                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <circle
                            cx="9"
                            cy="7"
                            r="4"
                        />

                        <path
                            d="M3 21a6 6 0 0 1 12 0"
                        />

                        <path
                            d="M16 11h5"
                        />

                        <path
                            d="M18.5 8.5v5"
                        />
                    </svg>

                </div>

                <h3>
                    No users found
                </h3>

                <p>
                    Try adjusting your search criteria.
                </p>

            </div>
        );
    }


    return (
        <div className="admin-user-table-wrapper">

            <table className="admin-user-table">

                <thead>

                <tr>

                    <th>
                        User
                    </th>

                    <th>
                        Email
                    </th>

                    <th>
                        Role
                    </th>

                    <th>
                        Email Status
                    </th>

                    <th>
                        Account
                    </th>

                    <th>
                        Lock
                    </th>

                    <th className="admin-user-table__actions-header">
                        Actions
                    </th>

                </tr>

                </thead>


                <tbody>

                {users.map((user) => {

                    const role =
                        user.roles.length > 0
                            ? user.roles[0]
                            : "No role";


                    return (
                        <tr key={user.id}>

                            {/* User ----------------------- */}

                            <td>

                                <div className="admin-user">

                                    <div className="admin-user__avatar">
                                        {user.userName
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>


                                    <div className="admin-user__identity">

                                        <strong>
                                            {user.userName}
                                        </strong>

                                        <span>
                                                ID #{user.id}
                                            </span>

                                    </div>

                                </div>

                            </td>


                            {/* Email ---------------------- */}

                            <td>

                                    <span className="admin-user-email">
                                        {user.email}
                                    </span>

                            </td>


                            {/* Role ----------------------- */}

                            <td>

                                    <span
                                        className={
                                            role === "Admin"
                                                ? "admin-badge admin-badge--admin"
                                                : "admin-badge admin-badge--user"
                                        }
                                    >
                                        {role}
                                    </span>

                            </td>


                            {/* Email Status --------------- */}

                            <td>

                                    <span
                                        className={
                                            user.emailConfirmed
                                                ? "admin-status admin-status--success"
                                                : "admin-status admin-status--warning"
                                        }
                                    >

                                        <span className="admin-status__dot" />

                                        {user.emailConfirmed
                                            ? "Confirmed"
                                            : "Pending"}

                                    </span>

                            </td>


                            {/* Active --------------------- */}

                            <td>

                                    <span
                                        className={
                                            user.isActive
                                                ? "admin-status admin-status--success"
                                                : "admin-status admin-status--danger"
                                        }
                                    >

                                        <span className="admin-status__dot" />

                                        {user.isActive
                                            ? "Active"
                                            : "Inactive"}

                                    </span>

                            </td>


                            {/* Lock ----------------------- */}

                            <td>

                                    <span
                                        className={
                                            user.isLockedOut
                                                ? "admin-status admin-status--danger"
                                                : "admin-status admin-status--neutral"
                                        }
                                    >

                                        <span className="admin-status__dot" />

                                        {user.isLockedOut
                                            ? "Locked"
                                            : "Unlocked"}

                                    </span>

                            </td>


                            {/* Actions -------------------- */}

                            <td>

                                <div className="admin-user-actions">

                                    <button
                                        type="button"
                                        className="admin-action-button"
                                        onClick={() =>
                                            onView(user)
                                        }
                                        title="View details"
                                        aria-label={`View ${user.userName}`}
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"
                                            />

                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="2.5"
                                            />
                                        </svg>
                                    </button>


                                    <button
                                        type="button"
                                        className="admin-action-button"
                                        onClick={() =>
                                            onEdit(user)
                                        }
                                        title="Edit user"
                                        aria-label={`Edit ${user.userName}`}
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M12 20h9"
                                            />

                                            <path
                                                d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"
                                            />
                                        </svg>
                                    </button>


                                    <button
                                        type="button"
                                        className="admin-action-button"
                                        onClick={() =>
                                            onRole(user)
                                        }
                                        title="Change role"
                                        aria-label={`Change role for ${user.userName}`}
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M12 2 4 5v6c0 5 3.4 9.5 8 11 4.6-1.5 8-6 8-11V5Z"
                                            />

                                            <path
                                                d="m9 12 2 2 4-4"
                                            />
                                        </svg>
                                    </button>


                                    <button
                                        type="button"
                                        className="admin-action-button"
                                        onClick={() =>
                                            onActive(user)
                                        }
                                        title={
                                            user.isActive
                                                ? "Deactivate"
                                                : "Activate"
                                        }
                                        aria-label={
                                            user.isActive
                                                ? `Deactivate ${user.userName}`
                                                : `Activate ${user.userName}`
                                        }
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M12 3v9"
                                            />

                                            <path
                                                d="M6.4 6.4a8 8 0 1 0 11.2 0"
                                            />
                                        </svg>
                                    </button>


                                    <button
                                        type="button"
                                        className="admin-action-button"
                                        onClick={() =>
                                            onLock(user)
                                        }
                                        title={
                                            user.isLockedOut
                                                ? "Unlock"
                                                : "Lock"
                                        }
                                        aria-label={
                                            user.isLockedOut
                                                ? `Unlock ${user.userName}`
                                                : `Lock ${user.userName}`
                                        }
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <rect
                                                x="5"
                                                y="10"
                                                width="14"
                                                height="10"
                                                rx="2"
                                            />

                                            <path
                                                d="M8 10V7a4 4 0 0 1 8 0v3"
                                            />
                                        </svg>
                                    </button>


                                    <button
                                        type="button"
                                        className="admin-action-button admin-action-button--danger"
                                        onClick={() =>
                                            onDelete(user)
                                        }
                                        title="Delete user"
                                        aria-label={`Delete ${user.userName}`}
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M4 7h16"
                                            />

                                            <path
                                                d="M10 11v6"
                                            />

                                            <path
                                                d="M14 11v6"
                                            />

                                            <path
                                                d="M6 7l1 14h10l1-14"
                                            />

                                            <path
                                                d="M9 7V4h6v3"
                                            />
                                        </svg>
                                    </button>

                                </div>

                            </td>

                        </tr>
                    );
                })}

                </tbody>

            </table>

        </div>
    );
}