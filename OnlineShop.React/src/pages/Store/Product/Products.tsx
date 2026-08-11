// Imports----------------------------------------
import ProductSearch from "../../../components/Store/Product/ProductSearch/ProductSearch";
import ProductCard from "../../../components/Store/Product/ProductCart/ProductCart";
import { useProducts } from "../../../hooks/useProducts";
import "./Products.css";

// Component--------------------------------------
function Products() {

    const {
        products,
        loading,
        error,

        searchTerm,
        handleSearchChange,

        currentPage,
        totalPages,
        nextPage,
        previousPage,
    } = useProducts();

    // Loading---------------------------------------
    if (loading) {
        return (
            <section className="store-products">
                <div className="store-products__container">

                    <div className="store-products__loading">
                        Loading products...
                    </div>

                </div>
            </section>
        );
    }

    // Error-----------------------------------------
    if (error) {
        return (
            <section className="store-products">
                <div className="store-products__container">

                    <div className="store-products__error">
                        {error}
                    </div>

                </div>
            </section>
        );
    }

    // Body------------------------------------------
    return (
        <section className="store-products">

            <div className="store-products__container">

                <div className="store-products__header">

                    <span className="store-products__eyebrow">
                        Store
                    </span>

                    <h1>
                        All Products
                    </h1>

                    <p>
                        Explore our products and find
                        something you'll love.
                    </p>

                </div>


                <ProductSearch
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                />


                <div className="store-products__list">

                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}

                </div>


                <div className="store-products__pagination">

                    <button
                        type="button"
                        onClick={previousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    <span>
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        type="button"
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>

                </div>

            </div>

        </section>
    );
}

export default Products;