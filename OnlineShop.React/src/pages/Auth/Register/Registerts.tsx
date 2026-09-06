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


    // Form-----------------------------------------------------

    const [form, setForm] =
        useState<RegisterRequest>({
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
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
            form.password !==
            form.confirmPassword
        ) {

            setError(
                "Passwords do not match."
            );

            return;
        }


        setLoading(true);


        try {

            await register(form);

            setSuccess(
                "Registration successful. Please check your email to confirm your account."
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


    // Render---------------------------------------------------

    return (
        <AuthLayout
            title="Create your account"
            subtitle="Join MicroShop and start shopping"
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