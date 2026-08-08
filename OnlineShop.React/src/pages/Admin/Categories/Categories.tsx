//imports--------------------------------------------------------
import { useNavigate } from "react-router-dom";
import CategorySearch from "../../../components/Admin/Category/CategorySearch";
import CategoryTable from "../../../components/Admin/Category/CategoryTable";
import CategoryPagination from "../../../components/Admin/Category/CategoryPagination";
import { useCategories } from "../../../hooks/useCategories";
import "./Categories.css";

//component---------------------------------------------
const Categories = () => {

    const navigate = useNavigate();


    const {
        categories,
        loading,
        error,
        search,
        setSearch,
        currentPage,
        totalPages,
        nextPage,
        previousPage,
        deleteCategory,
        changeSort,
    } = useCategories();



    if (loading)
        return <h2 className="loading-text">Loading...</h2>;


    if (error)
        return <h2 className="error-text">{error}</h2>;



    return (

        <div className="categories-page">


            <div className="categories-header">


                <h1 className="categories-title">
                    Categories
                </h1>



                <button

                    className="add-category-button"

                    onClick={() =>
                        navigate("/admin/categories/create")
                    }

                >
                    + Add Category
                </button>


            </div>




            <CategorySearch

                searchTerm={search}
                onSearchChange={setSearch}

            />




            <CategoryTable

                categories={categories}

                onDelete={deleteCategory}

                onSort={changeSort}

            />




            <CategoryPagination

                currentPage={currentPage}

                totalPages={totalPages}

                onPrevious={previousPage}

                onNext={nextPage}

            />


        </div>

    );

};


export default Categories;