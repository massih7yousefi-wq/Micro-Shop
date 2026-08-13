//imports-------------------------------
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoryService } from "../../../services/categoryService";
import type { Category } from "../../../models/Category/Category";
import "./Categories.css"

//State------------------------------------
function Categories() {
    const navigate = useNavigate();
const [categories, setCategories] = useState<Category[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
//useEffect-----------------------------------------------------
useEffect(() => {
    const loadCategories = async () => {
        try {
            const data = await categoryService.GetAll();

            setCategories(data);
        } catch (error) {
            console.error(error);
            setError("Failed to load categories.");
        } finally {
            setLoading(false);
        }
    };

   void loadCategories();
}, []);
//Body-----------------------------------------
    if (loading) {

        return (

            <section className="categories">

                <div className="categories__container">

                    <div className="categories__loading">
                        Loading categories...
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
                        {error}
                    </div>

                </div>

            </section>

        );

    }


    return (

        <section className="categories">

            <div className="categories__container">


                <div className="categories__header">

                    <div>

                        <span className="categories__eyebrow">
                            Explore
                        </span>

                        <h2>
                            Shop by Category
                        </h2>

                        <p>
                            Explore our products by category
                            and find exactly what you're looking for.
                        </p>

                    </div>

                </div>



                <div className="categories__list">

                    {categories.map((category, index) => (

                        <div
                            className="category-card"
                            key={category.id}
                            onClick={() =>
                                navigate(`/products?categoryId=${category.id}`)
                            }
                        >

                            <div className="category-card__number">
                                {String(index + 1).padStart(2, "0")}
                            </div>


                            <div className="category-card__content">

                                <h3>
                                    {category.name}
                                </h3>

                                <span className="category-card__link">
                                    Explore Products →
                                </span>

                            </div>


                            <div className="category-card__arrow">
                                →
                            </div>

                        </div>

                    ))}

                </div>


            </div>

        </section>

    );

}
export default Categories;
