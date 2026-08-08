import "./ProductPagination.css"
//props-----------------------------------------
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
    return (
        <div className="product-pagination">
            <button className="pagination-button"
                    onClick={onPrevious}
                    disabled={currentPage === 1}>
                Previous
            </button>
            <span className="pagination-info">
                Page {currentPage} of {totalPages}
            </span>
            <button className="pagination-button"
                     onClick={onNext}
                     disabled={currentPage === totalPages}>
                Next
                </button>
        </div>
    );
};
export default ProductPagination;