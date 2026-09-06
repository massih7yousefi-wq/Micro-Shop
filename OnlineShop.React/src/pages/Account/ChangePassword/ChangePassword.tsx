import {
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import AuthLayout
    from "../../../components/Auth/AuthLayout";

import PasswordInput
    from "../../../components/Auth/PasswordInput";

import AuthButton
    from "../../../components/Auth/AuthButton";

import { useAuth }
    from "../../../auth/AuthContext";

import type {
    ChangePasswordRequest,
} from "../../../types/auth";


export default function ChangePassword() {

    const {
        changePassword,
    } = useAuth();

    const navigate =
        useNavigate();


    // Form-----------------------------------------------------

    const [form, setForm] =
        useState<ChangePasswordRequest>({
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        });


    // State----------------------------------------------------

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    // Handle Change--------------------------------------------

    const handleChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {

        const {
            name,
            value,
        } = event.target;

        setForm(
            previous => ({
                ...previous,
                [name]: value,
            })
        );
    };


    // Handle Submit--------------------------------------------

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();

        setError("");
        setSuccess("");


        // Client-side validation-------------------------------

        if (
            form.newPassword !==
            form.confirmNewPassword
        ) {

            setError(
                "New passwords do not match."
            );

            return;
        }


        // Prevent using the same password----------------------

        if (
            form.currentPassword ===
            form.newPassword
        ) {

            setError(
                "New password must be different from your current password."
            );

            return;
        }


        setLoading(true);


        try {

            await changePassword(form);

            setSuccess(
                "Your password has been changed successfully. Please sign in again."
            );

            setForm({
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: "",
            });

            setTimeout(() => {

                navigate(
                    "/login",
                    { replace: true }
                );

            }, 1500);

        } catch (err) {

            console.error(err);

            setError(
                "Failed to change password. Please check your current password and try again."
            );

        } finally {

            setLoading(false);
        }
    };


    // Render---------------------------------------------------

    return (
        <AuthLayout
            title="Change password"
            subtitle="Update your MicroShop account password"
        >

            <form
                className="auth-form"
                onSubmit={handleSubmit}
            >

                {/* Error --------------------------------------- */}

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}


                {/* Success ------------------------------------- */}

                {success && (
                    <div className="auth-success">
                        {success}
                    </div>
                )}


                {/* Current Password ---------------------------- */}

                <PasswordInput
                    id="currentPassword"
                    name="currentPassword"
                    label="Current Password"
                    placeholder="Enter your current password"
                    value={form.currentPassword}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                />


                {/* New Password -------------------------------- */}

                <PasswordInput
                    id="newPassword"
                    name="newPassword"
                    label="New Password"
                    placeholder="Enter your new password"
                    value={form.newPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                />


                {/* Confirm New Password ----------------------- */}

                <PasswordInput
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    label="Confirm New Password"
                    placeholder="Confirm your new password"
                    value={form.confirmNewPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                />


                {/* Submit -------------------------------------- */}

                <AuthButton
                    type="submit"
                    loading={loading}
                >
                    Change Password
                </AuthButton>

            </form>


            {/* Footer ------------------------------------------ */}

            <div className="auth-footer">

                <Link
                    to="/account/profile"
                    className="auth-link"
                >
                    Back to Profile
                </Link>

            </div>

        </AuthLayout>
    );
}