import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="site-footer">

            <div className="site-footer__glow" />

            <div className="footer-container">

                {/* Brand */}
                <div className="footer-brand">

                    <Link
                        to="/"
                        className="footer-logo"
                    >
                        <span className="footer-logo__mark">

                            <span className="footer-logo__line footer-logo__line--left" />
                            <span className="footer-logo__line footer-logo__line--center" />
                            <span className="footer-logo__line footer-logo__line--right" />

                        </span>

                        <span className="footer-logo__text">
                            <span className="footer-logo__name">
                                Micro
                            </span>

                            <span className="footer-logo__shop">
                                Shop
                            </span>
                        </span>
                    </Link>

                    <p className="footer-brand__description">
                        A modern shopping experience built around
                        quality products, simple navigation and
                        effortless discovery.
                    </p>

                    <div className="footer-brand__status">
                        <span className="footer-status__dot" />

                        <span>
                            Shopping made simple
                        </span>
                    </div>

                </div>


                {/* Explore */}
                <div className="footer-column">

                    <span className="footer-column__title">
                        Explore
                    </span>

                    <Link
                        to="/"
                        className="footer-link"
                    >
                        Home
                    </Link>

                    <Link
                        to="/products"
                        className="footer-link"
                    >
                        Products
                    </Link>

                    <Link
                        to="/categories"
                        className="footer-link"
                    >
                        Categories
                    </Link>

                </div>


                {/* Company */}
                <div className="footer-column">

                    <span className="footer-column__title">
                        Company
                    </span>

                    <Link
                        to="/products"
                        className="footer-link"
                    >
                        New Arrivals
                    </Link>

                    <Link
                        to="/products"
                        className="footer-link"
                    >
                        Featured
                    </Link>

                    <Link
                        to="/cart"
                        className="footer-link"
                    >
                        Shopping Cart
                    </Link>

                </div>


                {/* Contact */}
                <div className="footer-column footer-contact">

                    <span className="footer-column__title">
                        Get in touch
                    </span>

                    <a
                        href="mailto:support@microshop.com"
                        className="footer-contact__item"
                    >
                        <span className="footer-contact__icon">
                            @
                        </span>

                        <span>
                            support@microshop.com
                        </span>
                    </a>

                    <a
                        href="tel:+989305589409"
                        className="footer-contact__item"
                    >
                        <span className="footer-contact__icon">
                            +
                        </span>

                        <span>
                            +98 930 558 9409
                        </span>
                    </a>

                </div>

            </div>


            {/* Bottom */}
            <div className="footer-bottom">

                <div className="footer-bottom__container">

                    <span>
                        © 2026 Micro Shop
                    </span>

                    <span className="footer-bottom__separator">
                        /
                    </span>

                    <span>
                        All rights reserved.
                    </span>

                    <span className="footer-bottom__made">
                        Built with care
                        <span>♥</span>
                    </span>

                </div>

            </div>

        </footer>
    );
};

export default Footer;