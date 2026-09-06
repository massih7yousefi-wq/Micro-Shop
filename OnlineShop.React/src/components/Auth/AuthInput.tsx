import type {
    InputHTMLAttributes,
} from "react";

interface AuthInputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

// Component ------------------------------------

export default function AuthInput({
                                      label,
                                      error,
                                      id,
                                      ...props
                                  }: AuthInputProps) {
    return (
        <div
            className={`auth-field ${
                error
                    ? "auth-field--error"
                    : ""
            }`}
        >

            {/* Label ------------------------------- */}

            <label htmlFor={id}>
                {label}
            </label>


            {/* Input ------------------------------- */}

            <div className="auth-input-wrapper">

                <input
                    id={id}
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

            </div>


            {/* Error ------------------------------- */}

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