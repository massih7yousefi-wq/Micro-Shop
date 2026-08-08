//imports-------------------------------------
import "./CategoryPagination.css";

//prop-----------------------------------
interface CategoryPaginationProps {

    currentPage: number;

    totalPages: number;

    onPrevious: () => void;

    onNext: () => void;

}

//component---------------------------------------------
const CategoryPagination = ({
                                currentPage,
                                totalPages,
                                onPrevious,
                                onNext,
                            }: CategoryPaginationProps) => {
//Body---------------------------------------------------------------
    return (

        <div className="category-pagination">

            <button
                className="pagination-button"
                onClick={onPrevious}
                disabled={currentPage === 1}
            >
                Previous
            </button>


            <span className="pagination-info">
                Page {currentPage} of {totalPages}
            </span>


            <button
                className="pagination-button"
                onClick={onNext}
                disabled={currentPage === totalPages}
            >
                Next
            </button>

        </div>

    );

};


export default CategoryPagination;