import type {
    ButtonHTMLAttributes,
} from "react";

interface AuthButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}

// Component ------------------------------------

export default function AuthButton({
                                       loading = false,
                                       children,
                                       disabled,
                                       className = "",
                                       ...props
                                   }: AuthButtonProps) {

    return (
        <button
            {...props}
            disabled={
                disabled || loading
            }
            className={`auth-button ${className}`}
            aria-busy={
                loading
                    ? "true"
                    : undefined
            }
        >

            {loading ? (
                <>
                    <span
                        className="auth-button__spinner"
                        aria-hidden="true"
                    />

                    <span>
                        Loading...
                    </span>
                </>
            ) : (
                children
            )}

        </button>
    );
}