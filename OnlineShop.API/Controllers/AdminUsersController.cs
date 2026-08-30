//usings-----------------------------------
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.API.Models;
using OnlineShop.API.Services.Interfaces;

namespace OnlineShop.API.Controllers
{
    [ApiController]
    [Authorize(Roles = "Admin")]
    [Route("api/admin/users")]
    public class AdminUsersController : ControllerBase
    {
        private readonly IAdminUserService _userService;

        public AdminUsersController(
            IAdminUserService userService)
        {
            _userService = userService;
        }
        //GetUsers----------------------------------
        [HttpGet]
        public async Task<IActionResult> GetUsers(
            [FromQuery] string? search,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20)
        {
            var result =
                await _userService.GetUsersAsync(
                    search,
                    page,
                    pageSize);

            return Ok(result);
        }
        //GetUser------------------------------------
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(
            string id)
        {
            var result =
                await _userService.GetUserAsync(id);

            return result is null
                ? NotFound()
                : Ok(result);
        }
        //UpdateUser-----------------------------------
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(
            string id,
            [FromBody] AdminUpdateUserModel model)
        {
            var result =
                await _userService.UpdateUserAsync(
                    id,
                    model);

            return result.Succeeded
                ? Ok(new
                {
                    message =
                        "User updated successfully."
                })
                : BadRequest(result.Errors);
        }
        //ChangeRole------------------------------------
        [HttpPatch("{id}/role")]
        public async Task<IActionResult> ChangeRole(
            string id,
            [FromBody] ChangeUserRoleModel model)
        {
            var result =
                await _userService.ChangeRoleAsync(
                    id,
                    model.Role);

            return result.Succeeded
                ? Ok(new
                {
                    message =
                        "User role updated successfully."
                })
                : BadRequest(result.Errors);
        }
        //SetActive--------------------------------
        [HttpPatch("{id}/active")]
        public async Task<IActionResult> SetActive(
            string id,
            [FromQuery] bool value)
        {
            var result =
                await _userService.SetActiveAsync(
                    id,
                    value);

            return result.Succeeded
                ? Ok(new
                {
                    message =
                        value
                            ? "User activated successfully."
                            : "User deactivated successfully."
                })
                : BadRequest(result.Errors);
        }
        //SetLock---------------------------------
        [HttpPatch("{id}/lock")]
        public async Task<IActionResult> SetLock(
            string id,
            [FromQuery] bool value)
        {
            var result =
                await _userService.SetLockoutAsync(
                    id,
                    value);

            return result.Succeeded
                ? Ok(new
                {
                    message =
                        value
                            ? "User locked successfully."
                            : "User unlocked successfully."
                })
                : BadRequest(result.Errors);
        }
        //DeleteUser------------------------------------
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(
            string id)
        {
            var result =
                await _userService.DeleteUserAsync(id);

            return result.Succeeded
                ? NoContent()
                : BadRequest(result.Errors);
        }
    }
}