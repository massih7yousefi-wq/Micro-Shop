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
        <div className="admin-pagination">

            <button
                type="button"
                disabled={!canGoPrevious}
                onClick={() =>
                    onPageChange(
                        currentPage - 1
                    )
                }
            >

                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        d="m15 18-6-6 6-6"
                    />
                </svg>

                Previous

            </button>


            <div className="admin-pagination__info">

                <span>
                    Page
                </span>

                <strong>
                    {currentPage}
                </strong>

                <span>
                    of {totalPages}
                </span>

            </div>


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

                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        d="m9 18 6-6-6-6"
                    />
                </svg>

            </button>

        </div>
    );
}