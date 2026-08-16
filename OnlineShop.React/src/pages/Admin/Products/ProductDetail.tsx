import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { productService } from "../../../services/productService";
import type { Product } from "../../../models/Product/Product";

import "./ProductDetail.css";


const ProductDetail = () => {

    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();

    const [product, setProduct] =
        useState<Product | null>(null);

    const [loading, setLoading] =
        useState(true);


    /* =========================================
       Load Product
    ========================================= */

    useEffect(() => {

        const loadProduct = async () => {

            if (!id) {
                setLoading(false);
                return;
            }


            try {

                const data =
                    await productService.getById(
                        Number(id)
                    );

                setProduct(data);

            } catch (error) {

                console.error(
                    "Failed to load product:",
                    error
                );

                setProduct(null);

            } finally {

                setLoading(false);

            }
        };


        void loadProduct();

    }, [id]);


    /* =========================================
       Loading
    ========================================= */

    if (loading) {

        return (

            <div className="product-detail-state">

                <div className="product-detail-spinner" />

                <span>
                    Loading product...
                </span>

            </div>

        );
    }


    /* =========================================
       Not Found
    ========================================= */

    if (!product) {

        return (

            <div className="product-detail-state">

                <div className="product-detail-state-icon">
                    ?
                </div>

                <strong>
                    Product not found
                </strong>

                <button
                    type="button"
                    className="product-detail-state-button"
                    onClick={() =>
                        navigate("/admin/products")
                    }
                >
                    Back to Products
                </button>

            </div>

        );
    }


    /* =========================================
       Main Image
    ========================================= */

    const mainImage =
        product.images?.find(
            image => image.isMain
        ) ??
        product.images?.[0];


    const otherImages =
        product.images?.filter(
            image => image.id !== mainImage?.id
        ) ?? [];


    /* =========================================
       Body
    ========================================= */

    return (

        <div className="product-detail-page">


            {/* =================================
                Top Bar
            ================================= */}

            <div className="product-detail-topbar">

                <button
                    type="button"
                    className="product-detail-back-button"
                    onClick={() =>
                        navigate("/admin/products")
                    }
                >
                    <span>
                        ←
                    </span>

                    Back to Products
                </button>


                <div className="product-detail-id">
                    PRODUCT #{product.id}
                </div>

            </div>


            {/* =================================
                Main
            ================================= */}

            <div className="product-detail-layout">


                {/* =================================
                    Gallery
                ================================= */}

                <section className="product-detail-gallery">


                    {/* Main Image */}

                    <div className="product-detail-main-image">

                        {mainImage ? (

                            <img
                                src={mainImage.imageUrl}
                                alt={product.name}
                            />

                        ) : (

                            <div className="product-detail-no-image">
                                No Image
                            </div>

                        )}

                        <div className="product-detail-image-badge">
                            Product Preview
                        </div>

                    </div>


                    {/* Thumbnails */}

                    {otherImages.length > 0 && (

                        <div className="product-detail-thumbnails">

                            {product.images.map(image => (

                                <div
                                    key={image.id}
                                    className={`product-detail-thumbnail ${
                                        image.id === mainImage?.id
                                            ? "product-detail-thumbnail--active"
                                            : ""
                                    }`}
                                >

                                    <img
                                        src={image.imageUrl}
                                        alt={product.name}
                                    />

                                </div>

                            ))}

                        </div>

                    )}

                </section>


                {/* =================================
                    Information
                ================================= */}

                <section className="product-detail-info">


                    {/* Category */}

                    <div className="product-detail-category-badge">

                        <span />

                        {product.categoryName}

                    </div>


                    {/* Title */}

                    <h1 className="product-detail-title">
                        {product.name}
                    </h1>


                    {/* Description */}

                    <p className="product-detail-description">
                        {product.description}
                    </p>


                    {/* Price */}

                    <div className="product-detail-price-card">

                        <span className="product-detail-price-label">
                            Current Price
                        </span>

                        <strong className="product-detail-price">
                            ${product.price.toFixed(2)}
                        </strong>

                    </div>


                    {/* Divider */}

                    <div className="product-detail-divider" />


                    {/* Metadata */}

                    <div className="product-detail-meta">


                        <div className="product-detail-meta-item">

                            <span>
                                Product ID
                            </span>

                            <strong>
                                #{product.id}
                            </strong>

                        </div>


                        <div className="product-detail-meta-item">

                            <span>
                                Category
                            </span>

                            <strong>
                                {product.categoryName}
                            </strong>

                        </div>


                        <div className="product-detail-meta-item">

                            <span>
                                Images
                            </span>

                            <strong>
                                {product.images?.length ?? 0}
                            </strong>

                        </div>

                    </div>


                    {/* Actions */}

                    <div className="product-detail-actions">

                        <button
                            type="button"
                            className="product-detail-edit-button"
                            onClick={() =>
                                navigate(
                                    `/admin/products/edit/${product.id}`
                                )
                            }
                        >
                            Edit Product
                        </button>


                        <button
                            type="button"
                            className="product-detail-secondary-button"
                            onClick={() =>
                                navigate("/admin/products")
                            }
                        >
                            Back
                        </button>

                    </div>

                </section>

            </div>

        </div>
    );
};


export default ProductDetail;