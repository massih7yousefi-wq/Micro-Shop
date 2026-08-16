import "./ProductSearch.css";

// Props
interface ProductSearchProps {
    searchTerm?: string;
    onSearchChange: (value: string) => void;
}

// Page
const ProductSearch = ({
                           searchTerm = "",
                           onSearchChange,
                       }: ProductSearchProps) => {

    const handleClear = () => {
        onSearchChange("");
    };

    return (
        <div className="product-search">

            <div className="product-search-box">

                {/* Search Icon */}
                <span
                    className="product-search-icon"
                    aria-hidden="true"
                >
                    ⌕
                </span>

                {/* Input */}
                <input
                    className="product-search-input"
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) =>
                        onSearchChange(e.target.value)
                    }
                    aria-label="Search products"
                />

                {/* Clear */}
                {searchTerm && (
                    <button
                        type="button"
                        className="product-search-clear"
                        onClick={handleClear}
                        aria-label="Clear search"
                    >
                        ×
                    </button>
                )}

                {/* Keyboard Hint */}
                {!searchTerm && (
                    <span className="product-search-hint">
                        Search
                    </span>
                )}

            </div>

        </div>
    );
};

export default ProductSearch;