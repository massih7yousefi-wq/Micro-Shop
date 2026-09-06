import {
    useEffect,
    useState,
} from "react";

import {
    Link,
    useSearchParams,
} from "react-router-dom";

import AuthLayout
    from "../../../components/Auth/AuthLayout";

import AuthButton
    from "../../../components/Auth/AuthButton";

import { accountApi }
    from "../../../api/accountApi";


export default function ConfirmEmail() {

    const [
        searchParams,
    ] = useSearchParams();


    // State----------------------------------------------------

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        success,
        setSuccess,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState("");


    // Confirm Email--------------------------------------------

    useEffect(() => {

        let mounted = true;

        async function confirm() {

            const userId =
                searchParams.get("userId");

            const token =
                searchParams.get("token");


            // Validate Query Parameters------------------------

            if (!userId || !token) {

                if (mounted) {

                    setError(
                        "The email confirmation link is invalid or incomplete."
                    );

                    setLoading(false);
                }

                return;
            }


            // API Request--------------------------------------

            try {

                await accountApi.confirmEmail(
                    userId,
                    token
                );

                if (mounted) {

                    setSuccess(true);
                }

            } catch (err) {

                console.error(err);

                if (mounted) {

                    setError(
                        "Email confirmation failed. The link may be invalid, expired, or already used."
                    );
                }

            } finally {

                if (mounted) {

                    setLoading(false);
                }
            }
        }

        confirm();


        // Cleanup---------------------------------------------

        return () => {

            mounted = false;
        };

    }, [searchParams]);


    // Loading--------------------------------------------------

    if (loading) {

        return (
            <AuthLayout
                title="Confirming your email"
                subtitle="Please wait while we verify your email address"
            >

                <div className="auth-status">

                    <div className="auth-loading">
                        Confirming your email...
                    </div>

                </div>

            </AuthLayout>
        );
    }


    // Success-------------------------------------------------

    if (success) {

        return (
            <AuthLayout
                title="Email confirmed"
                subtitle="Your MicroShop account has been successfully verified"
            >

                <div className="auth-status">

                    <div className="auth-success">
                        Your email address has been confirmed successfully.
                    </div>

                    <div className="auth-status-action">

                        <Link
                            to="/login"
                            className="auth-link"
                        >
                            Continue to Sign In
                        </Link>

                    </div>

                </div>

            </AuthLayout>
        );
    }


    // Error---------------------------------------------------

    return (
        <AuthLayout
            title="Confirmation failed"
            subtitle="We could not verify your email address"
        >

            <div className="auth-status">

                <div className="auth-error">
                    {error}
                </div>

                <AuthButton
                    type="button"
                    onClick={() =>
                        window.location.reload()
                    }
                >
                    Try Again
                </AuthButton>

                <div className="auth-status-action">

                    <Link
                        to="/login"
                        className="auth-link"
                    >
                        Back to Sign In
                    </Link>

                </div>

            </div>

        </AuthLayout>
    );
}