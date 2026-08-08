using OnlineShopBlozer.Models;
namespace OnlineShopBlozer.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<List<Category>> GetAllAsync();
        Task<Category?> GetByIdAsync(int id);
        Task CreateAsync(Category category);
        Task UpdateAsync(Category category);
        Task DeleteAsync(int id);

        Task<CategoryResult> GetCategoriesAsync(
            string? searchTerm,
            string? sortColumn,
            bool sortAscending,
            int pageNumber,
            int pageSize
        );
    }
}
