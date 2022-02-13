export interface Pagination {
    currentPageNumber: Number;
    itemsPerPage: Number;
    totalPages: Number;
    totalItems: Number;
}

export class PaginationResult<T> {
    result: T;
    pagination: Pagination;
}