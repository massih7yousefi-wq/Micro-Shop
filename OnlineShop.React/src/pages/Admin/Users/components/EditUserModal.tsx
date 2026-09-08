import {
    useEffect,
    useState,
} from "react";

import type {
    AdminUser,
    AdminUpdateUserModel,
} from "../../../../types/adminUser";


interface EditUserModalProps {
    user: AdminUser | null;

    loading: boolean;

    error: string | null;

    onClose: () => void;

    onSubmit: (
        model: AdminUpdateUserModel
    ) => Promise<void>;
}


export default function EditUserModal({
                                          user,
                                          loading,
                                          error,
                                          onClose,
                                          onSubmit,
                                      }: EditUserModalProps) {

    const [userName, setUserName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [phoneNumber, setPhoneNumber] =
        useState("");


    useEffect(() => {

        if (!user) {
            return;
        }

        setUserName(user.userName);
        setEmail(user.email);
        setPhoneNumber(
            user.phoneNumber ?? ""
        );

    }, [user]);


    if (!user) {
        return null;
    }


    const handleSubmit = async (
        event: React.FormEvent
    ) => {

        event.preventDefault();

        await onSubmit({
            userName: userName.trim(),
            email: email.trim(),
            phoneNumber:
                phoneNumber.trim() || null,
        });
    };


    return (
        <div
            className="admin-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-user-title"
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
                                    d="M12 20h9"
                                />

                                <path
                                    d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"
                                />
                            </svg>

                        </div>

                        <div>

                            <span>
                                USER MANAGEMENT
                            </span>

                            <h2 id="edit-user-title">
                                Edit User
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

                            <label>
                                Username
                            </label>

                            <input
                                value={userName}
                                onChange={(event) =>
                                    setUserName(
                                        event.target.value
                                    )
                                }
                                minLength={3}
                                maxLength={50}
                                autoComplete="username"
                                required
                            />

                        </div>


                        <div className="admin-form-field">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(
                                        event.target.value
                                    )
                                }
                                maxLength={256}
                                autoComplete="email"
                                required
                            />

                        </div>


                        <div className="admin-form-field">

                            <label>
                                Phone
                            </label>

                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(event) =>
                                    setPhoneNumber(
                                        event.target.value
                                    )
                                }
                                maxLength={30}
                                autoComplete="tel"
                            />

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
                                    ? "Saving..."
                                    : "Save Changes"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}