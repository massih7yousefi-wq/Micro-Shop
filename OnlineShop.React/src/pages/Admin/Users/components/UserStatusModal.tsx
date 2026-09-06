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


return (
    <div
        role="dialog"
        aria-modal="true"
    >

        <div>

            <h2>
                {title}
            </h2>


            <p>
                {description}
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
                    ? "Processing..."
                    : "Confirm"}
            </button>

        </div>

    </div>
);


}
