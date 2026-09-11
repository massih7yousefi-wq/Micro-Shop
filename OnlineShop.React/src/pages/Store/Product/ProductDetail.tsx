// Imports----------------------------------------
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import type {
    Product,
    ProductImage
} from "../../../models/Product/Product";

import { productService } from "../../../services/productService";

import "./ProductDetail.css";


// Component-------------------------------------
function ProductDetail() {

    // Get product id from URL--------------------
    const { id } = useParams<{ id: string }>();


    // States-------------------------------------
    const [product, setProduct] =
        useState<Product | null>(null);

    const [selectedImage, setSelectedImage] =
        useState<ProductImage | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // Load product--------------------------------
    useEffect(() => {

        const loadProduct = async () => {

            if (!id) {

                setError("Product id is missing.");

                setLoading(false);

                return;
            }


            try {

                const data =
                    await productService.getById(
                        Number(id)
                    );


                setProduct(data);


                // Select main image
                const mainImage =
                    data.images.find(
                        (image) => image.isMain
                    )
                    ?? data.images[0]
                    ?? null;


                setSelectedImage(mainImage);

            } catch (error) {

                console.error(error);

                setError(
                    "Failed to load product."
                );

            } finally {

                setLoading(false);

            }

        };


        void loadProduct();

    }, [id]);


    // Loading-------------------------------------
    if (loading) {

        return (

            <section className="product-detail">

                {/* Background video */}
                <video
                    className="product-detail__background-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-hidden="true"
                >
                    <source
                        src="/PJUZ7349.MP4"
                        type="video/mp4"
                    />
                </video>


                <div className="product-detail__background-overlay" />


                <div className="product-detail__container">

                    <div className="product-detail__loading">

                        <span className="product-detail__loader" />

                        <span>
                            Loading product...
                        </span>

                    </div>

                </div>

            </section>

        );

    }


    // Error---------------------------------------
    if (error) {

        return (

            <section className="product-detail">

                <video
                    className="product-detail__background-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-hidden="true"
                >
                    <source
                        src="/PJUZ7349.MP4"
                        type="video/mp4"
                    />
                </video>


                <div className="product-detail__background-overlay" />


                <div className="product-detail__container">

                    <div className="product-detail__error">

                        <span className="product-detail__error-icon">
                            !
                        </span>

                        <span>
                            {error}
                        </span>

                    </div>

                </div>

            </section>

        );

    }


    // Product not found---------------------------
    if (!product) {

        return (

            <section className="product-detail">

                <video
                    className="product-detail__background-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-hidden="true"
                >
                    <source
                        src="/PJUZ7349.MP4"
                        type="video/mp4"
                    />
                </video>


                <div className="product-detail__background-overlay" />


                <div className="product-detail__container">

                    <div className="product-detail__error">

                        <span className="product-detail__error-icon">
                            !
                        </span>

                        <span>
                            Product not found.
                        </span>

                    </div>

                </div>

            </section>

        );

    }


    // Body----------------------------------------
    return (

        <section className="product-detail">

            {/* =================================================
                BACKGROUND VIDEO
            ================================================= */}

            <video
                className="product-detail__background-video"
                autoPlay
                muted
                loop
                playsInline
                aria-hidden="true"
            >

                <source
                    src="/PJUZ7349.MP4"
                    type="video/mp4"
                />

            </video>


            {/* =================================================
                VIDEO OVERLAY
            ================================================= */}

            <div className="product-detail__background-overlay" />


            {/* =================================================
                DECORATIVE GLOW
            ================================================= */}

            <div className="product-detail__ambient-glow product-detail__ambient-glow--one" />

            <div className="product-detail__ambient-glow product-detail__ambient-glow--two" />


            {/* =================================================
                CONTENT
            ================================================= */}

            <div className="product-detail__container">


                {/* =================================================
                    BREADCRUMB
                ================================================= */}

                <div className="product-detail__breadcrumb">

                    <Link to="/">
                        Home
                    </Link>

                    <span className="product-detail__breadcrumb-separator">
                        /
                    </span>

                    <Link to="/products">
                        Products
                    </Link>

                    <span className="product-detail__breadcrumb-separator">
                        /
                    </span>

                    <span className="product-detail__breadcrumb-current">
                        {product.name}
                    </span>

                </div>


                {/* =================================================
                    PRODUCT
                ================================================= */}

                <div className="product-detail__product">


                    {/* =================================================
                        GALLERY
                    ================================================= */}

                    <div className="product-detail__gallery">


                        {/* Main Image ----------------------------- */}

                        <div className="product-detail__main-image">

                            <div className="product-detail__image-glow" />


                            <div className="product-detail__image-inner">

                                {selectedImage ? (

                                    <img
                                        src={selectedImage.imageUrl}
                                        alt={product.name}
                                    />

                                ) : (

                                    <div className="product-detail__image-placeholder">

                                        No Image

                                    </div>

                                )}

                            </div>

                        </div>


                        {/* Thumbnails ----------------------------- */}

                        {product.images.length > 0 && (

                            <div className="product-detail__thumbnails">

                                {product.images.map((image) => (

                                    <button
                                        type="button"
                                        key={image.id}
                                        className={`product-detail__thumbnail ${
                                            selectedImage?.id === image.id
                                                ? "product-detail__thumbnail--active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setSelectedImage(image)
                                        }
                                        aria-label={`View image ${
                                            image.id + 1
                                        } of ${product.name}`}
                                        aria-pressed={
                                            selectedImage?.id === image.id
                                        }
                                    >

                                        <img
                                            src={image.imageUrl}
                                            alt={product.name}
                                        />

                                    </button>

                                ))}

                            </div>

                        )}

                    </div>


                    {/* =================================================
                        PRODUCT INFORMATION
                    ================================================= */}

                    <div className="product-detail__content">


                        {/* Category ----------------------------- */}

                        <span className="product-detail__category">

                            <span className="product-detail__category-dot" />

                            {product.categoryName}

                        </span>


                        {/* Title -------------------------------- */}

                        <h1 className="product-detail__title">
                            {product.name}
                        </h1>


                        {/* Price -------------------------------- */}

                        <div className="product-detail__price">

                            <span className="product-detail__price-currency">
                                $
                            </span>

                            {product.price.toFixed(2)}

                        </div>


                        {/* Divider ------------------------------ */}

                        <div className="product-detail__divider" />


                        {/* Description -------------------------- */}

                        <p className="product-detail__description">
                            {product.description}
                        </p>


                        {/* Product Meta ------------------------- */}

                        <div className="product-detail__meta">

                            <div className="product-detail__meta-item">

                                <span className="product-detail__meta-icon">
                                    ✓
                                </span>

                                <span>
                                    Premium quality
                                </span>

                            </div>


                            <div className="product-detail__meta-item">

                                <span className="product-detail__meta-icon">
                                    ✓
                                </span>

                                <span>
                                    Secure shopping
                                </span>

                            </div>

                        </div>


                        {/* Add To Cart -------------------------- */}

                        <button
                            type="button"
                            className="product-detail__button"
                        >

                            <span className="product-detail__button-shine" />

                            <span className="product-detail__button-content">

                                <span>
                                    Add to Cart
                                </span>

                                <span className="product-detail__button-arrow">
                                    →
                                </span>

                            </span>

                        </button>

                    </div>

                </div>


                {/* =================================================
                    BACK
                ================================================= */}

                <div className="product-detail__back">

                    <Link to="/products">

                        <span className="product-detail__back-arrow">
                            ←
                        </span>

                        <span>
                            Back to Products
                        </span>

                    </Link>

                </div>

            </div>

        </section>

    );
}


export default ProductDetail;