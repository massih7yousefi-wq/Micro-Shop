import {
    NavLink,
    Outlet,
} from "react-router-dom";

import "./Account.css";


export default function AccountLayout() {

    return (
        <main className="account-page">

            {/* =================================================
                BACKGROUND VIDEO
            ================================================= */}

            <video
                className="account-background-video"
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


            {/* =================================================
                BACKGROUND OVERLAY
            ================================================= */}

            <div
                className="account-background-overlay"
                aria-hidden="true"
            />


            {/* =================================================
                ACCOUNT CONTAINER
            ================================================= */}

            <div className="account-container">


                {/* =================================================
                    SIDEBAR
                ================================================= */}

                <aside className="account-sidebar">

                    <div className="account-sidebar-header">

                        <h1>
                            My Account
                        </h1>

                        <p>
                            Manage your account
                        </p>

                    </div>


                    <nav
                        className="account-navigation"
                        aria-label="Account navigation"
                    >

                        <NavLink
                            to="/account/profile"
                            className={({ isActive }) =>
                                isActive
                                    ? "account-nav-link active"
                                    : "account-nav-link"
                            }
                        >
                            Profile
                        </NavLink>


                        <span
                            className="account-nav-link disabled"
                            aria-disabled="true"
                        >
                            Addresses
                        </span>


                        <span
                            className="account-nav-link disabled"
                            aria-disabled="true"
                        >
                            Change Password
                        </span>

                    </nav>

                </aside>


                {/* =================================================
                    CONTENT
                ================================================= */}

                <section className="account-content">

                    <Outlet />

                </section>

            </div>

        </main>
    );
}