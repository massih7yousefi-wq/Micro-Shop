// Imports----------------------------------------
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import type { Product, ProductImage } from "../../../models/Product/Product";
import { productService } from "../../../services/productService";


import "./ProductDetail.css";

// Component-------------------------------------
function ProductDetail() {

    // Get product id from URL--------------------
    const { id } = useParams<{ id: string }>();

    // States-------------------------------------
    const [product, setProduct] = useState<Product | null>(null);

    const [selectedImage, setSelectedImage] =
        useState<ProductImage | null>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // Load product--------------------------------
    useEffect(() => {

        const loadProduct = async () => {

            if (!id) {
                setError("Product id is missing.");
                setLoading(false);
                return;
            }

            try {

                const data = await productService.getById(
                    Number(id)
                );

                setProduct(data);

                // Select main image
                const mainImage =
                    data.images.find(
                        (image) => image.isMain
                    ) ?? data.images[0] ?? null;

                setSelectedImage(mainImage);

            } catch (error) {

                console.error(error);

                setError("Failed to load product.");

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

                <div className="product-detail__container">

                    <div className="product-detail__loading">
                        Loading product...
                    </div>

                </div>

            </section>
        );

    }

    // Error---------------------------------------
    if (error) {

        return (
            <section className="product-detail">

                <div className="product-detail__container">

                    <div className="product-detail__error">
                        {error}
                    </div>

                </div>

            </section>
        );

    }

    // Product not found---------------------------
    if (!product) {

        return (
            <section className="product-detail">

                <div className="product-detail__container">

                    <div className="product-detail__error">
                        Product not found.
                    </div>

                </div>

            </section>
        );

    }

    // Body----------------------------------------
    return (
        <section className="product-detail">

            <div className="product-detail__container">

                {/* Breadcrumb -------------------------- */}

                <div className="product-detail__breadcrumb">

                    <Link to="/">
                        Home
                    </Link>

                    <span>/</span>

                    <Link to="/products">
                        Products
                    </Link>

                    <span>/</span>

                    <span>
                        {product.name}
                    </span>

                </div>


                {/* Product ----------------------------- */}

                <div className="product-detail__product">

                    {/* Gallery ------------------------- */}

                    <div className="product-detail__gallery">

                        {/* Main Image ------------------- */}

                        <div className="product-detail__main-image">

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


                        {/* Thumbnails ------------------- */}

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


                    {/* Product Information -------------- */}

                    <div className="product-detail__content">

                        <span className="product-detail__category">
                            {product.categoryName}
                        </span>

                        <h1 className="product-detail__title">
                            {product.name}
                        </h1>

                        <div className="product-detail__price">
                            ${product.price.toFixed(2)}
                        </div>

                        <div className="product-detail__divider" />

                        <p className="product-detail__description">
                            {product.description}
                        </p>

                        <button
                            type="button"
                            className="product-detail__button"
                        >
                            Add to Cart
                        </button>

                    </div>

                </div>


                {/* Back -------------------------------- */}

                <div className="product-detail__back">

                    <Link to="/products">
                        ← Back to Products
                    </Link>

                </div>

            </div>

        </section>
    );
}

export default ProductDetail;



