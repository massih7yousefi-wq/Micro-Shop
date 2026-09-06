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
        role="dialog"
        aria-modal="true"
    >

        <div>

            <h2>
                Edit User
            </h2>


            {error && (
                <p>
                    {error}
                </p>
            )}


            <form
                onSubmit={handleSubmit}
            >

                <div>

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
                        required
                    />

                </div>


                <div>

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
                        required
                    />

                </div>


                <div>

                    <label>
                        Phone
                    </label>

                    <input
                        value={phoneNumber}
                        onChange={(event) =>
                            setPhoneNumber(
                                event.target.value
                            )
                        }
                        maxLength={30}
                    />

                </div>


                <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                >
                    Cancel
                </button>


                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Saving..."
                        : "Save"}
                </button>

            </form>

        </div>

    </div>
);


}
