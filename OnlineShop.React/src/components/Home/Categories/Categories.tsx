import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { categoryService } from "../../../services/categoryService";
import type { Category } from "../../../models/Category/Category";

import "./Categories.css";


function Categories() {

    const navigate = useNavigate();

    const [categories, setCategories] =
        useState<Category[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {

        const loadCategories = async () => {

            try {

                const data =
                    await categoryService.GetAll();

                setCategories(data);

            } catch (error) {

                console.error(error);

                setError(
                    "Failed to load categories."
                );

            } finally {

                setLoading(false);

            }
        };

        void loadCategories();

    }, []);


    if (loading) {

        return (
            <section className="categories">

                <div className="categories__container">

                    <div className="categories__loading">

                        <span className="categories__loading-dot" />
                        <span className="categories__loading-dot" />
                        <span className="categories__loading-dot" />

                    </div>

                </div>

            </section>
        );
    }


    if (error) {

        return (
            <section className="categories">

                <div className="categories__container">

                    <div className="categories__error">

                        <span className="categories__error-icon">
                            !
                        </span>

                        <span>
                            {error}
                        </span>

                    </div>

                </div>

            </section>
        );
    }


    return (
        <section className="categories">

            <div className="categories__container">


                {/* Header */}

                <div className="categories__header">

                    <div className="categories__heading">

                        <span className="categories__eyebrow">

                            <span className="categories__eyebrow-line" />

                            Explore

                        </span>


                        <h2>
                            Shop by
                            <span>
                                Category.
                            </span>
                        </h2>

                    </div>


                    <p className="categories__description">
                        Find exactly what you're looking for.
                        Browse our carefully organized collection
                        and discover something worth adding to your world.
                    </p>

                </div>


                {/* Category list */}

                <div className="categories__list">

                    {categories.map(
                        (category, index) => (

                            <div
                                className="category-card"
                                key={category.id}
                                role="button"
                                tabIndex={0}
                                style={{
                                    animationDelay:
                                        `${index * 90}ms`
                                }}
                                onClick={() =>
                                    navigate(
                                        `/products?categoryId=${category.id}`
                                    )
                                }
                                onKeyDown={(event) => {

                                    if (
                                        event.key === "Enter" ||
                                        event.key === " "
                                    ) {

                                        navigate(
                                            `/products?categoryId=${category.id}`
                                        );

                                    }

                                }}
                            >

                                {/* Background number */}

                                <span className="category-card__background-number">
                                    {String(index + 1).padStart(2, "0")}
                                </span>


                                {/* Top */}

                                <div className="category-card__top">

                                    <span className="category-card__number">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <span className="category-card__line" />

                                </div>


                                {/* Content */}

                                <div className="category-card__content">

                                    <span className="category-card__label">
                                        Collection
                                    </span>

                                    <h3>
                                        {category.name}
                                    </h3>

                                </div>


                                {/* Bottom */}

                                <div className="category-card__bottom">

                                    <span className="category-card__link">
                                        Explore products
                                    </span>


                                    <span className="category-card__arrow">

                                        <span>
                                            →
                                        </span>

                                    </span>

                                </div>


                                {/* Hover glow */}

                                <span className="category-card__glow" />

                            </div>

                        )
                    )}

                </div>


                {/* Bottom decoration */}

                <div className="categories__footer-line">

                    <span />

                    <p>
                        {categories.length} collections
                        to explore
                    </p>

                    <span />

                </div>

            </div>

        </section>
    );
}


export default Categories;