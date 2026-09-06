import type { ReactNode } from "react";
import "./Auth.css";
interface AuthLayoutProps {
    title: string;
    subtitle?: string;
    children: ReactNode;
}

// Component ------------------------------------

export default function AuthLayout({
                                       title,
                                       subtitle,
                                       children,
                                   }: AuthLayoutProps) {
    return (
        <main className="auth-page">

            {/* Background -------------------------------- */}

            <div
                className="auth-background"
                aria-hidden="true"
            >
                <span className="auth-glow auth-glow--one" />
                <span className="auth-glow auth-glow--two" />
                <span className="auth-grid" />
            </div>


            {/* Card -------------------------------------- */}

            <section className="auth-card animate-scale-in">

                {/* Brand --------------------------------- */}

                <div className="auth-brand">

                    <span className="auth-brand__mark">

                        <span
                            className="
                                auth-brand__line
                                auth-brand__line--left
                            "
                        />

                        <span
                            className="
                                auth-brand__line
                                auth-brand__line--center
                            "
                        />

                        <span
                            className="
                                auth-brand__line
                                auth-brand__line--right
                            "
                        />

                    </span>


                    <span className="auth-brand__text">

                        <span className="auth-brand__name">
                            Micro
                        </span>

                        <span className="auth-brand__shop">
                            Shop
                        </span>

                    </span>

                </div>


                {/* Header -------------------------------- */}

                <header className="auth-header animate-fade-up">

                    <h1>
                        {title}
                    </h1>

                    {subtitle && (
                        <p>
                            {subtitle}
                        </p>
                    )}

                </header>


                {/* Content ------------------------------- */}

                <div className="auth-content animate-fade-up">
                    {children}
                </div>

            </section>

        </main>
    );
}