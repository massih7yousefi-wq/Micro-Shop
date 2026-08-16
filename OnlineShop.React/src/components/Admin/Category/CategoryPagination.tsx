import "./CategoryPagination.css";


// Props
interface CategoryPaginationProps {
    currentPage: number;
    totalPages: number;
    onPrevious: () => void;
    onNext: () => void;
}


// Component
const CategoryPagination = ({
                                currentPage,
                                totalPages,
                                onPrevious,
                                onNext,
                            }: CategoryPaginationProps) => {

    const hasPages = totalPages > 0;

    const isFirstPage =
        currentPage <= 1;

    const isLastPage =
        currentPage >= totalPages;


    return (

        <div className="category-pagination">

            {/* Previous */}
            <button
                type="button"
                className="pagination-button pagination-button-prev"
                onClick={onPrevious}
                disabled={!hasPages || isFirstPage}
                aria-label="Previous page"
            >
                <span
                    className="pagination-button-icon"
                    aria-hidden="true"
                >
                    ←
                </span>

                <span>
                    Previous
                </span>
            </button>


            {/* Page Info */}
            <div className="pagination-info">

                <span className="pagination-info-label">
                    Page
                </span>

                <span className="pagination-current">
                    {hasPages ? currentPage : 0}
                </span>

                <span className="pagination-info-label">
                    of
                </span>

                <span className="pagination-total">
                    {hasPages ? totalPages : 0}
                </span>

            </div>


            {/* Next */}
            <button
                type="button"
                className="pagination-button pagination-button-next"
                onClick={onNext}
                disabled={!hasPages || isLastPage}
                aria-label="Next page"
            >
                <span>
                    Next
                </span>

                <span
                    className="pagination-button-icon"
                    aria-hidden="true"
                >
                    →
                </span>
            </button>

        </div>
    );
};


export default CategoryPagination;