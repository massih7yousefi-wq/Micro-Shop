import type { Product } from "../../../../models/Product/Product.ts";

import { Link } from "react-router-dom";

import "./ProductCart.css";


interface ProductCartProps {
    product: Product;
}


function ProductCart({
                         product
                     }: ProductCartProps) {

    const mainImage =
        product.images.find(
            (image) => image.isMain
        ) ?? product.images[0];


    return (
        <article className="product-card">


            {/* Image */}

            <Link
                to={`/products/${product.id}`}
                className="product-card__media"
                aria-label={`View ${product.name}`}
            >

                {mainImage ? (

                    <img
                        src={mainImage.imageUrl}
                        alt={product.name}
                        className="product-card__image"
                    />

                ) : (

                    <div className="product-card__placeholder">

                        <span className="product-card__placeholder-icon">
                            ◇
                        </span>

                        <span>
                            No image
                        </span>

                    </div>

                )}


                {/* Category */}

                <span className="product-card__badge">
                    {product.categoryName}
                </span>


                {/* Hover overlay */}

                <span className="product-card__overlay">

                    <span className="product-card__overlay-text">
                        View Product
                    </span>

                    <span className="product-card__overlay-arrow">
                        ↗
                    </span>

                </span>

            </Link>


            {/* Content */}

            <div className="product-card__content">


                <div className="product-card__heading">

                    <span className="product-card__eyebrow">
                        Featured
                    </span>


                    <h3 className="product-card__title">

                        <Link
                            to={`/products/${product.id}`}
                        >
                            {product.name}
                        </Link>

                    </h3>

                </div>


                <div className="product-card__footer">


                    <div className="product-card__price-wrapper">

                        <span className="product-card__price-label">
                            Price
                        </span>

                        <span className="product-card__price">
                            ${product.price.toFixed(2)}
                        </span>

                    </div>


                    <Link
                        to={`/products/${product.id}`}
                        className="product-card__link"
                    >

                        <span>
                            Details
                        </span>

                        <span className="product-card__link-arrow">
                            →
                        </span>

                    </Link>


                </div>


            </div>

        </article>
    );
}


export default ProductCart;