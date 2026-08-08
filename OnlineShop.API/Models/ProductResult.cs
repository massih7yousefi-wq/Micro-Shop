using OnlineShop.API.Models;
using OnlineShop.API.DTOs;
namespace OnlineShop.API.Models
{
    public class ProductResult
    {
        public List<ProductDto> Products { get; set; } = new();
        public int TotalPages { get; set; }
        public int TotalCount { get; set; }
    }
}
