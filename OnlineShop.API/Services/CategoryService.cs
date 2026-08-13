//using-----------------------------
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OnlineShop.API.Data;
using OnlineShop.API.Models;
using OnlineShop.API.Services.Interfaces;
using OnlineShop.API.Helpers;
using OnlineShop.API.DTOs.Category;

namespace OnlineShop.API.Services;

public class CategoryService : ICategoryService
{
    private readonly IDbContextFactory<AppDbContext> _contextFactory;
    private readonly ILogger<CategoryService> _logger;


    public CategoryService(
        IDbContextFactory<AppDbContext> contextFactory,
        ILogger<CategoryService> logger)
    {
        _contextFactory = contextFactory;
        _logger = logger;
    }

    //Get_list_category------------------------
    public async Task<List<CategoryDto>> GetAllAsync()
    {
        using var context = _contextFactory.CreateDbContext();
        try
        {
            return await context.Categories
                .Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    ProductCount = c.Products.Count()
                })
                .ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                "Error while getting categories");

            throw;
        }
    }

    //GetByIdAsync-------------------------------------
    public async Task<CategoryDto?> GetByIdAsync(int id)
    {
        using var context = _contextFactory.CreateDbContext();
        try
        {
            return await context.Categories
                .Where(c => c.Id == id)
                .Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    ProductCount = c.Products.Count()
                })
                .FirstOrDefaultAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                "Error while getting category with id {Id}",
                id);

            throw;
        }
    }

    //sort_search-pagination---------------------------
    public async Task<CategoryResult> GetCategoriesAsync(
        string? categorysearchTerm,
        string? categorysortColumn,
        bool categorysortAscending,
        int categorypageNumber,
        int categorypageSize)
    {
        using var context = _contextFactory.CreateDbContext();
        try
        {
            IQueryable<Category> query =
                context.Categories;


            // Search--------
            if (!string.IsNullOrWhiteSpace(categorysearchTerm))
            {
                query = query.Where(c =>
                    c.Name.Contains(categorysearchTerm));
            }


            // Sort-----------
            query = categorysortColumn switch
            {
                "Name" => categorysortAscending
                    ? query.OrderBy(c => c.Name)
                    : query.OrderByDescending(c => c.Name),

                "ProductCount" => categorysortAscending
                    ? query.OrderBy(c => c.Products.Count())
                    : query.OrderByDescending(c => c.Products.Count()),

                _ => categorysortAscending
                    ? query.OrderBy(c => c.Id)
                    : query.OrderByDescending(c => c.Id)
            };


            // Count----------
            int totalCount = await query.CountAsync();


            int totalPages =
                (int)Math.Ceiling(
                    (double)totalCount / categorypageSize);


            // Pagination---------
            var categories = await query
                    .Skip((categorypageNumber - 1) * categorypageSize)
                    .Take(categorypageSize)
                    .Select(c => new CategoryDto
                    {
                        Id = c.Id,
                        Name = c.Name,
                        ProductCount = c.Products.Count()
                    })
                    .ToListAsync();

            return new CategoryResult
            {
                Categories = categories,
                TotalCount = totalCount,
                TotalPages = totalPages
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                "Error while getting categories");

            throw;
        }
    }

    //Add_category------------------------
    public async Task<CategoryDto> CreateAsync(createCategoryDto dto) 
    {
        using var context = _contextFactory.CreateDbContext();
        try
        {
            var nameError =
            ValidationHelper.ValidateName(dto.Name);

            if (nameError != null)
            {
                throw new Exception(nameError);
            }


            var category = new Category
            {
                Name = dto.Name
            };


            await context.Categories.AddAsync(category);

            await context.SaveChangesAsync();


            return new CategoryDto
            {
                Id = category.Id,
                Name = category.Name
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                "Error while creating category");

            throw;
        }
    }
    //Edit-category-----------------------
    public async Task UpdateAsync(int id, updateCategoryDto dto)
    {
        using var context = _contextFactory.CreateDbContext();
        try
        {
            var category = await context.Categories
           .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
            {
                throw new Exception("Category not found.");
            }
            //error-----
            var nameError =
            ValidationHelper.ValidateName(dto.Name);

            if (nameError != null)
            {
                throw new Exception(nameError);
            }
            //-----
            category.Name = dto.Name;
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
            "Error while updating category with id {Id}",
            id);

            throw;
        }
    }
    //Delete_category----------------------
    public async Task DeleteAsync(int id)
    {
        using var context = _contextFactory.CreateDbContext();

        try
        {
            var category = await context.Categories
                .Include(c => c.Products)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
            {
                throw new KeyNotFoundException(
                    "Category not found.");
            }


            if (category.Products.Any())
            {
                throw new InvalidOperationException(
                    "You can't delete a category because it contains products.");
            }


            context.Categories.Remove(category);

            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "Error while deleting category with id {Id}",
                id);

            throw;
        }
    }
}

