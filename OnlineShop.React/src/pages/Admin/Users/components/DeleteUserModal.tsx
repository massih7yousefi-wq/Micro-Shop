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
        role="dialog"
        aria-modal="true"
    >

        <div>

            <h2>
                Delete User
            </h2>


            <p>
                Are you sure you want to
                delete{" "}
                <strong>
                    {user.userName}
                </strong>
                ?
            </p>


            <p>
                This action cannot be undone.
            </p>


            {error && (
                <p>
                    {error}
                </p>
            )}


            <button
                type="button"
                onClick={onClose}
                disabled={loading}
            >
                Cancel
            </button>


            <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
            >
                {loading
                    ? "Deleting..."
                    : "Delete"}
            </button>

        </div>

    </div>
);


}
