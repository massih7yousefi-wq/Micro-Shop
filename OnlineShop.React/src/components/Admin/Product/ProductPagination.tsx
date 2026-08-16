import "./ProductPagination.css";

interface ProductPaginationProps {
    currentPage: number;
    totalPages: number;
    onPrevious: () => void;
    onNext: () => void;
}

const ProductPagination = ({
    currentPage,
    totalPages,
    onPrevious,
    onNext,
}: ProductPaginationProps) => {

    const safeTotalPages = Math.max(totalPages, 1);
    const safeCurrentPage = Math.min(
        Math.max(currentPage, 1),
        safeTotalPages
    );

    const isFirstPage = safeCurrentPage === 1;
    const isLastPage = safeCurrentPage === safeTotalPages;

    return (
        <div className="product-pagination">

            <div className="pagination-summary">
                <span className="pagination-summary-label">
                    Products
                </span>

                <span className="pagination-summary-divider" />

                <span className="pagination-summary-value">
                    Page {safeCurrentPage} of {safeTotalPages}
                </span>
            </div>


            <div className="pagination-controls">

                <button
                    type="button"
                    className="pagination-button pagination-button-previous"
                    onClick={onPrevious}
                    disabled={isFirstPage}
                >
                    <span className="pagination-button-icon">
                        ←
                    </span>

                    <span>
                        Previous
                    </span>
                </button>


                <div className="pagination-current">
                    {safeCurrentPage}
                </div>


                <button
                    type="button"
                    className="pagination-button pagination-button-next"
                    onClick={onNext}
                    disabled={isLastPage}
                >
                    <span>
                        Next
                    </span>

                    <span className="pagination-button-icon">
                        →
                    </span>
                </button>

            </div>

        </div>
    );
};

export default ProductPagination;

