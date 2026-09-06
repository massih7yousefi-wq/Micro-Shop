import {
    useState,
    type FormEvent,
    type ChangeEvent,
} from "react";

import {
    Link,
    useLocation,
    useNavigate,
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
    LoginRequest,
} from "../../../types/auth";

export default function Login() {

    const {
        login,
    } = useAuth();

    const navigate =
        useNavigate();

    const location =
        useLocation();

    const [form, setForm] =
        useState<LoginRequest>({
            email: "",
            password: "",
        });

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const from =
        (
            location.state as {
                from?: {
                    pathname?: string;
                };
            } | null
        )?.from?.pathname || "/";

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

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            await login(form);

            navigate(
                from,
                { replace: true }
            );

        } catch (err) {

            console.error(err);

            setError(
                "Email or password is incorrect."
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Sign in to your MicroShop account"
        >

            <form
                className="auth-form"
                onSubmit={handleSubmit}
            >

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

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

                <PasswordInput
                    id="password"
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                />

                <div className="auth-form-options">

                    <Link
                        to="/forgot-password"
                        className="auth-link"
                    >
                        Forgot password?
                    </Link>

                </div>

                <AuthButton
                    type="submit"
                    loading={loading}
                >
                    Sign In
                </AuthButton>

            </form>

            <div className="auth-footer">

                <span>
                    Don't have an account?
                </span>

                <Link
                    to="/register"
                    className="auth-link"
                >
                    Create account
                </Link>

            </div>

        </AuthLayout>
    );
}