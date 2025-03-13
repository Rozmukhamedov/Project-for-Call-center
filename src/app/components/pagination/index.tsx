import React, { FC } from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";

interface ESPaginationProps {
  items: number; // Общее количество элементов
  itemsPerPage?: number | string;
  page: number; // Текущая страница (управляется родителем)
  onPageChange: (selectedPage: number) => void; // Колбэк для изменения страницы
  paginationClassName?: string;
  activeClassName?: string;
  previousClassName?: string;
  nextClassName?: string;
  pageClassName?: string;
  pageLinkClassName?: string;
  breakClassName?: string;
  breakLinkClassName?: string;
  previousLabel?: React.ReactNode;
  nextLabel?: React.ReactNode;
  breakLabel?: React.ReactNode;
  pageSize: number;
}

export const ESPagination: FC<ESPaginationProps> = ({
  items = 0,
  itemsPerPage = 5,
  page = 1, // Управляемая текущая страница
  pageSize = 20,
  onPageChange,
  paginationClassName = "pagination custom-pagination justify-content-center",
  activeClassName = "active bg-primary text-white",
  previousClassName = "page-item cursor-pointer",
  nextClassName = "page-item cursor-pointer",
  pageClassName = "page-item cursor-pointer",
  pageLinkClassName = "page-link cursor-pointer",
  breakClassName = "page-item cursor-pointer",
  breakLinkClassName = "page-link cursor-pointer",
  previousLabel = <i className="bi bi-arrow-left"></i>,
  nextLabel = <i className="bi bi-arrow-right"></i>,
  breakLabel = "...",
}) => {
  // Общее количество страниц
  const pageCount = Math.ceil(items / Number(pageSize));

  // Обработчик смены страницы
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1); // Передаем выбранную страницу наверх
  };

  return (
    <div>
      {/* Пагинация */}
      <ReactPaginate
        forcePage={page - 1} // Управляемая текущая страница
        previousLabel={previousLabel}
        nextLabel={nextLabel}
        breakLabel={breakLabel}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={paginationClassName}
        pageClassName={pageClassName}
        pageLinkClassName={pageLinkClassName}
        previousClassName={previousClassName}
        previousLinkClassName={pageLinkClassName}
        nextClassName={nextClassName}
        nextLinkClassName={pageLinkClassName}
        breakClassName={`${breakClassName} disabled`}
        breakLinkClassName={`${breakLinkClassName} disabled`}
        activeClassName={activeClassName}
      />
    </div>
  );
};
