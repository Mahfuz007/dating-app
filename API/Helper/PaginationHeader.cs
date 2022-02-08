namespace API.Helper
{
    public class PaginationHeader
    {
        #region varibale
        public int CurrentPageNumber { get; set; }
        public int ItemsPerPage { get; set; }
        public int TotalPages { get; set; }
        public int TotalItems { get; set; }
        #endregion

        #region construction
        public PaginationHeader(int currentPageNumber, int itemsPerPage, int totalPages, int totalItems)
        {
            CurrentPageNumber = currentPageNumber;
            ItemsPerPage = itemsPerPage;
            TotalPages = totalPages;
            TotalItems = totalItems;
        }
        #endregion
    }
}
