"use client"

import { usePagination } from "@/lib/hooks/usePagination";
import { PaginationArrow } from "@/components/ui/pagination/pagination-arrow";
import { PaginationNumber } from "@/components/ui/pagination/pagination-number";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const { allPages, currentPage, createPageURL } = usePagination({ totalPages });

  return (
    <section className="flex w-full justify-center items-center">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className="flex -space-x-px">
        {allPages.map((page, index) => {
          return (
            <PaginationNumber
              key={index}
              page={page}
              href={createPageURL(page)}
              isActive={currentPage === page}
              position={index === 0 ? "start" : page === totalPages ? "end" : null }
            />
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </section>
  );
};