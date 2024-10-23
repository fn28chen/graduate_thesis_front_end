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
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={currentPage === index + 1}
                onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
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
