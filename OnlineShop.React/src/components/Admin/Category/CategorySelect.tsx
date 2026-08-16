import {
    useEffect,
    useRef,
    useState,
} from "react";

import { categoryService } from "../../../services/categoryService";
import type { Category } from "../../../models/Category/Category";

import "./CategorySelect.css";


interface CategorySelectProps {
    value: number;
    onChange: (id: number) => void;
}


const CategorySelect = ({
                            value,
                            onChange,
                        }: CategorySelectProps) => {

    const [categories, setCategories] =
        useState<Category[]>([]);

    const [selectedCategory, setSelectedCategory] =
        useState<Category | null>(null);

    const [search, setSearch] =
        useState("");

    const [open, setOpen] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const selectRef =
        useRef<HTMLDivElement>(null);


    /*
     * Load categories
     */
    useEffect(() => {

        const timer = setTimeout(async () => {

            try {

                setLoading(true);

                const result =
                    await categoryService.getCategories(
                        search,
                        "Name",
                        true,
                        1,
                        50
                    );

                setCategories(
                    result.categories
                );

            } catch (err) {

                console.error(
                    "Failed to load categories:",
                    err
                );

            } finally {

                setLoading(false);

            }

        }, 300);


        return () =>
            clearTimeout(timer);

    }, [search]);


    /*
     * Keep selected category
     */
    useEffect(() => {

        if (!value) {
            setSelectedCategory(null);
            return;
        }

        const category =
            categories.find(
                category =>
                    category.id === value
            );

        if (category) {
            setSelectedCategory(category);
        }

    }, [categories, value]);


    /*
     * Close when clicking outside
     */
    useEffect(() => {

        const handleClickOutside = (
            event: MouseEvent
        ) => {

            if (
                selectRef.current &&
                !selectRef.current.contains(
                    event.target as Node
                )
            ) {

                setOpen(false);
                setSearch("");

            }

        };


        document.addEventListener(
            "mousedown",
            handleClickOutside
        );


        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);


    /*
     * Select category
     */
    const handleSelect = (
        category: Category
    ) => {

        onChange(category.id);

        setSelectedCategory(category);

        setSearch("");

        setOpen(false);
    };


    /*
     * Display value
     */
    const displayValue = open
        ? search
        : selectedCategory?.name ?? "";


    return (

        <div
            ref={selectRef}
            className={`category-select ${
                open
                    ? "category-select-open"
                    : ""
            }`}
        >

            {/* Input */}
            <div className="category-select-input-wrapper">

                <span
                    className="category-select-icon"
                    aria-hidden="true"
                >
                    ◇
                </span>


                <input
                    type="text"
                    className="category-select-input"
                    placeholder="Search category..."
                    value={displayValue}
                    onFocus={() => {
                        setOpen(true);
                    }}
                    onChange={event => {

                        setSearch(
                            event.target.value
                        );

                        setOpen(true);

                    }}
                    aria-expanded={open}
                    aria-haspopup="listbox"
                />


                <span
                    className={`category-select-arrow ${
                        open
                            ? "category-select-arrow-open"
                            : ""
                    }`}
                >
                    ↓
                </span>

            </div>


            {/* Dropdown */}
            {open && (

                <div
                    className="category-dropdown"
                    role="listbox"
                >

                    {/* Loading */}
                    {loading && (

                        <div className="category-dropdown-state">

                            <span className="category-loading-spinner" />

                            <span>
                                Loading categories...
                            </span>

                        </div>

                    )}


                    {/* Results */}
                    {!loading &&
                        categories.length > 0 && (

                            <div className="category-options">

                                {categories.map(category => {

                                    const isSelected =
                                        category.id === value;

                                    return (

                                        <button
                                            key={category.id}
                                            type="button"
                                            className={`category-option ${
                                                isSelected
                                                    ? "category-option-selected"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleSelect(
                                                    category
                                                )
                                            }
                                            role="option"
                                            aria-selected={
                                                isSelected
                                            }
                                        >

                                        <span className="category-option-icon">
                                            {category.name
                                                ?.charAt(0)
                                                .toUpperCase()}
                                        </span>


                                            <span className="category-option-content">

                                            <strong>
                                                {category.name}
                                            </strong>

                                            <span>
                                                {category.productCount} products
                                            </span>

                                        </span>


                                            {isSelected && (

                                                <span className="category-option-check">
                                                ✓
                                            </span>

                                            )}

                                        </button>

                                    );

                                })}

                            </div>

                        )}


                    {/* Empty */}
                    {!loading &&
                        categories.length === 0 && (

                            <div className="category-dropdown-state category-dropdown-empty">

                            <span className="category-empty-mini-icon">
                                ◫
                            </span>

                                <strong>
                                    No categories found
                                </strong>

                                <span>
                                Try another search.
                            </span>

                            </div>

                        )}

                </div>

            )}

        </div>
    );
};


export default CategorySelect;