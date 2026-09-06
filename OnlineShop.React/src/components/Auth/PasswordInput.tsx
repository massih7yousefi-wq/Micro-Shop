import {
    useState,
    type InputHTMLAttributes,
} from "react";

interface PasswordInputProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        "type"
    > {
    label: string;
    error?: string;
}

// Component ------------------------------------

export default function PasswordInput({
                                          label,
                                          error,
                                          id,
                                          ...props
                                      }: PasswordInputProps) {

    const [showPassword, setShowPassword] =
        useState(false);


    return (
        <div
            className={`auth-field ${
                error
                    ? "auth-field--error"
                    : ""
            }`}
        >

            {/* Label -------------------------------- */}

            <label htmlFor={id}>
                {label}
            </label>


            {/* Password Input ----------------------- */}

            <div className="password-input-wrapper">

                <input
                    id={id}
                    type={
                        showPassword
                            ? "text"
                            : "password"
                    }
                    {...props}
                    aria-invalid={
                        error
                            ? "true"
                            : undefined
                    }
                    aria-describedby={
                        error
                            ? `${id}-error`
                            : undefined
                    }
                />


                {/* Show / Hide ---------------------- */}

                <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                        setShowPassword(
                            previous =>
                                !previous
                        )
                    }
                    aria-label={
                        showPassword
                            ? "Hide password"
                            : "Show password"
                    }
                    aria-pressed={showPassword}
                >

                    <span>
                        {showPassword
                            ? "Hide"
                            : "Show"}
                    </span>

                </button>

            </div>


            {/* Error -------------------------------- */}

            {error && (
                <span
                    id={`${id}-error`}
                    className="auth-field-error"
                    role="alert"
                >
                    {error}
                </span>
            )}

        </div>
    );
}