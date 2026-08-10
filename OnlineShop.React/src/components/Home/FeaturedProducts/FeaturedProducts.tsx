import { useEffect, useState } from "react";
import { productService } from "../../../services/productService";
import { API_BASE } from "../../../services/api.ts";
import type { Product } from "../../../models/Product/Product";
import "./FeaturedProducts.css";

function FeaturedProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await productService.getProducts(
                    undefined,
                    undefined,
                    true,
                    1,
                    4
                );

                setProducts(data.products);
            } catch (error) {
                console.error(error);
                setError("Failed to load products.");
            } finally {
                setLoading(false);
            }
        };

        void loadProducts();
    }, []);

    if (loading) {
        return (
            <section className="featured-products">
                <div className="featured-products__container">
                    <div className="featured-products__loading">
                        Loading products...
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="featured-products">
                <div className="featured-products__container">
                    <div className="featured-products__error">
                        {error}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="featured-products">

            <div className="featured-products__container">

                <div className="featured-products__header">

                    <div>

                        <span className="featured-products__eyebrow">
                            Featured
                        </span>

                        <h2>
                            Featured Products
                        </h2>

                        <p>
                            Explore our latest products and discover
                            something you'll love.
                        </p>

                    </div>

                </div>


                <div className="featured-products__list">

                    {products.map((product) => {

                        const mainImage =
                            product.images.find(
                                (image) => image.isMain
                            ) ?? product.images[0];

                        return (
                            <article
                                className="product-card"
                                key={product.id}
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

                                        <span className="product-card__link">
                                            View Product →
                                        </span>

                                    </div>

                                </div>

                            </article>
                        );
                    })}

                </div>


                <div className="featured-products__action">

                    <button type="button">
                        View All Products
                    </button>

                </div>

            </div>

        </section>
    );
}

export default FeaturedProducts;



