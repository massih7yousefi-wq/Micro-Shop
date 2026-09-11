import { Outlet } from "react-router-dom";

import "./AuthLayout.css";

export default function AuthLayout() {
    return (
        <main className="auth-layout">

            {/* BACKGROUND */}
            <div className="auth-layout-background">

                <video
                    className="auth-layout-background-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                >
                    <source
                        src="/PJUZ7349.MP4"
                        type="video/mp4"
                    />
                </video>

                <div
                    className="auth-layout-background-overlay"
                    aria-hidden="true"
                />

                <div
                    className="auth-layout-background-vignette"
                    aria-hidden="true"
                />

            </div>

            {/* DECORATIVE LIGHTS */}
            <div
                className="auth-layout-light auth-layout-light-one"
                aria-hidden="true"
            />

            <div
                className="auth-layout-light auth-layout-light-two"
                aria-hidden="true"
            />

            {/* PAGE CONTENT */}
            <div className="auth-layout-content">
                <Outlet />
            </div>

        </main>
    );
}