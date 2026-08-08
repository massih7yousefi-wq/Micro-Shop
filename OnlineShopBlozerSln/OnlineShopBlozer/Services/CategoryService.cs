using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OnlineShopBlozer.Data;
using OnlineShopBlozer.Models;
using OnlineShopBlozer.Services.Interfaces;
using OnlineShopBlozer.Helpers;

namespace OnlineShopBlozer.Services;

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
    public async Task<List<Category>> GetAllAsync()
    {
        using var context = _contextFactory.CreateDbContext();
        try
        {
            return await context.Categories
                .Include(c => c.Products)
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
    public async Task<Category?> GetByIdAsync(int id)
    {
        using var context = _contextFactory.CreateDbContext();
        try
        {
            return await context.Categories
                .Include(c => c.Products)
                .FirstOrDefaultAsync(c => c.Id == id);
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
                context.Categories
                .Include(c => c.Products);


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
    public async Task CreateAsync(Category category)
    {
        using var context = _contextFactory.CreateDbContext();
        try
        {
            //Error-----------
            var nameError =
                ValidationHelper.ValidateName(category.Name);

            if (nameError != null)
            {
               throw new Exception(nameError);
            }
            //----------------
            await context.Categories.AddAsync(category);

            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                "Error while creating category");

            throw;
        }
    }
    //Edit-category-----------------------
    public async Task UpdateAsync(Category category)
    {
        using var context = _contextFactory.CreateDbContext();
        try
        {
            //error-----
            var nameError =
                    ValidationHelper.ValidateName(category.Name);

            if (nameError != null)
            {
                throw new Exception(nameError);
            }
            //-----
            context.Categories.Update(category);

            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                "Error while updating category with id {Id}",
                category.Id);

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
                _logger.LogWarning(
                    "Category with id {Id} was not found.",
                    id);

                return;
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
