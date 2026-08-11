// Imports----------------------------------------
import "./ProductSearch.css";

// Props------------------------------------------
interface ProductSearchProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

// Component-------------------------------------
const ProductSearch = ({
                           searchTerm,
                           onSearchChange,
                       }: ProductSearchProps) => {
    return (
        <div className="store-product-search">

            <input
                className="store-product-search__input"
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />

        </div>
    );
};

export default ProductSearch;