using OnlineShopBlozer.Models;

namespace OnlineShopBlozer.Models
{
    public class CategoryResult
    {
        public List<Category> Categories { get; set; } = new();
        public int TotalCount { get; set; }
        public int TotalPages { get; set; }
    }
}
