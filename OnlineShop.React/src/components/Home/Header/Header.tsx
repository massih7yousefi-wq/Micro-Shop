//imports--------------------------------
import { NavLink, Link } from "react-router-dom";
import "./Header.css";
//component------------------------------
const Header = () => {
    return (
        <header className="site-header">

            <div className="site-header-container">


                {/* Logo--------------------------- */}

                <Link
                    to="/"
                    className="site-logo"
                >

                    <span className="site-logo-icon">
                        (M)
                    </span>

                    <span className="site-logo-text">
                        Micro Shop
                    </span>

                </Link>



                {/* Navigation-------------------------------- */}

                <nav className="site-navigation">


                    <NavLink
                        to="/"
                        className={({isActive}) =>
                            isActive
                                ? "nav-link active"
                                : "nav-link"
                        }
                    >
                        Home
                    </NavLink>


                    <NavLink
                        to="/products"
                        className={({isActive}) =>
                            isActive
                                ? "nav-link active"
                                : "nav-link"
                        }
                    >
                        Products
                    </NavLink>


                    <NavLink
                        to="/categories"
                        className={({isActive}) =>
                            isActive
                                ? "nav-link active"
                                : "nav-link"
                        }
                    >
                        Categories
                    </NavLink>


                </nav>




                {/* Actions--------------------------- */}

                <div className="site-header-actions">


                    <Link
                        to="/cart"
                        className="cart-link"
                    >

                        <span>
                            🛒
                        </span>

                        Cart

                    </Link>


                </div>


            </div>


        </header>
    );
};
export default Header;