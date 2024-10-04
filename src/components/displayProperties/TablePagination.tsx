import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

type TablePaginationProps = {
  propertiesPerPage: number;
  totalProperties: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
};

const TablePagination = ({
  propertiesPerPage,
  totalProperties,
  paginate,
  currentPage,
}: TablePaginationProps) => {
  const totalPages = Math.ceil(totalProperties / propertiesPerPage);
  const pageNumbers = [];

  // Create an array of all page numbers
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Determine which page numbers to show
  const visiblePages = () => {
    if (totalPages <= 4) {
      return pageNumbers; // Show all if total pages are less than or equal to 4
    } else if (currentPage <= 3) {
      return [...pageNumbers.slice(0, 4), "..."]; // Show first 4 pages and ellipsis
    } else if (currentPage >= totalPages - 2) {
      return ["...", ...pageNumbers.slice(totalPages - 4)]; // Show ellipsis and last 4 pages
    } else {
      return ["...", currentPage - 1, currentPage, currentPage + 1, "..."]; // Show middle pages with ellipsis
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <FaArrowLeftLong
            className={`cursor-pointer ${
              currentPage === 1 ? "cursor-not-allowed mr-3" : "mr-3"
            }`}
            onClick={handlePrevPage}
          />
        </PaginationItem>

        {/* Render pagination links */}
        {visiblePages().map((number, index) =>
          number === "..." ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={number}>
              <PaginationLink
                href="#"
                isActive={currentPage === number}
                onClick={() => paginate(Number(number))}
                className={`${
                  currentPage === number
                    ? "bg-black text-white rounded-full hover:bg-black hover:text-white"
                    : ""
                }`}
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <FaArrowRightLong
            className={`cursor-pointer ${
              currentPage === totalPages ? "cursor-not-allowed ml-3" : "ml-3"
            }`}
            onClick={handleNextPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
