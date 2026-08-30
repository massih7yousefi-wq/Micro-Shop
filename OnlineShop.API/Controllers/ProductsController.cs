//usings----------------------------
using Microsoft.AspNetCore.Mvc;
using OnlineShop.API.DTOs;
using OnlineShop.API.Models;
using OnlineShop.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace OnlineShop.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductsService _productsService;

        public ProductsController(IProductsService productsService)
        {
            _productsService = productsService;
        }

        //Get All Products---------------------------
        [HttpGet]
        public async Task<ActionResult<List<ProductDto>>> GetAll()
        {
            var products = await _productsService.GetAllAsync();
            return Ok(products);
        }

        //Search + Sort + Pagination-------------------------
        [HttpGet("search")]
        public async Task<ActionResult<ProductResult>> GetProducts(
            string? searchTerm,
            string? sortColumn,
            bool sortAscending = true,
            int? categoryId = null,
            int pageNumber = 1,
            int pageSize = 10)
        {
            var result = await _productsService.GetProductAsync(
                searchTerm,
                sortColumn,
                sortAscending,
                categoryId,
                pageNumber,
                pageSize);

            return Ok(result);
        }

        //Get Product By Id----------------------------
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetById(int id)
        {
            var product = await _productsService.GetByIdAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        //Create Product----------------------------
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<ProductDto>> Create(
            [FromForm] CreateProductDto dto)
        {
            var product = await _productsService.CreateAsync(dto);

            var createdProduct = await _productsService.GetByIdAsync(product.Id);

            return CreatedAtAction(
                nameof(GetById),
                new { id = product.Id },
                createdProduct);
        }

        //Update Product--------------------------
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            int id,
            [FromForm] UpdateProductDto dto)
        {
            try
            {
                await _productsService.UpdateAsync(id, dto);

                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new
                {
                    message = ex.Message
                });
            }
        }

        //Delete Product-----------------------------
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _productsService.DeleteAsync(id);

                return Ok(new
                {
                    message = "Product deleted successfully."
                });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new
                {
                    message = ex.Message
                });
            }
        }

        //Delete Single Image----------------------------------
        [Authorize(Roles = "Admin")]
        [HttpDelete("image/{imageId}")]
        public async Task<IActionResult> DeleteImage(int imageId)
        {
            try
            {
                await _productsService.DeleteImageAsync(imageId);

                return Ok(new
                {
                    message = "Image deleted successfully."
                });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new
                {
                    message = ex.Message
                });
            }
        }
    }
}