//imports-----------------------------------
import { Link } from "react-router-dom";
import "./Hero.css";

//component-------------------------------
const Hero = () => {
    return (

        <section className="hero-section">


            <div className="hero-container">


                <div className="hero-content">


                    <span className="hero-badge">
                        New Collection
                    </span>


                    <h1 className="hero-title">
                        Discover Amazing Products
                    </h1>


                    <p className="hero-description">
                        Shop quality products at the best prices.
                        Find everything you need in one place.
                    </p>



                    <div className="hero-actions">

                        <Link
                            to="/products"
                            className="hero-button"
                        >
                            Shop Now
                        </Link>


                    </div>


                </div>





                <div className="hero-image">


                    <div className="hero-image-card">

                        <img
                            src="/images/hero-product.png"
                            alt="Featured products"
                        />

                    </div>


                </div>



            </div>


        </section>

    );

};
export default Hero;