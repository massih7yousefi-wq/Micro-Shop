//imports-------------------------------
import "./CategorySearch.css";

//props-----------------------------------
interface CategorySearchProps {

    searchTerm?: string;

    onSearchChange: (value: string) => void;

}

//component------------------------------------------
const CategorySearch = ({
                            searchTerm,
                            onSearchChange,
                        }: CategorySearchProps) => {
//Body-----------------------------------------------------
    return (

        <div className="category-search">

            <input
                className="category-search-input"
                type="text"
                placeholder="Search Categories..."
                value={searchTerm}
                onChange={(e) =>
                    onSearchChange(e.target.value)
                }
            />

        </div>

    );

};


export default CategorySearch;