import {
    useState,
    type ChangeEvent,
    type SubmitEvent,
} from "react";

import {
    Link,
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
    RegisterRequest,
} from "../../../types/auth";


export default function Register() {

    const {
        register,
    } = useAuth();


    // Form -----------------------------------------------------

    const [form, setForm] =
        useState<RegisterRequest>({
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
        });


    // State ----------------------------------------------------

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    // Password Rules -------------------------------------------

    const passwordRules = {

        minLength:
            form.password.length >= 8,

        maxLength:
            form.password.length <= 128,

        lowercase:
            /[a-z]/.test(form.password),

        uppercase:
            /[A-Z]/.test(form.password),

        digit:
            /\d/.test(form.password),

        special:
            /[^a-zA-Z0-9]/.test(form.password),

        uniqueChars:
            new Set(form.password).size >= 4,
    };


    const passwordsMatch =
        form.password.length > 0 &&
        form.password ===
        form.confirmPassword;


    // Form Validation ------------------------------------------

    const validateForm = (): string | null => {

        const userName =
            form.userName.trim();

        const email =
            form.email.trim();


        // Username --------------------------------------------

        if (userName.length < 3) {

            return (
                "Username must be at least 3 characters long."
            );
        }


        if (userName.length > 50) {

            return (
                "Username must not exceed 50 characters."
            );
        }


        // Email -----------------------------------------------

        if (!email) {

            return (
                "Email is required."
            );
        }


        // Password ---------------------------------------------

        if (!passwordRules.minLength) {

            return (
                "Password must be at least 8 characters long."
            );
        }


        if (!passwordRules.maxLength) {

            return (
                "Password must not exceed 128 characters."
            );
        }


        if (!passwordRules.lowercase) {

            return (
                "Password must contain at least one lowercase letter."
            );
        }


        if (!passwordRules.uppercase) {

            return (
                "Password must contain at least one uppercase letter."
            );
        }


        if (!passwordRules.digit) {

            return (
                "Password must contain at least one number."
            );
        }


        if (!passwordRules.special) {

            return (
                "Password must contain at least one special character."
            );
        }


        if (!passwordRules.uniqueChars) {

            return (
                "Password must contain at least 4 unique characters."
            );
        }


        // Confirm Password ------------------------------------

        if (
            form.password !==
            form.confirmPassword
        ) {

            return (
                "Passwords do not match."
            );
        }


        return null;
    };


    // Handle Change --------------------------------------------

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

        setError("");
        setSuccess("");
    };


    // Handle Submit --------------------------------------------

    const handleSubmit = async (
        event: SubmitEvent<HTMLFormElement>
    ) => {

        event.preventDefault();

        setError("");
        setSuccess("");


        const validationError =
            validateForm();


        if (validationError) {

            setError(
                validationError
            );

            return;
        }


        setLoading(true);


        try {

            await register({
                ...form,

                userName:
                    form.userName.trim(),

                email:
                    form.email.trim().toLowerCase(),
            });


            setSuccess(
                "Registration successful. You can now sign in to your account."
            );


            setForm({
                userName: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

        } catch (err) {

            console.error(err);

            setError(
                "Registration failed. Please check your information and try again."
            );

        } finally {

            setLoading(false);
        }
    };


    // Render ---------------------------------------------------

    return (
        <AuthLayout
            title="Create your account"
            subtitle="Join MicroShop and start shopping"
        >

            <form
                className="auth-form register-form"
                onSubmit={handleSubmit}
            >

                {/* Status -------------------------------------- */}

                {error && (
                    <div
                        className="auth-message auth-message--error"
                        role="alert"
                    >

                        <span className="auth-message__icon">

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

                        </span>

                        <span>
                            {error}
                        </span>

                    </div>
                )}


                {success && (
                    <div
                        className="auth-message auth-message--success"
                        role="status"
                    >

                        <span className="auth-message__icon">

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
                                    d="m8 12 2.5 2.5L16 9"
                                />
                            </svg>

                        </span>

                        <span>
                            {success}
                        </span>

                    </div>
                )}


                {/* Username ------------------------------------ */}

                <AuthInput
                    id="userName"
                    name="userName"
                    type="text"
                    label="Username"
                    placeholder="Enter your username"
                    value={form.userName}
                    onChange={handleChange}
                    autoComplete="username"
                    minLength={3}
                    maxLength={50}
                    required
                />


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
                    maxLength={256}
                    required
                />


                {/* Password ------------------------------------ */}

                <PasswordInput
                    id="password"
                    name="password"
                    label="Password"
                    placeholder="Create a password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                />


                {/* Password Rules ----------------------------- */}

                <div className="password-rules">

                    <div className="password-rules__header">

                        <span>
                            Password requirements
                        </span>

                        <span className="password-rules__count">
                            {
                                Object.values(passwordRules)
                                    .filter(Boolean)
                                    .length
                            }/7
                        </span>

                    </div>


                    <div className="password-rules__list">

                        <div
                            className={
                                passwordRules.minLength
                                    ? "password-rule password-rule--valid"
                                    : "password-rule"
                            }
                        >
                            <span className="password-rule__icon">
                                {passwordRules.minLength
                                    ? "✓"
                                    : "○"}
                            </span>

                            <span>
                                At least 8 characters
                            </span>
                        </div>


                        <div
                            className={
                                passwordRules.maxLength
                                    ? "password-rule password-rule--valid"
                                    : "password-rule"
                            }
                        >
                            <span className="password-rule__icon">
                                {passwordRules.maxLength
                                    ? "✓"
                                    : "○"}
                            </span>

                            <span>
                                Maximum 128 characters
                            </span>
                        </div>


                        <div
                            className={
                                passwordRules.lowercase
                                    ? "password-rule password-rule--valid"
                                    : "password-rule"
                            }
                        >
                            <span className="password-rule__icon">
                                {passwordRules.lowercase
                                    ? "✓"
                                    : "○"}
                            </span>

                            <span>
                                At least one lowercase letter
                            </span>
                        </div>


                        <div
                            className={
                                passwordRules.uppercase
                                    ? "password-rule password-rule--valid"
                                    : "password-rule"
                            }
                        >
                            <span className="password-rule__icon">
                                {passwordRules.uppercase
                                    ? "✓"
                                    : "○"}
                            </span>

                            <span>
                                At least one uppercase letter
                            </span>
                        </div>


                        <div
                            className={
                                passwordRules.digit
                                    ? "password-rule password-rule--valid"
                                    : "password-rule"
                            }
                        >
                            <span className="password-rule__icon">
                                {passwordRules.digit
                                    ? "✓"
                                    : "○"}
                            </span>

                            <span>
                                At least one number
                            </span>
                        </div>


                        <div
                            className={
                                passwordRules.special
                                    ? "password-rule password-rule--valid"
                                    : "password-rule"
                            }
                        >
                            <span className="password-rule__icon">
                                {passwordRules.special
                                    ? "✓"
                                    : "○"}
                            </span>

                            <span>
                                At least one special character
                            </span>
                        </div>


                        <div
                            className={
                                passwordRules.uniqueChars
                                    ? "password-rule password-rule--valid"
                                    : "password-rule"
                            }
                        >
                            <span className="password-rule__icon">
                                {passwordRules.uniqueChars
                                    ? "✓"
                                    : "○"}
                            </span>

                            <span>
                                At least 4 unique characters
                            </span>
                        </div>

                    </div>

                </div>


                {/* Confirm Password --------------------------- */}

                <PasswordInput
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                />


                {/* Password Match ----------------------------- */}

                {form.confirmPassword.length > 0 && (
                    <div
                        className={
                            passwordsMatch
                                ? "password-match password-match--valid"
                                : "password-match password-match--invalid"
                        }
                    >

                        <span className="password-match__icon">

                            {passwordsMatch ? "✓" : "!"}

                        </span>

                        <span>
                            {
                                passwordsMatch
                                    ? "Passwords match."
                                    : "Passwords do not match."
                            }
                        </span>

                    </div>
                )}


                {/* Submit -------------------------------------- */}

                <AuthButton
                    type="submit"
                    loading={loading}
                >
                    Create Account
                </AuthButton>

            </form>


            {/* Footer ------------------------------------------ */}

            <div className="auth-footer">

                <span>
                    Already have an account?
                </span>

                <Link
                    to="/login"
                    className="auth-link"
                >
                    Sign in
                </Link>

            </div>

        </AuthLayout>
    );
}