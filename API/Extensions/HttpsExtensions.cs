using API.Helper;
using Microsoft.AspNetCore.Http;
using System.Text.Json;

namespace API.Extensions
{
    public static class HttpsExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response, int currentPageNumber, 
            int itemPerPage, int totalPage, int totalItem)
        {
            var paginationHeader = new PaginationHeader(currentPageNumber, itemPerPage, totalPage, totalItem);
            response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationHeader));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}
