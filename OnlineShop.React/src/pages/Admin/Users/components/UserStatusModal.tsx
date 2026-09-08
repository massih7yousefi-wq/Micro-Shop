import type {
    AdminUser,
} from "../../../../types/adminUser";


type StatusAction =
    | "active"
    | "lock";


interface UserStatusModalProps {
    user: AdminUser | null;

    action: StatusAction | null;

    loading: boolean;

    error: string | null;

    onClose: () => void;

    onConfirm: () => Promise<void>;
}


export default function UserStatusModal({
                                            user,
                                            action,
                                            loading,
                                            error,
                                            onClose,
                                            onConfirm,
                                        }: UserStatusModalProps) {

    if (!user || !action) {
        return null;
    }


    const isActiveAction =
        action === "active";


    const enable =
        isActiveAction
            ? !user.isActive
            : !user.isLockedOut;


    const title =
        isActiveAction
            ? enable
                ? "Activate User"
                : "Deactivate User"
            : enable
                ? "Lock User"
                : "Unlock User";


    const description =
        isActiveAction
            ? enable
                ? `Are you sure you want to activate ${user.userName}?`
                : `Are you sure you want to deactivate ${user.userName}?`
            : enable
                ? `Are you sure you want to lock ${user.userName}?`
                : `Are you sure you want to unlock ${user.userName}?`;


    const isDanger =
        isActiveAction
            ? !enable
            : enable;


    return (
        <div
            className="admin-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="status-user-title"
        >

            <div
                className="admin-modal__backdrop"
                onClick={onClose}
            />


            <div className="admin-modal__panel">

                <div className="admin-modal__header">

                    <div className="admin-modal__title-group">

                        <div
                            className={
                                isDanger
                                    ? "admin-modal__icon admin-modal__icon--danger"
                                    : "admin-modal__icon admin-modal__icon--primary"
                            }
                        >

                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >

                                {isActiveAction ? (
                                    <>
                                        <path
                                            d="M12 3v9"
                                        />

                                        <path
                                            d="M6.4 6.4a8 8 0 1 0 11.2 0"
                                        />
                                    </>
                                ) : (
                                    <>
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
                                    </>
                                )}

                            </svg>

                        </div>


                        <div>

                            <span>
                                ACCOUNT STATUS
                            </span>

                            <h2 id="status-user-title">
                                {title}
                            </h2>

                        </div>

                    </div>


                    <button
                        type="button"
                        className="admin-modal__close"
                        onClick={onClose}
                        disabled={loading}
                        aria-label="Close"
                    >
                        ×
                    </button>

                </div>


                <div className="admin-modal__body">

                    <div className="admin-modal__user-reference">

                        <div className="admin-modal__avatar">
                            {user.userName
                                .charAt(0)
                                .toUpperCase()}
                        </div>

                        <div>

                            <strong>
                                {user.userName}
                            </strong>

                            <span>
                                User ID #{user.id}
                            </span>

                        </div>

                    </div>


                    <div className="admin-status-description">

                        <p>
                            {description}
                        </p>

                    </div>


                    {error && (
                        <div className="admin-modal__error">
                            {error}
                        </div>
                    )}


                    <div className="admin-modal__actions">

                        <button
                            type="button"
                            className="admin-modal-button admin-modal-button--secondary"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>


                        <button
                            type="button"
                            className={
                                isDanger
                                    ? "admin-modal-button admin-modal-button--danger"
                                    : "admin-modal-button admin-modal-button--primary"
                            }
                            onClick={onConfirm}
                            disabled={loading}
                        >
                            {loading
                                ? "Processing..."
                                : "Confirm"}
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}