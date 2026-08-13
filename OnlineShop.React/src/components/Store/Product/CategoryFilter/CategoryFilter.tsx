//imports--------------------------------------------------
import type { Category } from "../../../../models/Category/Category";
import "./CategoryFilter.css";
//props-----------------------------------------
interface CategoryFilterProps {
    categories: Category[];
    selectedCategoryId?: number;
    onCategoryChange: (categoryId?: number) => void;
}
//component-------------------------------------------
function CategoryFilter({
                            categories,
                            selectedCategoryId,
                            onCategoryChange,
                        }: CategoryFilterProps) {
//body--------------------------------------
    return (
        <div className="category-filter">

            <button
                type="button"
                className={
                    selectedCategoryId === undefined
                        ? "category-filter__item active"
                        : "category-filter__item"
                }
                onClick={() => onCategoryChange(undefined)}
            >
                All Categories
            </button>

            {categories.map((category) => (

                <button
                    type="button"
                    key={category.id}
                    className={
                        selectedCategoryId === category.id
                            ? "category-filter__item active"
                            : "category-filter__item"
                    }
                    onClick={() =>
                        onCategoryChange(category.id)
                    }
                >
                    {category.name}
                </button>

            ))}

        </div>
    );
}

export default CategoryFilter;