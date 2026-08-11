//imports--------------------------------------
import type { Product } from "../../../../models/Product/Product.ts";
import { API_BASE } from "../../../../services/api.ts";
import { Link } from "react-router-dom";
import "./ProductCart.css";
//props----------------------------
interface ProductCartProps {
    product: Product;
}
//component-------------------------------------------------
function ProductCart({ product }: ProductCartProps) {
    //register_image--------------------------
    const mainImage =
        product.images.find(
            (image) => image.isMain
        ) ?? product.images[0];
    return (
        <article
            className="product-card"
        >

            <div className="product-card__image">

                {mainImage ? (
                    <img
                        src={`${API_BASE}${mainImage.imageUrl}`}
                        alt={product.name}
                    />
                ) : (
                    <div className="product-card__image-placeholder">
                        No Image
                    </div>
                )}

            </div>


            <div className="product-card__content">

                <span className="product-card__category">
                    {product.categoryName}
                </span>

                <h3>
                    {product.name}
                </h3>

                <div className="product-card__footer">

                    <span className="product-card__price">
                        ${product.price.toFixed(2)}
                    </span>

                    <Link
                        to={`/products/${product.id}`}
                        className="product-card__link"
                    >
                        View Product →
                    </Link>

                </div>

            </div>

        </article>
    );
}
export default ProductCart;