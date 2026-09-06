import {
    useState,
    type FormEvent,
    type ChangeEvent,
} from "react";

import {
    Link,
} from "react-router-dom";

import AuthLayout
    from "../../../components/Auth/AuthLayout";

import AuthInput
    from "../../../components/Auth/AuthInput";

import AuthButton
    from "../../../components/Auth/AuthButton";

import { useAuth }
    from "../../../auth/AuthContext";

import type {
    ForgotPasswordRequest,
} from "../../../types/auth";


export default function ForgotPassword() {

    const {
        forgotPassword,
    } = useAuth();


    // Form-----------------------------------------------------

    const [form, setForm] =
        useState<ForgotPasswordRequest>({
            email: "",
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
        setLoading(true);


        try {

            await forgotPassword(form);

            setSuccess(
                "If an account exists with this email, a password reset link has been sent."
            );

        } catch (err) {

            console.error(err);

            setError(
                "We could not process your request. Please try again later."
            );

        } finally {

            setLoading(false);
        }
    };


    // Render---------------------------------------------------

    return (
        <AuthLayout
            title="Forgot your password?"
            subtitle="Enter your email and we'll send you a password reset link"
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
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                />


                {/* Submit -------------------------------------- */}

                <AuthButton
                    type="submit"
                    loading={loading}
                >
                    Send Reset Link
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