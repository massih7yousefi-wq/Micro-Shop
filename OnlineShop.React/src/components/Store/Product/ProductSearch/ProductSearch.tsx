import { useEffect, useRef } from "react";
import "./ProductSearch.css";

interface ProductSearchProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

const ProductSearch = ({
                           searchTerm,
                           onSearchChange,
                       }: ProductSearchProps) => {

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyboardShortcut = (event: KeyboardEvent) => {
            if (
                event.key === "/" &&
                document.activeElement !== inputRef.current
            ) {
                event.preventDefault();
                inputRef.current?.focus();
            }

            if (
                event.key === "Escape" &&
                document.activeElement === inputRef.current
            ) {
                inputRef.current?.blur();
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyboardShortcut
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyboardShortcut
            );
        };
    }, []);


    const handleClear = () => {
        onSearchChange("");
        inputRef.current?.focus();
    };


    return (
        <div className="store-product-search">

            <div
                className={
                    searchTerm
                        ? "store-product-search__box has-value"
                        : "store-product-search__box"
                }
            >

                {/* Search Icon */}
                <span
                    className="store-product-search__icon"
                    aria-hidden="true"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle
                            cx="11"
                            cy="11"
                            r="7"
                        />

                        <path
                            d="m20 20-4-4"
                        />
                    </svg>
                </span>


                {/* Input */}
                <input
                    ref={inputRef}
                    className="store-product-search__input"
                    type="search"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(event) =>
                        onSearchChange(event.target.value)
                    }
                    aria-label="Search products"
                    autoComplete="off"
                />


                {/* Keyboard Shortcut */}
                {!searchTerm && (
                    <span
                        className="store-product-search__shortcut"
                        aria-hidden="true"
                    >
                        /
                    </span>
                )}


                {/* Clear */}
                {searchTerm && (
                    <button
                        type="button"
                        className="store-product-search__clear"
                        onClick={handleClear}
                        aria-label="Clear search"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M6 6l12 12" />
                            <path d="M18 6 6 18" />
                        </svg>
                    </button>
                )}

            </div>

        </div>
    );
};

export default ProductSearch;