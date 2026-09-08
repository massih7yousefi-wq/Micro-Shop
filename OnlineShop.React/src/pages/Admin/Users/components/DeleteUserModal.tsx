import type {
    AdminUser,
} from "../../../../types/adminUser";


interface DeleteUserModalProps {
    user: AdminUser | null;

    loading: boolean;

    error: string | null;

    onClose: () => void;

    onConfirm: () => Promise<void>;
}


export default function DeleteUserModal({
                                            user,
                                            loading,
                                            error,
                                            onClose,
                                            onConfirm,
                                        }: DeleteUserModalProps) {

    if (!user) {
        return null;
    }


    return (
        <div
            className="admin-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-user-title"
        >

            <div
                className="admin-modal__backdrop"
                onClick={onClose}
            />


            <div className="admin-modal__panel admin-modal__panel--danger">

                <div className="admin-modal__header">

                    <div className="admin-modal__title-group">

                        <div className="admin-modal__icon admin-modal__icon--danger">

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

                        </div>


                        <div>

                            <span>
                                DANGER ZONE
                            </span>

                            <h2 id="delete-user-title">
                                Delete User
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

                    <div className="admin-delete-content">

                        <div className="admin-modal__avatar admin-modal__avatar--danger">
                            {user.userName
                                .charAt(0)
                                .toUpperCase()}
                        </div>


                        <p>
                            Are you sure you want to delete
                            {" "}
                            <strong>
                                {user.userName}
                            </strong>
                            ?
                        </p>


                        <div className="admin-delete-warning">

                            <strong>
                                This action cannot be undone.
                            </strong>

                            <span>
                                The user's account and associated access will be permanently removed.
                            </span>

                        </div>

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
                            className="admin-modal-button admin-modal-button--danger"
                            onClick={onConfirm}
                            disabled={loading}
                        >
                            {loading
                                ? "Deleting..."
                                : "Delete User"}
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}