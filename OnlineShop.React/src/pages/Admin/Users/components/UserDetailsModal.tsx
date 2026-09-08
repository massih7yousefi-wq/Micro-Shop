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
            className="admin-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="user-details-title"
        >
            <div className="admin-modal admin-modal--wide">

                {/* Header */}
                <div className="admin-modal__header">

                    <div className="admin-modal__heading">

                        <div className="admin-modal__icon admin-modal__icon--primary">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M20 21a8 8 0 0 0-16 0"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                />
                                <circle
                                    cx="12"
                                    cy="7"
                                    r="4"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                />
                            </svg>
                        </div>

                        <div>
                            <h2
                                id="user-details-title"
                                className="admin-modal__title"
                            >
                                User Details
                            </h2>

                            <p className="admin-modal__subtitle">
                                View account information and access status.
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        className="admin-modal__close"
                        onClick={onClose}
                        aria-label="Close user details"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path
                                d="M6 6l12 12M18 6L6 18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>

                </div>


                {/* User identity */}
                <div className="admin-modal__user-card">

                    <div className="admin-user-avatar">
                        {user.userName
                            ? user.userName
                                .charAt(0)
                                .toUpperCase()
                            : "U"}
                    </div>

                    <div className="admin-modal__user-info">
                        <strong>
                            {user.userName}
                        </strong>

                        <span>
                            {user.email}
                        </span>
                    </div>

                </div>


                {/* Details */}
                <div className="admin-details-grid">

                    <div className="admin-detail-item">
                        <span className="admin-detail-item__label">
                            User ID
                        </span>

                        <strong className="admin-detail-item__value admin-detail-item__value--id">
                            {user.id}
                        </strong>
                    </div>


                    <div className="admin-detail-item">
                        <span className="admin-detail-item__label">
                            Phone
                        </span>

                        <strong className="admin-detail-item__value">
                            {user.phoneNumber || "Not provided"}
                        </strong>
                    </div>


                    <div className="admin-detail-item">
                        <span className="admin-detail-item__label">
                            Email Status
                        </span>

                        <span
                            className={`admin-status-badge ${
                                user.emailConfirmed
                                    ? "admin-status-badge--success"
                                    : "admin-status-badge--warning"
                            }`}
                        >
                            <span className="admin-status-badge__dot" />
                            {user.emailConfirmed
                                ? "Confirmed"
                                : "Not confirmed"}
                        </span>
                    </div>


                    <div className="admin-detail-item">
                        <span className="admin-detail-item__label">
                            Account Status
                        </span>

                        <span
                            className={`admin-status-badge ${
                                user.isActive
                                    ? "admin-status-badge--success"
                                    : "admin-status-badge--neutral"
                            }`}
                        >
                            <span className="admin-status-badge__dot" />
                            {user.isActive
                                ? "Active"
                                : "Inactive"}
                        </span>
                    </div>


                    <div className="admin-detail-item">
                        <span className="admin-detail-item__label">
                            Lock Status
                        </span>

                        <span
                            className={`admin-status-badge ${
                                user.isLockedOut
                                    ? "admin-status-badge--danger"
                                    : "admin-status-badge--success"
                            }`}
                        >
                            <span className="admin-status-badge__dot" />
                            {user.isLockedOut
                                ? "Locked"
                                : "Unlocked"}
                        </span>
                    </div>


                    <div className="admin-detail-item">
                        <span className="admin-detail-item__label">
                            Lockout End
                        </span>

                        <strong className="admin-detail-item__value">
                            {user.lockoutEnd
                                ? new Date(
                                    user.lockoutEnd
                                ).toLocaleString()
                                : "Not locked"}
                        </strong>
                    </div>

                </div>


                {/* Roles */}
                <div className="admin-details-section">

                    <div className="admin-details-section__header">
                        <span className="admin-details-section__title">
                            Assigned Roles
                        </span>

                        <span className="admin-details-section__count">
                            {user.roles.length}
                        </span>
                    </div>

                    <div className="admin-role-list">

                        {user.roles.length > 0 ? (
                            user.roles.map((role) => (
                                <span
                                    key={role}
                                    className="admin-role-badge"
                                >
                                    {role}
                                </span>
                            ))
                        ) : (
                            <span className="admin-empty-value">
                                No role assigned
                            </span>
                        )}

                    </div>

                </div>


                {/* Footer */}
                <div className="admin-modal__actions">

                    <button
                        type="button"
                        className="admin-button admin-button--secondary"
                        onClick={onClose}
                    >
                        Close
                    </button>

                </div>

            </div>
        </div>
    );
}
