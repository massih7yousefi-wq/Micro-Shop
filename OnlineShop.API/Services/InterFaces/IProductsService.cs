using OnlineShop.API.DTOs;
using OnlineShop.API.Models;
namespace OnlineShop.API.Services.Interfaces
{  
    public interface IProductsService 
    {
        Task<List<ProductDto>> GetAllAsync();
        Task <ProductDto?> GetByIdAsync(int id);

        Task<Product?> FindEntityAsync(int id);

        Task<Product> CreateAsync(CreateProductDto dto);
        Task UpdateAsync(int id, UpdateProductDto dto);
        Task DeleteAsync(int id);

        Task<ProductResult> GetProductAsync(
            string? searchTerm,
            string? sortColumn,
            bool sortAscending,
            int pageNumber,
            int pageSize);

        Task<List<ProductDto>> GetShopProductsAsync();
        Task<ProductImage?> GetImageAsync(int imageId);

        Task DeleteImageAsync(int imageId);
    }
}
