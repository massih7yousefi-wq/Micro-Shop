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


    /* =========================================
       Loading
    ========================================= */

    if (loading) {

        return (

            <div className="products-state">

                <div className="products-loading-spinner" />

                <span>
                    Loading products...
                </span>

            </div>

        );
    }


    /* =========================================
       Error
    ========================================= */

    if (error) {

        return (

            <div className="products-state products-state--error">

                <div className="products-state-icon">
                    !
                </div>

                <div>
                    <strong>
                        Something went wrong
                    </strong>

                    <span>
                        {error}
                    </span>
                </div>

            </div>

        );
    }


    /* =========================================
       Sorting
    ========================================= */

    const handleSort = (column: string) => {

        if (sortColumn === column) {

            setSortAscending(
                !sortAscending
            );

            return;
        }


        setSortColumn(column);

        setSortAscending(true);
    };


    /* =========================================
       Body
    ========================================= */

    return (

        <div className="products-page">


            {/* =================================
                Page Header
            ================================= */}

            <section className="products-header">

                <div className="products-header-content">

                    <div className="products-eyebrow">
                        <span className="products-eyebrow-dot" />

                        Product Management
                    </div>


                    <h1 className="products-title">
                        Products
                    </h1>


                    <p className="products-description">
                        Manage your products, pricing and
                        categories from one place.
                    </p>

                </div>


                <button
                    type="button"
                    className="add-product-button"
                    onClick={() =>
                        navigate(
                            "/admin/products/create"
                        )
                    }
                >

                    <span className="add-product-icon">
                        +
                    </span>

                    <span>
                        Add Product
                    </span>

                </button>

            </section>


            {/* =================================
                Toolbar
            ================================= */}

            <section className="products-toolbar">

                <div className="products-toolbar-left">

                    <div className="products-toolbar-label">
                        All Products
                    </div>

                    <span className="products-count">
                        {products.length}
                    </span>

                </div>


                <ProductSearch
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                />

            </section>


            {/* =================================
                Table
            ================================= */}

            <section className="products-table-section">

                <ProductTable
                    products={products}
                    onDelete={deleteProduct}
                    onSort={handleSort}
                />

            </section>


            {/* =================================
                Pagination
            ================================= */}

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