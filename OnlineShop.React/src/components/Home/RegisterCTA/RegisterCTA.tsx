import { Link } from "react-router-dom";
import "./RegisterCTA.css";

const RegisterCTA = () => {
    const token = localStorage.getItem("token");

    if (token) {
        return null;
    }

    return (
        <section className="register-cta">
            <video
                className="register-cta__video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
            >
                <source
                    src="/WQYU0061_web_bg.mp4"
                    type="video/mp4"
                />
            </video>

            <div className="register-cta__overlay" />

            <div className="register-cta__glow register-cta__glow--one" />
            <div className="register-cta__glow register-cta__glow--two" />

            <div className="register-cta__container">
                <div className="register-cta__card">
                    <span className="register-cta__badge">
                        <span className="register-cta__badge-dot" />
                        Join Micro Shop
                    </span>

                    <h2 className="register-cta__title">
                        Everything you need.
                        <br />
                        <span>One simple account.</span>
                    </h2>

                    <p className="register-cta__description">
                        Create your Micro Shop account and enjoy a
                        faster, simpler shopping experience.
                    </p>

                    <div className="register-cta__actions">
                        <Link
                            to="/register"
                            className="register-cta__button register-cta__button--primary"
                        >
                            <span>Get Started</span>

                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M5 12h14M13 6l6 6-6 6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>

                        <Link
                            to="/login"
                            className="register-cta__button register-cta__button--secondary"
                        >
                            I already have an account
                        </Link>
                    </div>

                    <div className="register-cta__trust">
                        <div className="register-cta__trust-item">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M12 3 5 6v5c0 4.5 2.9 8.3 7 10 4.1-1.7 7-5.5 7-10V6l-7-3Z"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="m9 12 2 2 4-4"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <span>Simple & secure</span>
                        </div>

                        <span className="register-cta__trust-divider" />

                        <div className="register-cta__trust-item">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                />
                                <path
                                    d="M12 7v5l3 2"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                />
                            </svg>

                            <span>Quick registration</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterCTA;