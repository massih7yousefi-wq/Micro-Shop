using OnlineShopBlozer.Models;
namespace OnlineShopBlozer.Models
{
    public class ProductResult
    {
        public List<Product> Products { get; set; } = new();
        public int TotalPages { get; set; }
        public int TotalCount { get; set; }
    }
}
