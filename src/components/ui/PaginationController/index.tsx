import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export interface IPaginationControllerProps {
  limit: number;
  totalFiles: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function PaginationController({
  limit,
  totalFiles,
  currentPage,
  onPageChange,
}: IPaginationControllerProps) {
  const totalPages = Math.ceil(totalFiles / limit);
  const startFile = (currentPage - 1) * limit + 1;
  const endFile = Math.min(currentPage * limit, totalFiles);

  return (
    <>
      <div>
        Showing {startFile} to {endFile} files
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            />
          </PaginationItem>
          {totalPages <= 5 ? (
            Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={() => onPageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))
          ) : (
            <>
              {currentPage !== 1 && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === 1}
                    onClick={() => onPageChange(1)}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
              )}
              {currentPage > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {currentPage > 2 && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === currentPage - 1}
                    onClick={() => onPageChange(currentPage - 1)}
                  >
                    {currentPage - 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive={true}
                  onClick={() => onPageChange(currentPage)}
                >
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
              {currentPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === currentPage + 1}
                    onClick={() => onPageChange(currentPage + 1)}
                  >
                    {currentPage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              {currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
                {currentPage !== totalPages && (
                <PaginationItem>
                  <PaginationLink
                  href="#"
                  isActive={currentPage === totalPages}
                  onClick={() => onPageChange(totalPages)}
                  >
                  {totalPages}
                  </PaginationLink>
                </PaginationItem>
                )}
            </>
          )}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                currentPage < totalPages && onPageChange(currentPage + 1)
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
