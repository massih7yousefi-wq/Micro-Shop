import { useEffect, useState } from "react";
import "./CategorySearch.css";


// Props
interface CategorySearchProps {
    searchTerm?: string;
    onSearchChange: (value: string) => void;
}


// Component
const CategorySearch = ({
                            searchTerm = "",
                            onSearchChange,
                        }: CategorySearchProps) => {

    const [focused, setFocused] = useState(false);
    const [localValue, setLocalValue] = useState(searchTerm);


    /*
     * Keep local value synced with parent
     */
    useEffect(() => {
        setLocalValue(searchTerm);
    }, [searchTerm]);


    const handleChange = (
        value: string
    ) => {

        setLocalValue(value);
        onSearchChange(value);

    };


    const handleClear = () => {

        setLocalValue("");
        onSearchChange("");

    };


    return (

        <div
            className={`category-search ${
                focused
                    ? "category-search-focused"
                    : ""
            }`}
        >

            <div className="category-search-inner">

                {/* Search Icon */}
                <span
                    className="category-search-icon"
                    aria-hidden="true"
                >
                    ⌕
                </span>


                {/* Input */}
                <input
                    className="category-search-input"
                    type="text"
                    placeholder="Search categories..."
                    value={localValue}
                    onFocus={() =>
                        setFocused(true)
                    }
                    onBlur={() =>
                        setFocused(false)
                    }
                    onChange={(e) =>
                        handleChange(
                            e.target.value
                        )
                    }
                />


                {/* Clear */}
                {localValue.length > 0 && (

                    <button
                        type="button"
                        className="category-search-clear"
                        onMouseDown={(e) =>
                            e.preventDefault()
                        }
                        onClick={handleClear}
                        aria-label="Clear search"
                    >
                        ×
                    </button>

                )}

            </div>

        </div>
    );
};


export default CategorySearch;