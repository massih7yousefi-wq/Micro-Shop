import "./ProductSearch.css"
//props------------------------------------------------
interface ProductSearchProps {
    searchTerm?: string;
    onSearchChange: (value: string) => void;
}
//Page-------------------------------------------------
const ProductSearch = ({
    searchTerm,
    onSearchChange,
}: ProductSearchProps) => {
    return (
        <div className="product-search">
            <input
            className="product-search-input"
            type="text"
            placeholder="Search Products..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    );
};
export default ProductSearch;