import {
    useEffect,
    useState,
} from "react";

import type {
    AdminUser,
} from "../../../../types/adminUser";


interface ChangeRoleModalProps {
    user: AdminUser | null;

    loading: boolean;

    error: string | null;

    onClose: () => void;

    onSubmit: (
        role: string
    ) => Promise<void>;
}


const roles = [
    "User",
    "Admin",
];


export default function ChangeRoleModal({
                                            user,
                                            loading,
                                            error,
                                            onClose,
                                            onSubmit,
                                        }: ChangeRoleModalProps) {

    const [role, setRole] =
        useState("");


    useEffect(() => {

        if (!user) {
            return;
        }

        setRole(
            user.roles[0] ?? "User"
        );

    }, [user]);


    if (!user) {
        return null;
    }


    const handleSubmit = async (
        event: React.FormEvent
    ) => {

        event.preventDefault();

        await onSubmit(role);
    };


    return (
        <div
            className="admin-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="change-role-title"
        >

            <div
                className="admin-modal__backdrop"
                onClick={onClose}
            />


            <div className="admin-modal__panel">

                <div className="admin-modal__header">

                    <div className="admin-modal__title-group">

                        <div className="admin-modal__icon admin-modal__icon--primary">

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

                        </div>


                        <div>

                            <span>
                                ACCESS CONTROL
                            </span>

                            <h2 id="change-role-title">
                                Change User Role
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
                                Current role: {user.roles[0] ?? "User"}
                            </span>

                        </div>

                    </div>


                    {error && (
                        <div className="admin-modal__error">
                            {error}
                        </div>
                    )}


                    <form
                        className="admin-modal__form"
                        onSubmit={handleSubmit}
                    >

                        <div className="admin-form-field">

                            <label htmlFor="user-role">
                                Role
                            </label>

                            <select
                                id="user-role"
                                value={role}
                                onChange={(event) =>
                                    setRole(
                                        event.target.value
                                    )
                                }
                            >

                                {roles.map(
                                    (item) => (
                                        <option
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </option>
                                    )
                                )}

                            </select>

                        </div>


                        <div className="admin-role-notice">

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

                            <span>
                                Changing a role immediately affects this user's permissions.
                            </span>

                        </div>


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
                                type="submit"
                                className="admin-modal-button admin-modal-button--primary"
                                disabled={loading}
                            >
                                {loading
                                    ? "Updating..."
                                    : "Update Role"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}