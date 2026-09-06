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
        role="dialog"
        aria-modal="true"
    >

        <div>

            <h2>
                Change User Role
            </h2>


            <p>
                {user.userName}
            </p>


            {error && (
                <p>
                    {error}
                </p>
            )}


            <form
                onSubmit={handleSubmit}
            >

                <label>
                    Role
                </label>


                <select
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
                        ? "Updating..."
                        : "Update Role"}
                </button>

            </form>

        </div>

    </div>
);


}
