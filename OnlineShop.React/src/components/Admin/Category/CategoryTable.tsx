import { useNavigate } from "react-router-dom";
import type { Category } from "../../../models/Category/Category";
import "./CategoryTable.css";

interface CategoryTableProps {
    categories: Category[];
    onDelete: (id: number) => void;
    onSort: (column: string) => void;
}

const CategoryTable = ({
                           categories,
                           onDelete,
                           onSort,
                       }: CategoryTableProps) => {

    const navigate = useNavigate();


    if (categories.length === 0) {
        return (
            <div className="category-empty-state">

                <div className="category-empty-icon">
                    ◫
                </div>

                <div className="category-empty-content">
                    <strong>No categories found</strong>

                    <p>
                        There are no categories available right now.
                    </p>
                </div>

            </div>
        );
    }


    return (
        <div className="category-table-wrapper">

            <div className="category-table-container">

                <table className="category-table">

                    <thead className="category-table-head">

                    <tr>

                        <th
                            className="
                                    category-table-heading
                                    category-table-sortable
                                    category-table-id-heading
                                "
                            onClick={() => onSort("Id")}
                        >
                            <span>ID</span>
                            <span className="category-sort-indicator">
                                    ↕
                                </span>
                        </th>


                        <th
                            className="
                                    category-table-heading
                                    category-table-sortable
                                "
                            onClick={() => onSort("Name")}
                        >
                            <span>Name</span>
                            <span className="category-sort-indicator">
                                    ↕
                                </span>
                        </th>


                        <th
                            className="
                                    category-table-heading
                                    category-table-sortable
                                "
                            onClick={() => onSort("ProductCount")}
                        >
                            <span>Products</span>
                            <span className="category-sort-indicator">
                                    ↕
                                </span>
                        </th>


                        <th
                            className="
                                    category-table-heading
                                    category-table-actions-heading
                                "
                        >
                            Actions
                        </th>

                    </tr>

                    </thead>


                    <tbody>

                    {categories.map((category) => (

                        <tr
                            key={category.id}
                            className="category-table-row"
                        >

                            {/* ID */}
                            <td
                                className="
                                        category-table-cell
                                        category-table-id
                                    "
                            >
                                #{category.id}
                            </td>


                            {/* Name */}
                            <td
                                className="
                                        category-table-cell
                                        category-name
                                    "
                            >
                                <div className="category-name-content">

                                    <div className="category-name-icon">
                                        {category.name
                                            ?.charAt(0)
                                            .toUpperCase() || "C"}
                                    </div>

                                    <div className="category-name-info">

                                        <strong>
                                            {category.name}
                                        </strong>

                                        <span>
                                                Category #{category.id}
                                            </span>

                                    </div>

                                </div>
                            </td>


                            {/* Products */}
                            <td
                                className="
                                        category-table-cell
                                        category-product-count-cell
                                    "
                            >
                                    <span className="category-product-count">
                                        {category.productCount}
                                    </span>

                                <span className="category-product-label">
                                        products
                                    </span>
                            </td>


                            {/* Actions */}
                            <td className="category-table-cell">

                                <div className="category-actions">

                                    <button
                                        type="button"
                                        className="
                                                category-action-button
                                                category-edit-button
                                            "
                                        onClick={() =>
                                            navigate(
                                                `/admin/categories/edit/${category.id}`
                                            )
                                        }
                                    >
                                        Edit
                                    </button>


                                    <button
                                        type="button"
                                        className="
                                                category-action-button
                                                category-delete-button
                                            "
                                        onClick={() => {

                                            const confirmed =
                                                window.confirm(
                                                    "Are you sure you want to delete this category?"
                                                );

                                            if (confirmed) {
                                                onDelete(category.id);
                                            }

                                        }}
                                    >
                                        Delete
                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default CategoryTable;