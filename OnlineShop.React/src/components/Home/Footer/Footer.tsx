import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="site-footer">


            <div className="footer-container">


                <div className="footer-section">

                    <h3 className="footer-title">
                        Micro Shop
                    </h3>


                    <p className="footer-text">
                        Your trusted online shopping destination.
                        Quality products with simple shopping experience.
                    </p>

                </div>




                <div className="footer-section">

                    <h3 className="footer-title">
                        Quick Links
                    </h3>


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





                <div className="footer-section">

                    <h3 className="footer-title">
                        Contact
                    </h3>


                    <p className="footer-text">
                        Email: support@microshop.com
                    </p>


                    <p className="footer-text">
                        Phone: +98 930 558 9409
                    </p>


                </div>



            </div>



            <div className="footer-bottom">

                © 2026 Micro Shop. All rights reserved.

            </div>


        </footer>

    );

};
export default Footer;