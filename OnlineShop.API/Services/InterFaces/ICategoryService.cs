using OnlineShop.API.DTOs.Category;

namespace OnlineShop.API.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<List<CategoryDto>> GetAllAsync();
        Task<CategoryDto?> GetByIdAsync(int id);
        Task<CategoryDto> CreateAsync(createCategoryDto dto);
        Task UpdateAsync(int id, updateCategoryDto dto);
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
