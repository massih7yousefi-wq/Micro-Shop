import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
    return (
        <section className="hero-section">

            <div className="hero-bg-grid" />

            <div className="hero-bg-glow hero-bg-glow--one" />
            <div className="hero-bg-glow hero-bg-glow--two" />

            <div className="hero-container">

                {/* Content */}
                <div className="hero-content">

                    <div className="hero-badge">
                        <span className="hero-badge__dot" />

                        <span>
                            New Collection
                        </span>

                        <span className="hero-badge__arrow">
                            ↗
                        </span>
                    </div>

                    <h1 className="hero-title">
                        <span className="hero-title__line">
                            Discover
                        </span>

                        <span className="hero-title__accent">
                            Amazing
                        </span>

                        <span className="hero-title__line">
                            Products.
                        </span>
                    </h1>

                    <p className="hero-description">
                        A curated collection of products
                        designed to make everyday shopping
                        simpler, smarter, and better.
                    </p>

                    <div className="hero-actions">

                        <Link
                            to="/products"
                            className="hero-button hero-button--primary"
                        >
                            <span>
                                Shop Now
                            </span>

                            <span className="hero-button__arrow">
                                →
                            </span>
                        </Link>

                        <Link
                            to="/categories"
                            className="hero-button hero-button--secondary"
                        >
                            Explore Categories
                        </Link>

                    </div>

                    <div className="hero-meta">

                        <div className="hero-meta__item">
                            <strong>100+</strong>
                            <span>Products</span>
                        </div>

                        <span className="hero-meta__divider" />

                        <div className="hero-meta__item">
                            <strong>24/7</strong>
                            <span>Support</span>
                        </div>

                        <span className="hero-meta__divider" />

                        <div className="hero-meta__item">
                            <strong>Secure</strong>
                            <span>Shopping</span>
                        </div>

                    </div>

                </div>

                {/* Visual */}
                <div className="hero-visual">

                    <div className="hero-visual__orbit hero-visual__orbit--one" />
                    <div className="hero-visual__orbit hero-visual__orbit--two" />

                    <div className="hero-visual__halo" />

                    <div className="hero-main-card">

                        <div className="hero-main-card__top">
                            <span>
                                Featured
                            </span>

                            <span className="hero-main-card__status">
                                <i />
                                Available
                            </span>
                        </div>

                        <div className="hero-main-card__visual">

                            <div className="hero-product-shape hero-product-shape--one" />
                            <div className="hero-product-shape hero-product-shape--two" />
                            <div className="hero-product-shape hero-product-shape--three" />

                            <div className="hero-product-symbol">
                                <span className="hero-product-symbol__line hero-product-symbol__line--left" />
                                <span className="hero-product-symbol__line hero-product-symbol__line--center" />
                                <span className="hero-product-symbol__line hero-product-symbol__line--right" />
                            </div>

                        </div>

                        <div className="hero-main-card__bottom">

                            <div>
                                <span className="hero-main-card__label">
                                    Micro Shop
                                </span>

                                <strong>
                                    Curated Collection
                                </strong>
                            </div>

                            <span className="hero-main-card__arrow">
                                ↗
                            </span>

                        </div>

                    </div>

                    <div className="hero-floating-card hero-floating-card--top">

                        <span className="hero-floating-card__icon">
                            ✦
                        </span>

                        <div>
                            <strong>New</strong>
                            <span>Arrivals</span>
                        </div>

                    </div>

                    <div className="hero-floating-card hero-floating-card--bottom">

                        <span className="hero-floating-card__check">
                            ✓
                        </span>

                        <div>
                            <strong>Quality</strong>
                            <span>Guaranteed</span>
                        </div>

                    </div>

                    <span className="hero-visual__number">
                        01
                    </span>

                </div>

            </div>

            <div className="hero-scroll">
                <span className="hero-scroll__line" />
                <span>Scroll to explore</span>
            </div>

        </section>
    );
};

export default Hero;