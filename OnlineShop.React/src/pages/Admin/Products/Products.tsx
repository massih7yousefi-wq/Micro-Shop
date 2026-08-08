import { useNavigate } from "react-router-dom";
import ProductSearch from "../../../components/Admin/Product/ProductSearch";
import ProductTable from "../../../components/Admin/Product/ProductTable";
import ProductPagination from "../../../components/Admin/Product/ProductPagination";
import { useProducts } from "../../../hooks/useProducts";
import "./Product.css";

const Products = () => {
    const navigate = useNavigate();
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

        deleteProduct,

        sortColumn,
        setSortColumn,
        sortAscending,
        setSortAscending,
    } = useProducts();

    if (loading) return <h2 className="loading-text">Loading...</h2>;
    if (error) return <h2 className="error-text">{error}</h2>;

    return (
        <div className="products-page">
            <div className="products-header">
                <h1 className="products-title">Products</h1>
                <button
                    className="add-product-button"
                    onClick={() => navigate("/admin/products/create")}
                >
                    + Add Product
                </button>
            </div>

            <ProductSearch searchTerm={searchTerm}
                           onSearchChange={handleSearchChange} />

            <ProductTable products={products} onDelete={deleteProduct} onSort={(column) => {
                if (sortColumn === column) {
                    setSortAscending(!sortAscending);
                } else {
                    setSortColumn(column);
                    setSortAscending(true);
                }
            }}
            />

            <ProductPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrevious={previousPage}
                onNext={nextPage}
            />
        </div>
    );
};

export default Products;