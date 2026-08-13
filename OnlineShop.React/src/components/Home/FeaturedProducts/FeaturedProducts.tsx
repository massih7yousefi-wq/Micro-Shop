import { useEffect, useState } from "react";
import { productService } from "../../../services/productService";
import type { Product } from "../../../models/Product/Product";
import ProductCard from "../../../components/Store/Product/ProductCart/ProductCart";
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

                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}

                </div>


                <div className="featured-products__action">

                    <button
                        type="button"
                        onClick={() => navigate("/products")}
                    >
                        View All Products
                    </button>

                </div>

            </div>

        </section>
    );
}

export default FeaturedProducts;



