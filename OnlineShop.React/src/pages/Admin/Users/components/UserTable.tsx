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
            <div>
                No users found.
            </div>
        );
    }


    return (
        <div>

            <table>

                <thead>

                    <tr>

                        <th>
                            Username
                        </th>

                        <th>
                            Email
                        </th>

                        <th>
                            Role
                        </th>

                        <th>
                            Email
                        </th>

                        <th>
                            Active
                        </th>

                        <th>
                            Lock
                        </th>

                        <th>
                            Actions
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {users.map((user) => (

                        <tr key={user.id}>

                            <td>
                                {user.userName}
                            </td>


                            <td>
                                {user.email}
                            </td>


                            <td>
                                {user.roles.length > 0
                                    ? user.roles.join(", ")
                                    : "No role"}
                            </td>


                            <td>
                                {user.emailConfirmed
                                    ? "Confirmed"
                                    : "Not confirmed"}
                            </td>


                            <td>
                                {user.isActive
                                    ? "Active"
                                    : "Inactive"}
                            </td>


                            <td>
                                {user.isLockedOut
                                    ? "Locked"
                                    : "Unlocked"}
                            </td>


                            <td>

                                <button
                                    type="button"
                                    onClick={() =>
                                        onView(user)
                                    }
                                >
                                    View
                                </button>


                                <button
                                    type="button"
                                    onClick={() =>
                                        onEdit(user)
                                    }
                                >
                                    Edit
                                </button>


                                <button
                                    type="button"
                                    onClick={() =>
                                        onRole(user)
                                    }
                                >
                                    Role
                                </button>


                                <button
                                    type="button"
                                    onClick={() =>
                                        onActive(user)
                                    }
                                >
                                    {user.isActive
                                        ? "Deactivate"
                                        : "Activate"}
                                </button>


                                <button
                                    type="button"
                                    onClick={() =>
                                        onLock(user)
                                    }
                                >
                                    {user.isLockedOut
                                        ? "Unlock"
                                        : "Lock"}
                                </button>


                                <button
                                    type="button"
                                    onClick={() =>
                                        onDelete(user)
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

