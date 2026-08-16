import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

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


                {/* Desktop Navigation */}
                <nav
                    className={`site-navigation ${
                        menuOpen ? "site-navigation--open" : ""
                    }`}
                >

                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `nav-link ${isActive ? "nav-link--active" : ""}`
                        }
                        onClick={closeMenu}
                    >
                        <span>Home</span>
                    </NavLink>

                    <NavLink
                        to="/products"
                        className={({ isActive }) =>
                            `nav-link ${isActive ? "nav-link--active" : ""}`
                        }
                        onClick={closeMenu}
                    >
                        <span>Products</span>
                    </NavLink>

                    <NavLink
                        to="/categories"
                        className={({ isActive }) =>
                            `nav-link ${isActive ? "nav-link--active" : ""}`
                        }
                        onClick={closeMenu}
                    >
                        <span>Categories</span>
                    </NavLink>

                </nav>


                {/* Actions */}
                <div className="site-header__actions">

                    <Link
                        to="/cart"
                        className="cart-button"
                        aria-label="Shopping cart"
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
                            menuOpen ? "menu-toggle--active" : ""
                        }`}
                        onClick={() => setMenuOpen((prev) => !prev)}
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