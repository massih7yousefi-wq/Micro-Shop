import { useEffect, useState } from "react";

import type { Category } from "../../../models/Category/Category";
import { categoryService } from "../../../services/categoryService";
import { useSearchParams } from "react-router-dom";

import CategoryFilter from "../../../components/Store/Product/CategoryFilter/CategoryFilter";
import ProductSearch from "../../../components/Store/Product/ProductSearch/ProductSearch";
import ProductCard from "../../../components/Store/Product/ProductCart/ProductCart";

import { useProducts } from "../../../hooks/useProducts";

import "./Products.css";


function Products() {

    const [searchParams, setSearchParams] = useSearchParams();

    const [categories, setCategories] = useState<Category[]>([]);


    const categoryIdParam = searchParams.get("categoryId");

    const categoryId = categoryIdParam
        ? Number(categoryIdParam)
        : undefined;


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
    } = useProducts(categoryId);


    useEffect(() => {

        const loadCategories = async () => {

            try {

                const data = await categoryService.GetAll();

                setCategories(data);

            } catch (error) {

                console.error(error);

            }

        };

        void loadCategories();

    }, []);


    const handleCategoryChange = (newCategoryId?: number) => {

        const params = new URLSearchParams(searchParams);


        if (newCategoryId === undefined) {

            params.delete("categoryId");

        } else {

            params.set(
                "categoryId",
                String(newCategoryId)
            );

        }


        setSearchParams(params);

    };


    if (loading) {

        return (
            <section className="store-products">

                <video
                    className="store-products__video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                >
                    <source
                        src="/PJUZ7349.MP4"
                        type="video/mp4"
                    />
                </video>


                <div className="store-products__container">

                    <div className="store-products__loading">
                        Loading products...
                    </div>

                </div>

            </section>
        );

    }


    if (error) {

        return (
            <section className="store-products">

                <video
                    className="store-products__video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                >
                    <source
                        src="/PJUZ7349.MP4"
                        type="video/mp4"
                    />
                </video>


                <div className="store-products__container">

                    <div className="store-products__error">
                        {error}
                    </div>

                </div>

            </section>
        );

    }


    return (
        <section className="store-products">

            {/* =====================================================
                BACKGROUND VIDEO
            ====================================================== */}

            <video
                className="store-products__video"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
            >
                <source
                    src="/PJUZ7349.MP4"
                    type="video/mp4"
                />
            </video>


            {/* =====================================================
                CONTENT
            ====================================================== */}

            <div className="store-products__container">


                {/* =================================================
                    HEADER
                ================================================== */}

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


                {/* =================================================
                    SEARCH
                ================================================== */}

                <ProductSearch
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                />


                {/* =================================================
                    CATEGORY FILTER
                ================================================== */}

                <CategoryFilter
                    categories={categories}
                    selectedCategoryId={categoryId}
                    onCategoryChange={handleCategoryChange}
                />


                {/* =================================================
                    PRODUCTS
                ================================================== */}

                <div className="store-products__list">

                    {products.map((product) => (

                        <ProductCard
                            key={product.id}
                            product={product}
                        />

                    ))}

                </div>


                {/* =================================================
                    PAGINATION
                ================================================== */}

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