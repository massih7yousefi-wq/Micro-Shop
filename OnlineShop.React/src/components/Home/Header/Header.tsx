import {
    NavLink,
    Link,
    useNavigate,
} from "react-router-dom";

import {
    useState,
} from "react";

import {
    useAuth,
} from "../../../auth/AuthContext";

import "./Header.css";


const Header = () => {

    const [menuOpen, setMenuOpen] =
        useState(false);

    const {
        user,
        isAuthenticated,
        logout,
    } = useAuth();

    const navigate =
        useNavigate();


    const closeMenu = () => {
        setMenuOpen(false);
    };


    const handleLogout = async () => {

        closeMenu();

        await logout();

        navigate("/login");
    };


    const isAdmin =
        user?.roles?.some(
            role =>
                role.toLowerCase() === "admin"
        ) ?? false;


    return (
        <header className="site-header">

            <div className="site-header__inner">


                {/* Logo */}
                <Link
                    to="/"
                    className="site-logo"
                    onClick={closeMenu}
                >

                    <span className="site-logo__mark">

                        <span className="site-logo__line site-logo__line--left" />

                        <span className="site-logo__line site-logo__line--center" />

                        <span className="site-logo__line site-logo__line--right" />

                    </span>


                    <span className="site-logo__text">

                        <span className="site-logo__name">
                            Micro
                        </span>

                        <span className="site-logo__shop">
                            Shop
                        </span>

                    </span>

                </Link>


                {/* Navigation */}
                <nav
                    className={`site-navigation ${
                        menuOpen
                            ? "site-navigation--open"
                            : ""
                    }`}
                >


                    {/* Home */}
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `nav-link ${
                                isActive
                                    ? "nav-link--active"
                                    : ""
                            }`
                        }
                        onClick={closeMenu}
                    >
                        <span>
                            Home
                        </span>
                    </NavLink>


                    {/* Products */}
                    <NavLink
                        to="/products"
                        className={({ isActive }) =>
                            `nav-link ${
                                isActive
                                    ? "nav-link--active"
                                    : ""
                            }`
                        }
                        onClick={closeMenu}
                    >
                        <span>
                            Products
                        </span>
                    </NavLink>


                    {/* Authenticated User */}
                    {isAuthenticated && (
                        <NavLink
                            to="/account/profile"
                            className={({ isActive }) =>
                                `nav-link ${
                                    isActive
                                        ? "nav-link--active"
                                        : ""
                                }`
                            }
                            onClick={closeMenu}
                        >
                            <span>
                                Manage Account
                            </span>
                        </NavLink>
                    )}


                    {/* Admin */}
                    {isAuthenticated && isAdmin && (
                        <Link
                            to="/admin/users"
                            className="nav-link nav-link--admin"
                            onClick={closeMenu}
                        >
                            <span>
                                Admin Panel
                            </span>
                        </Link>
                    )}


                    {/* Guest Authentication */}
                    {!isAuthenticated && (
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `nav-link ${
                                        isActive
                                            ? "nav-link--active"
                                            : ""
                                    }`
                                }
                                onClick={closeMenu}
                            >
                                <span>
                                    Login
                                </span>
                            </NavLink>


                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    `nav-link ${
                                        isActive
                                            ? "nav-link--active"
                                            : ""
                                    }`
                                }
                                onClick={closeMenu}
                            >
                                <span>
                                    Register
                                </span>
                            </NavLink>
                        </>
                    )}


                    {/* Logout */}
                    {isAuthenticated && (
                        <button
                            type="button"
                            className="nav-link nav-link--logout"
                            onClick={handleLogout}
                        >
                            <span>
                                Logout
                            </span>
                        </button>
                    )}

                </nav>


                {/* Actions */}
                <div className="site-header__actions">


                    {/* Cart */}
                    <Link
                        to="/cart"
                        className="cart-button"
                        aria-label="Shopping cart"
                        onClick={closeMenu}
                    >

                        <span className="cart-button__icon">

                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >

                                <path
                                    d="M3 4H5L7.2 15.2C7.3 15.7 7.7 16 8.2 16H18.4C18.9 16 19.3 15.7 19.4 15.2L21 8H6"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                                <circle
                                    cx="9"
                                    cy="20"
                                    r="1.4"
                                    fill="currentColor"
                                />

                                <circle
                                    cx="18"
                                    cy="20"
                                    r="1.4"
                                    fill="currentColor"
                                />

                            </svg>

                        </span>


                        <span className="cart-button__text">
                            Cart
                        </span>


                        <span className="cart-button__badge">
                            0
                        </span>

                    </Link>


                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className={`menu-toggle ${
                            menuOpen
                                ? "menu-toggle--active"
                                : ""
                        }`}
                        onClick={() =>
                            setMenuOpen(
                                prev => !prev
                            )
                        }
                        aria-label="Toggle navigation"
                        aria-expanded={menuOpen}
                    >

                        <span />
                        <span />
                        <span />

                    </button>

                </div>

            </div>

        </header>
    );
};


export default Header;