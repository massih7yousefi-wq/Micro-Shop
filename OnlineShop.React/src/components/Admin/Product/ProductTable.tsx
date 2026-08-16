
import { useNavigate } from "react-router-dom";
import type { Product } from "../../../models/Product/Product";
import "./ProductTable.css";

interface ProductTableProps {
    products: Product[];
    onDelete: (id: number) => void;
    onSort: (column: string) => void;
}

const ProductTable = ({
    products,
    onDelete,
    onSort,
}: ProductTableProps) => {

    const navigate = useNavigate();

    const getMainImage = (product: Product) => {
        if (!product.images || product.images.length === 0) {
            return null;
        }

        const main = product.images.find(
            (img) => img.isMain
        );

        return main
            ? main.imageUrl
            : product.images[0].imageUrl;
    };


    if (products.length === 0) {
        return (
            <div className="products-empty-state">

                <div className="products-empty-icon">
                    ◫
                </div>

                <div className="products-empty-content">
                    <strong>No products found</strong>

                    <p>
                        There are no products matching your
                        current filters.
                    </p>
                </div>

            </div>
        );
    }


    return (
        <div className="products-table-wrapper">

            <div className="products-table-container">

                <table className="products-table">

                    <thead className="products-table-head">
                        <tr>

                            <th className="products-table-heading products-table-heading-id">
                                ID
                            </th>

                            <th className="products-table-heading">
                                Product
                            </th>

                            <th
                                className="products-table-heading products-table-sortable"
                                onClick={() => onSort("Name")}
                            >
                                <span>Name</span>
                                <span className="sort-indicator">
                                    ↕
                                </span>
                            </th>

                            <th className="products-table-heading products-table-description-heading">
                                Description
                            </th>

                            <th
                                className="products-table-heading products-table-sortable"
                                onClick={() => onSort("Price")}
                            >
                                <span>Price</span>
                                <span className="sort-indicator">
                                    ↕
                                </span>
                            </th>

                            <th className="products-table-heading">
                                Category
                            </th>

                            <th className="products-table-heading products-table-actions-heading">
                                Actions
                            </th>

                        </tr>
                    </thead>


                    <tbody>

                        {products.map((product) => {

                            const imageUrl =
                                getMainImage(product);

                            return (
                                <tr
                                    key={product.id}
                                    className="products-table-row"
                                >

                                    {/* ID */}
                                    <td className="products-table-cell products-table-id">
                                        #{product.id}
                                    </td>


                                    {/* Image */}
                                    <td className="products-table-cell">

                                        <div className="product-image-wrapper">

                                            {imageUrl ? (
                                                <img
                                                    src={imageUrl}
                                                    alt={product.name}
                                                    className="product-image"
                                                />
                                            ) : (
                                                <div className="product-no-image">
                                                    <span>—</span>
                                                </div>
                                            )}

                                        </div>

                                    </td>


                                    {/* Name */}
                                    <td className="products-table-cell product-name">
                                        <div className="product-name-content">

                                            <strong>
                                                {product.name}
                                            </strong>

                                            <span>
                                                Product #{product.id}
                                            </span>

                                        </div>
                                    </td>


                                    {/* Description */}
                                    <td
                                        className="
                                            products-table-cell
                                            product-description-cell
                                        "
                                    >
                                        <span>
                                            {product.description || "No description"}
                                        </span>
                                    </td>


                                    {/* Price */}
                                    <td className="products-table-cell">

                                        <span className="product-price">
                                            ${product.price.toFixed(2)}
                                        </span>

                                    </td>


                                    {/* Category */}
                                    <td className="products-table-cell">

                                        <span className="product-category">
                                            {product.categoryName}
                                        </span>

                                    </td>


                                    {/* Actions */}
                                    <td className="products-table-cell">

                                        <div className="product-actions">

                                            <button
                                                type="button"
                                                className="
                                                    product-action-button
                                                    product-action-view
                                                "
                                                onClick={() =>
                                                    navigate(
                                                        `/admin/products/${product.id}`
                                                    )
                                                }
                                            >
                                                View
                                            </button>

                                            <button
                                                type="button"
                                                className="
                                                    product-action-button
                                                    product-action-edit
                                                "
                                                onClick={() =>
                                                    navigate(
                                                        `/admin/products/edit/${product.id}`
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                className="
                                                    product-action-button
                                                    product-action-delete
                                                "
                                                onClick={() => {

                                                    const confirmed =
                                                        window.confirm(
                                                            "Are you sure you want to delete this product?"
                                                        );

                                                    if (confirmed) {
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

        </div>
    );
};

export default ProductTable;

