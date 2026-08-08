using OnlineShopBlozer.Models;
namespace OnlineShopBlozer.Services.Interfaces
{  
    public interface IProductsService 
    {
        Task<List<Product>> GetAllAsync();
        Task <Product?> GetByIdAsync(int id);
        Task CreateAsync(Product product);
        Task UpdateAsync(Product product);
        Task DeleteAsync(int id);

        Task<ProductResult> GetProductAsync(
            string? searchTerm,
            string? sortColumn,
            bool sortAscending,
            int pageNumber,
            int pageSize);

        Task<List<Product>> GetShopProductsAsync(); 
    }
}
