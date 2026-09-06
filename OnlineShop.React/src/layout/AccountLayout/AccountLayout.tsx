import {
    NavLink,
    Outlet,
} from "react-router-dom";


export default function AccountLayout() {

    return (
        <main className="account-page">

            <div className="account-container">

                {/* Sidebar ----------------------------------- */}

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


                {/* Content ----------------------------------- */}

                <section className="account-content">

                    <Outlet />

                </section>

            </div>

        </main>
    );
}
