import { useEffect, useState } from "react";
import { productService } from "../../../services/productService";
import type { Product } from "../../../models/Product/Product";
import ProductCart from "../../../components/Store/Product/ProductCart/ProductCart";
import { useNavigate } from "react-router-dom";
import "./FeaturedProducts.css";

function FeaturedProducts() {
    const navigate = useNavigate();

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
                    undefined,
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

                    <div className="featured-products__heading">
                        <span className="featured-products__eyebrow">
                            Featured
                        </span>

                        <h2>Featured Products</h2>
                    </div>

                    <div className="featured-products__loading">
                        <span className="featured-products__loader" />
                        <span>Loading products...</span>
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

            <div className="featured-products__background" />

            <div className="featured-products__container">

                {/* Header */}
                <div className="featured-products__header">

                    <div className="featured-products__heading">

                        <span className="featured-products__eyebrow">
                            Featured Collection
                        </span>

                        <h2>
                            Products worth
                            <span> discovering.</span>
                        </h2>

                        <p>
                            A carefully selected collection of our
                            most popular products.
                        </p>

                    </div>


                    <button
                        type="button"
                        className="featured-products__desktop-link"
                        onClick={() => navigate("/products")}
                    >
                        <span>View all products</span>
                        <span className="featured-products__desktop-arrow">
                            →
                        </span>
                    </button>

                </div>


                {/* Products */}
                <div className="featured-products__list">

                    {products.map((product, index) => (
                        <div
                            className="featured-products__item"
                            key={product.id}
                            style={{
                                "--card-index": index,
                            } as React.CSSProperties}
                        >
                            <ProductCart product={product} />
                        </div>
                    ))}

                </div>


                {/* Mobile / bottom CTA */}
                <div className="featured-products__action">

                    <button
                        type="button"
                        onClick={() => navigate("/products")}
                    >
                        <span>Explore all products</span>

                        <span className="featured-products__action-arrow">
                            →
                        </span>
                    </button>

                </div>

            </div>

        </section>
    );
}

export default FeaturedProducts;

