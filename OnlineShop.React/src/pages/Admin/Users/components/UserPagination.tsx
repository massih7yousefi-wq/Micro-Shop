interface UserPaginationProps {
    currentPage: number;
    totalPages: number;

    onPageChange: (
        page: number
    ) => void;
}

export default function UserPagination({
    currentPage,
    totalPages,
    onPageChange,
}: UserPaginationProps) {

    if (totalPages <= 1) {
        return null;
    }

    const canGoPrevious =
        currentPage > 1;

    const canGoNext =
        currentPage < totalPages;


    return (
        <div>

            <button
                type="button"
                disabled={!canGoPrevious}
                onClick={() =>
                    onPageChange(
                        currentPage - 1
                    )
                }
            >
                Previous
            </button>


            <span>
                Page {currentPage} of {totalPages}
            </span>


            <button
                type="button"
                disabled={!canGoNext}
                onClick={() =>
                    onPageChange(
                        currentPage + 1
                    )
                }
            >
                Next
            </button>

        </div>
    );
}

