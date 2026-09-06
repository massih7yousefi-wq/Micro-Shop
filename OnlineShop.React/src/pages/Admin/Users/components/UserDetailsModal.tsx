import type {
    AdminUser,
} from "../../../../types/adminUser";

interface UserDetailsModalProps {
    user: AdminUser | null;


onClose: () => void;


}

export default function UserDetailsModal({
                                             user,
                                             onClose,
                                         }: UserDetailsModalProps) {


if (!user) {
    return null;
}


return (
    <div
        role="dialog"
        aria-modal="true"
    >

        <div>

            <h2>
                User Details
            </h2>


            <p>
                <strong>ID:</strong>{" "}
                {user.id}
            </p>


            <p>
                <strong>Username:</strong>{" "}
                {user.userName}
            </p>


            <p>
                <strong>Email:</strong>{" "}
                {user.email}
            </p>


            <p>
                <strong>Phone:</strong>{" "}
                {user.phoneNumber || "Not provided"}
            </p>


            <p>
                <strong>Email confirmed:</strong>{" "}
                {user.emailConfirmed
                    ? "Yes"
                    : "No"}
            </p>


            <p>
                <strong>Active:</strong>{" "}
                {user.isActive
                    ? "Yes"
                    : "No"}
            </p>


            <p>
                <strong>Locked:</strong>{" "}
                {user.isLockedOut
                    ? "Yes"
                    : "No"}
            </p>


            <p>
                <strong>Lockout end:</strong>{" "}
                {user.lockoutEnd
                    ? new Date(
                        user.lockoutEnd
                    ).toLocaleString()
                    : "Not locked"}
            </p>


            <p>
                <strong>Roles:</strong>{" "}
                {user.roles.length > 0
                    ? user.roles.join(", ")
                    : "No role"}
            </p>


            <button
                type="button"
                onClick={onClose}
            >
                Close
            </button>

        </div>

    </div>
);


}
