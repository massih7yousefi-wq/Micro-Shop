//Usings---------------------------------------
using Microsoft.EntityFrameworkCore;
using OnlineShopBlozer.Data;
using OnlineShopBlozer.Models;
using OnlineShopBlozer.Services.Interfaces;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Client;
using OnlineShopBlozer.Helpers;

namespace OnlineShopBlozer.Services
{
    //-----------------------------------------------
    public class ProductService : IProductsService
    {
        private readonly IDbContextFactory<AppDbContext> _contextFactory;
        private readonly ILogger<ProductService> _logger;
        public ProductService(IDbContextFactory<AppDbContext> contextFactory,
                                ILogger<ProductService> logger)
        {
            _contextFactory = contextFactory;
            _logger = logger;
        }
        //Get_database-------------------------------------
        public async Task<List<Product>> GetAllAsync()
        {
            using var context = _contextFactory.CreateDbContext();
            try
            {
                return await context.Products
                    .Include(p => p.Category)
                    .ToListAsync();
            }
            catch (Exception ex)

            {
                _logger.LogError(ex, "Error While getting product");
                throw;
            }
        }
        //GetByIdAsync---------------------------------------
        public async Task<Product?> GetByIdAsync(int id)
        {
            using var context = _contextFactory.CreateDbContext();
            try
            {
                return await context.Products
                     .Include(p => p.Category)
                     .FirstOrDefaultAsync(p => p.Id == id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error While getting product with id {Id}", id);
                throw;
            }
        }
        //create_product--------------------------------------
        public async Task CreateAsync(Product product)
        {
            using var context = _contextFactory.CreateDbContext();
            try
            {
                //Error------
                var nameError =
                ValidationHelper.ValidateName(product.Name);

                if (nameError != null)
                {
                    throw new Exception(nameError);
                }
                var PriceError =
                        ValidationHelper.ValidatePrice(product.Price);

                if (PriceError != null)
                {
                    throw new Exception(PriceError);
                }
                //-----------
                await context.Products.AddAsync(product);
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error While creating product");
                throw;
            }
        }
        //Edit_product---------------------------------------
        public async Task UpdateAsync(Product product)
        {
            using var context = _contextFactory.CreateDbContext();
            try
            {
                //Error----
                var nameError =
                 ValidationHelper.ValidateName(product.Name);

                if (nameError != null)
                {
                    throw new Exception(nameError);
                }
                var PriceError =
                        ValidationHelper.ValidatePrice(product.Price);

                if (PriceError != null)
                {
                    throw new Exception(PriceError);
                }
                //----------
                context.Products.Update(product);
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating product with id {id}", product.Id);
                throw;
            }
        }
        //Delete_product------------------------------------------
        public async Task DeleteAsync(int id)
        {
            using var context = _contextFactory.CreateDbContext();
            try
            {
                var product = await context.Products.FindAsync(id);
                if (product == null)
                {
                    _logger.LogWarning($"product with id {id} not found");
                    return;
                }
                context.Products.Remove(product);
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error while delating product with id {id}");
                throw;
            }
        }
        //Search_Sort_Pagination--------------------------------
        public async Task<ProductResult> GetProductAsync(
            string? searchTerm,
            string? sortColumn,
            bool sortAscending,
            int pageNumber,
            int pageSize )
        {
            using var context = _contextFactory.CreateDbContext();
            try
            {
                IQueryable<Product> query = context.Products
                    .Include(p => p.Category);
                //Search--------------------
                if (!string.IsNullOrWhiteSpace(searchTerm))
                {
                    query = query.Where(p =>
                         p.Name.Contains(searchTerm));
                }
                //Sort---------------------
                query = sortColumn switch
                {
                    "Name" => sortAscending
                    ? query.OrderBy(p => p.Name)
                    : query.OrderByDescending(p => p.Name),

                    "Price" => sortAscending
                    ? query.OrderBy(p => p.Price)
                    : query.OrderByDescending(p => p.Price),

                    _ => sortAscending
                    ? query.OrderBy(p => p.Id)
                    : query.OrderByDescending(p => p.Id)
                };
                //Count------------------------
                int totalCount = await query.CountAsync();

                int totalPages =
                    (int)Math.Ceiling(
                            (double)totalCount / pageSize);
                //pagination--------------------
                var products = await query
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();
                return new ProductResult
                {
                    Products = products,
                    TotalCount = totalCount,
                    TotalPages = totalPages 
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex, "Error while getting products");
                throw;
            }
        }
        public async Task<List<Product>> GetShopProductsAsync() 
        {
            using var context = _contextFactory.CreateDbContext();
            try
            {
                return await context.Products
                    .Include(p => p.Category)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error while getting shop products");
                throw;
            }
        }


    }
}
