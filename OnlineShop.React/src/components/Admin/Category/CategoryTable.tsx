//imports----------------------------------------
import { useNavigate } from "react-router-dom";
import type { Category } from "../../../models/Category/Category";
import "./CategoryTable.css";

//prop---------------------------------------------------
interface CategoryTableProps {
    categories: Category[];
    onDelete: (id: number) => void;
    onSort: (column: string) => void;
}


//component----------------------------------------------------
const CategoryTable = ({
                           categories,
                           onDelete,
                           onSort,
                       }: CategoryTableProps) => {

    const navigate = useNavigate();
    if (categories.length === 0) {
//body-------------------------------------
        return (

            <div className="category-empty-state">

                <p>
                    No categories found.
                </p>

            </div>

        );

    }



    return (

        <div className="category-table-container">

            <table className="category-table">


                <thead>

                <tr>

                    <th onClick={() => onSort("Id")}>ID</th>

                    <th onClick={()=>onSort("Name")}>Name</th>

                    <th onClick={() => onSort("ProductCount")}>Product</th>

                    <th>Actions</th>

                </tr>

                </thead>


                <tbody>

                {
                    categories.map(category => (

                        <tr key={category.id}>


                            <td>
                                {category.id}
                            </td>


                            <td className="category-name">

                                {category.name}

                            </td>

                            <td>{category.productCount}</td>


                            <td>

                                <div className="category-actions">


                                    <button
                                        className="edit-button"
                                        onClick={() =>
                                            navigate(
                                                `/admin/categories/edit/${category.id}`
                                            )
                                        }
                                    >
                                        Edit
                                    </button>



                                    <button
                                        className="delete-button"
                                        onClick={() => {

                                            if (
                                                window.confirm(
                                                    "Are you sure you want to delete this category?"
                                                )
                                            ) {

                                                onDelete(category.id);

                                            }

                                        }}
                                    >
                                        Delete
                                    </button>


                                </div>

                            </td>


                        </tr>

                    ))
                }

                </tbody>


            </table>

        </div>

    );

};


export default CategoryTable;