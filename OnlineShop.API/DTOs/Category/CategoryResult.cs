namespace OnlineShop.API.DTOs.Category
{
    public class CategoryResult
    {
        public List<CategoryDto> Categories { get; set; } = new();
        public int TotalCount { get; set; }
        public int TotalPages { get; set; }

    }
}
