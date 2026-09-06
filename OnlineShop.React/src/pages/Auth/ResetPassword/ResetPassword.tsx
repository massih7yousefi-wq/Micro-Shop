
import {
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";

import {
    Link,
    useNavigate,
    useSearchParams,
} from "react-router-dom";

import AuthLayout
    from "../../../components/Auth/AuthLayout";

import AuthInput
    from "../../../components/Auth/AuthInput";

import PasswordInput
    from "../../../components/Auth/PasswordInput";

import AuthButton
    from "../../../components/Auth/AuthButton";

import { useAuth }
    from "../../../auth/AuthContext";

import type {
    ResetPasswordRequest,
} from "../../../types/auth";


export default function ResetPassword() {

    const {
        resetPassword,
    } = useAuth();

    const navigate =
        useNavigate();

    const [
        searchParams,
    ] = useSearchParams();


    // Query Parameters-----------------------------------------

    const email =
        searchParams.get("email") ?? "";

    const token =
        searchParams.get("token") ?? "";


    // Form-----------------------------------------------------

    const [
        form,
        setForm,
    ] = useState<ResetPasswordRequest>({
        email,
        token,
        newPassword: "",
        confirmNewPassword: "",
    });


    // State----------------------------------------------------

    const [
        error,
        setError,
    ] = useState("");

    const [
        success,
        setSuccess,
    ] = useState("");

    const [
        loading,
        setLoading,
    ] = useState(false);


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


        // Validate Reset Link----------------------------------

        if (!email || !token) {

            setError(
                "The password reset link is invalid or incomplete."
            );

            return;
        }


        // Validate Passwords-----------------------------------

        if (
            form.newPassword !==
            form.confirmNewPassword
        ) {

            setError(
                "Passwords do not match."
            );

            return;
        }


        setLoading(true);


        try {

            await resetPassword(form);

            setSuccess(
                "Your password has been reset successfully. Redirecting to Sign In..."
            );


            // Redirect after successful reset------------------

            setTimeout(() => {

                navigate(
                    "/login",
                    { replace: true }
                );

            }, 1500);

        } catch (err) {

            console.error(err);

            setError(
                "Password reset failed. The link may be invalid or expired."
            );

        } finally {

            setLoading(false);
        }
    };


    // Render---------------------------------------------------

    return (
        <AuthLayout
            title="Reset your password"
            subtitle="Create a new password for your MicroShop account"
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


                {/* Email --------------------------------------- */}

                <AuthInput
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    value={form.email}
                    readOnly
                    autoComplete="email"
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
                    disabled={!email || !token}
                >
                    Reset Password
                </AuthButton>

            </form>


            {/* Footer ------------------------------------------ */}

            <div className="auth-footer">

                <span>
                    Remember your password?
                </span>

                <Link
                    to="/login"
                    className="auth-link"
                >
                    Back to Sign In
                </Link>

            </div>

        </AuthLayout>
    );
}

