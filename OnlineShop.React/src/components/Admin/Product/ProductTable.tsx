import { useNavigate } from "react-router-dom";
import type { Product } from "../../../models/Product/Product";
import "./ProductTable.css";

interface ProductTableProps {
    products: Product[];
    onDelete: (id: number) => void;
    onSort: (column: string) => void;
}

const ProductTable = ({ products, onDelete,
                          onSort, }: ProductTableProps) => {
    const navigate = useNavigate();

    if (products.length === 0) {
        return (
            <div className="products-empty-state">
                <p className="products-empty-text">No products found.</p>
            </div>
        );
    }
    const getMainImage = (product: Product) => {
        if (!product.images || product.images.length === 0) return null;
        const main = product.images.find((img) => img.isMain);
        return main ? main.imageUrl : product.images[0].imageUrl;
    };
    return (
        <div className="products-table-container">
            <table className="products-table">
                <thead className="products-table-head">
                <tr>
                    <th className="products-table-heading">ID</th>
                    <th className="products-table-heading">Image</th>
                    <th className="products-table-heading"
                        onClick={() => onSort("Name")}>Name</th>
                    <th className="products-table-heading">Description</th>
                    <th className="products-table-heading"
                        onClick={() => onSort("Price")}>Price</th>
                    <th className="products-table-heading">Category</th>
                    <th className="products-table-heading">Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => {
                    const imageUrl = getMainImage(product);
                    return (
                        <tr key={product.id} className="products-table-row">
                            <td className="products-table-cell">{product.id}</td>
                            <td className="products-table-cell">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={product.name}
                                        className="product-image"
                                    />

                                ) : (
                                    <span className="product-no-image">No Image</span>
                                )}
                            </td>
                            <td className="products-table-cell product-name">
                                {product.name}
                            </td>
                            <td className="products-table-cell product-description-cell">
                                {product.description}
                            </td>
                            <td className="products-table-cell product-price">
                                ${product.price.toFixed(2)}
                            </td>
                            <td className="products-table-cell">
                                <span className="product-category">
                                    {product.categoryName}
                                </span>
                            </td>
                            <td className="products-table-cell">
                                <div className="product-actions">
                                    <button
                                        className="view-button"
                                        onClick={() => navigate(`/admin/products/${product.id}`)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="edit-button"
                                        onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this product?")) {
                                                onDelete(product.id);
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;