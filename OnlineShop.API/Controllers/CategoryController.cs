//Usings------------------------------------
using Microsoft.AspNetCore.Mvc;
using OnlineShop.API.DTOs.Category;
using OnlineShop.API.Services.Interfaces;

namespace OnlineShop.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(
            ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        //GET-----------------------------------------
        [HttpGet]
        public async Task<ActionResult<List<CategoryDto>>> GetAll()
        {
            var categories = await _categoryService.GetAllAsync();

            return Ok(categories);
        }
        //Get_By_Id-------------------------------------
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetById(int id)
        {
            var category = await _categoryService.GetByIdAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }
        //Get_Search-----------------------------------
        [HttpGet("search")]
        public async Task<ActionResult<CategoryResult>> GetCategories(
            string? searchTerm,
            string? sortColumn,
            bool sortAscending = true,
            int pageNumber = 1,
            int pageSize = 10)
        {
            var result = await _categoryService.GetCategoriesAsync(
                searchTerm,
                sortColumn,
                sortAscending,
                pageNumber,
                pageSize);

            return Ok(result);
        }
        //Post------------------------------------------
        [HttpPost]
        public async Task<ActionResult<CategoryDto>> Create(
            [FromBody] createCategoryDto dto) 
        {
            var category =
                await _categoryService.CreateAsync(dto);

            return CreatedAtAction(
                nameof(GetById),
                new { id = category.Id },
                category);
        }
        //Put--------------------------------------------
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            int id,
            [FromBody] updateCategoryDto dto)
        {
            try
            {
                await _categoryService.UpdateAsync(id, dto);

                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new
                {
                    message = "Category not found."
                });
            }
        }
        //Delete-----------------------------------------
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _categoryService.DeleteAsync(id);

                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound(new
                {
                    message = "Category not found."
                });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new
                {
                    message = ex.Message
                });
            }
        }
    }
}
