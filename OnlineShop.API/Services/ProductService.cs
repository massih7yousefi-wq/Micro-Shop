//Usings---------------------------------------
using Microsoft.EntityFrameworkCore;
using OnlineShop.API.Data;
using OnlineShop.API.Models;
using OnlineShop.API.Services.Interfaces;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Client;
using OnlineShop.API.Helpers;
using OnlineShop.API.DTOs;

namespace OnlineShop.API.Services
{
    //-----------------------------------------------
    public class ProductService : IProductsService
    {
        private readonly IDbContextFactory<AppDbContext> _contextFactory;
        private readonly ILogger<ProductService> _logger;
        private readonly IImageService _imageService;
        public ProductService(IDbContextFactory<AppDbContext> contextFactory,
                                ILogger<ProductService> logger,
                                IImageService imageService)
        {
            _contextFactory = contextFactory;
            _logger = logger;
            _imageService = imageService;
        }
        //Get_database-------------------------------------
        public async Task<List<ProductDto>> GetAllAsync()
        {
            using var context = _contextFactory.CreateDbContext();
            try
            {
                return await context.Products
                    .Include(p => p.Category)
                    .Include(p => p.Images)
                    .Select(p => new ProductDto
                    {
                        Id = p.Id,
                        Name = p.Name,
                        Description = p.Description,
                        Price = p.Price,
                        CategoryId = p.CategoryId,
                        CategoryName = p.Category != null ? p.Category.Name : String.Empty,
                        Images = p.Images.Select(img => new ProductImageDto
                        {
                            Id = img.Id,
                            ImageUrl = img.ImageUrl,
                            IsMain = img.IsMain
                        }).ToList()
                    })
                    .ToListAsync();
            }
            catch (Exception ex)

            {
                _logger.LogError(ex, "Error While getting product");
                throw;
            }
        }
        //GetByIdAsync---------------------------------------
        public async Task<ProductDto?> GetByIdAsync(int id)
        {
            using var context = _contextFactory.CreateDbContext();
            try
            {
                return await context.Products
                     .Include(p => p.Category)
                     .Include(p => p.Images)
                     .Where(p => p.Id == id)
                     .Select(p => new ProductDto 
                     {
                         Id = p.Id,
                         Name = p.Name,
                         Description = p.Description,
                         Price = p.Price,
                         CategoryId = p.CategoryId,
                         CategoryName = p.Category != null ? p.Category.Name : String.Empty,
                         Images = p.Images.Select(img => new ProductImageDto
                         {
                             Id = img.Id,
                             ImageUrl = img.ImageUrl,
                             IsMain = img.IsMain
                         }).ToList()
                     })
                     .FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error While getting product with id {Id}", id);
                throw;
            }
        }
        //create_product--------------------------------------
        public async Task<Product> CreateAsync(CreateProductDto dto)
        {
            using var context = _contextFactory.CreateDbContext();

            try
            {
                //---------------- Validation ----------------

                var nameError = ValidationHelper.ValidateName(dto.Name);

                if (nameError != null)
                    throw new Exception(nameError);

                var priceError = ValidationHelper.ValidatePrice(dto.Price);

                if (priceError != null)
                    throw new Exception(priceError);

                if (dto.Images != null && dto.Images.Count > 5)
                    throw new Exception("Maximum 5 images are allowed.");

                //---------------- Create Product ----------------

                var product = new Product
                {
                    Name = dto.Name,
                    Description = dto.Description,
                    Price = dto.Price,
                    CategoryId = dto.CategoryId
                };

                //---------------- Upload Images ----------------

                if (dto.Images != null && dto.Images.Any())
                {
                    bool isFirst = true;

                    foreach (var file in dto.Images)
                    {
                        var imageUrl = await _imageService.UploadAsync(file);

                        product.Images.Add(new ProductImage
                        {
                            ImageUrl = imageUrl,
                            IsMain = isFirst
                        });

                        isFirst = false;
                    }
                }

                //---------------- Save ----------------

                context.Products.Add(product);

                await context.SaveChangesAsync();

                _logger.LogInformation(
                    "Product {ProductId} created successfully.",
                    product.Id);

                return product;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error while creating product");

                throw;
            }
        }
        //Edit_product---------------------------------------
        public async Task UpdateAsync(int id, UpdateProductDto dto)
        {
            using var context = _contextFactory.CreateDbContext();

            try
            {
                var product = await context.Products
                    .Include(p => p.Images)
                    .FirstOrDefaultAsync(p => p.Id == id);

                if (product == null)
                    throw new Exception("Product not found.");

                //---------------- Validation ----------------

                var nameError = ValidationHelper.ValidateName(dto.Name);

                if (nameError != null)
                    throw new Exception(nameError);

                var priceError = ValidationHelper.ValidatePrice(dto.Price);

                if (priceError != null)
                    throw new Exception(priceError);

                //---------------- Basic Info ----------------

                product.Name = dto.Name;
                product.Description = dto.Description;
                product.Price = dto.Price;
                product.CategoryId = dto.CategoryId;
                

                //---------------- Delete Images ----------------

                if (dto.DeletedImageIds != null && dto.DeletedImageIds.Any())
                {
                    var imagesToDelete = product.Images
                        .Where(i => dto.DeletedImageIds.Contains(i.Id))
                        .ToList();

                    foreach (var image in imagesToDelete)
                    {
                        await _imageService.DeleteAsync(image.ImageUrl);

                        context.ProductImages.Remove(image);
                    }
                }

                //---------------- Max Images ----------------

                int currentImages =
                    product.Images.Count -
                    (dto.DeletedImageIds?.Count ?? 0);

                int newImages =
                    dto.NewImages?.Count ?? 0;

                if (currentImages + newImages > 5)
                    throw new Exception("Maximum 5 images are allowed.");

                //---------------- Upload New Images ----------------

                if (dto.NewImages != null && dto.NewImages.Any())
                {
                    foreach (var file in dto.NewImages)
                    {
                        var imageUrl =
                            await _imageService.UploadAsync(file);

                        product.Images.Add(new ProductImage
                        {
                            ImageUrl = imageUrl,
                            IsMain = false
                        });
                    }
                }

                //---------------- Set Main Image ----------------

                if (dto.MainImageId.HasValue)
                {
                    foreach (var image in product.Images)
                    {
                        image.IsMain = false;
                    }

                    var mainImage = product.Images
                        .FirstOrDefault(i => i.Id == dto.MainImageId.Value);

                    if (mainImage != null)
                    {
                        mainImage.IsMain = true;
                    }
                }

                //---------------- First Image Main ----------------

                if (product.Images.Any() &&
                    !product.Images.Any(i => i.IsMain))
                {
                    product.Images.First().IsMain = true;
                }

                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error while updating product with id {id}", id);

                throw;
            }
        }
        //Delete_product------------------------------------------
        public async Task DeleteAsync(int id)
        {
            using var context = _contextFactory.CreateDbContext();

            try
            {
                var product = await context.Products
                    .Include(p => p.Images)
                    .FirstOrDefaultAsync(p => p.Id == id);

                if (product == null)
                    throw new Exception("Product not found.");

                foreach (var image in product.Images)
                {
                    await _imageService.DeleteAsync(image.ImageUrl);
                }

                context.Products.Remove(product);

                await context.SaveChangesAsync();

                _logger.LogInformation(
                    "Product {ProductId} deleted successfully.",
                    id);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error deleting product {ProductId}",
                    id);

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
                    .Include(p => p.Images)
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .Select(p => new ProductDto 
                    {
                        Id = p.Id,
                        Name = p.Name,
                        Description = p.Description,
                        Price = p.Price,
                        CategoryId = p.CategoryId,
                        CategoryName = p.Category != null ? p.Category.Name : String.Empty,
                        Images = p.Images.Select(img => new ProductImageDto
                        {
                            Id = img.Id,
                            ImageUrl = img.ImageUrl,
                            IsMain = img.IsMain
                        }).ToList()

                    })
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
        //Get_Shop_Product-----------------------------------
        public async Task<List<ProductDto>> GetShopProductsAsync() 
        {
            using var context = _contextFactory.CreateDbContext();
            try
            {
                return await context.Products
                    .Include(p => p.Category)
                    .Include(p => p.Images)
                    .Select(p => new ProductDto
                    {
                        Id = p.Id,
                        Name = p.Name,
                        Description = p.Description,
                        Price = p.Price,
                        CategoryId = p.CategoryId,
                        CategoryName = p.Category != null ? p.Category.Name : String.Empty,
                        Images = p.Images.Select(img => new ProductImageDto
                        {
                            Id = img.Id,
                            ImageUrl = img.ImageUrl,
                            IsMain = img.IsMain
                        }).ToList()
                    })
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error while getting shop products");
                throw;
            }
        }
        //Find_Entity-------------------------------------
        public async Task<Product?> FindEntityAsync(int id)
        {
            using var context = _contextFactory.CreateDbContext();
            try
            {
                return await context.Products
                    .Include(p => p.Images)
                    .FirstOrDefaultAsync(p => p.Id == id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error while finding product entity with id {id}");
                throw;
            }
        }
        //Get_Image-------------------------------------------------
        public async Task<ProductImage?> GetImageAsync(int imageId)
        {
            using var context = _contextFactory.CreateDbContext();


            return await context.ProductImages
                .FirstOrDefaultAsync(x => x.Id == imageId);
        }


        //DELETE_IMAGE--------------------------------------
        public async Task DeleteImageAsync(int imageId)
        {
            using var context = _contextFactory.CreateDbContext();

            try
            {
                var image = await context.ProductImages
                    .Include(i => i.Product)
                    .ThenInclude(p => p.Images)
                    .FirstOrDefaultAsync(i => i.Id == imageId);

                if (image == null)
                    throw new Exception("Image not found.");

                bool wasMain = image.IsMain;

                await _imageService.DeleteAsync(image.ImageUrl);

                context.ProductImages.Remove(image);

                if (wasMain)
                {
                    var nextImage = image.Product.Images
                        .Where(i => i.Id != image.Id)
                        .FirstOrDefault();

                    if (nextImage != null)
                    {
                        nextImage.IsMain = true;
                    }
                }

                await context.SaveChangesAsync();

                _logger.LogInformation(
                    "Image {ImageId} deleted successfully.",
                    imageId);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error deleting image {ImageId}",
                    imageId);

                throw;
            }
        }

    }
}
