import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type CustomerPaginationProps = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  pageSize: number;
  totalItems: number;
};

const CustomerPagination = ({
  currentPage,
  pageSize,
  totalItems,
  setCurrentPage,
  totalPages,
}: CustomerPaginationProps) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <nav
      className="flex flex-col gap-3 border-t border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
      aria-label="Customer pagination"
    >
      <p className="text-sm text-muted-foreground" aria-live="polite">
        Showing{" "}
        <span className="font-medium text-foreground">
          {startItem}–{endItem}
        </span>{" "}
        of <span className="font-medium text-foreground">{totalItems}</span>
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((previous) => previous - 1)}
          className="pagination-button"
          aria-label="Previous page"
        >
          <ChevronLeft aria-hidden="true" size={16} />
          <span className="hidden sm:inline">Previous</span>
        </button>
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          return (
            <button
              type="button"
              key={page}
              onClick={() => setCurrentPage(page)}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
              className={`pagination-button min-w-9 ${currentPage === page ? "bg-primary text-primary-foreground hover:bg-primary" : ""}`}
            >
              {page}
            </button>
          );
        })}
        <button
          type="button"
          disabled={totalPages === 0 || currentPage === totalPages}
          onClick={() => setCurrentPage((previous) => previous + 1)}
          className="pagination-button"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight aria-hidden="true" size={16} />
        </button>
      </div>
    </nav>
  );
};

export default CustomerPagination;
