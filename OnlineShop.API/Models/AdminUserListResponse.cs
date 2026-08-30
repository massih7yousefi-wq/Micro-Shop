namespace OnlineShop.API.Models
{
    public class AdminUserListResponse
    {
        public IReadOnlyList<AdminUserResponse> Users { get; set; }
            = new List<AdminUserResponse>();

        public int Page { get; set; }

        public int PageSize { get; set; }

        public int TotalCount { get; set; }

        public int TotalPages { get; set; }
    }
}