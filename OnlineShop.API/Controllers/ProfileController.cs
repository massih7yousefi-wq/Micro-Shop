//usings------------------------------
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.API.Models;
using OnlineShop.API.Services.Interfaces;
using System.Security.Claims;

namespace OnlineShop.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/profile")]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileService _profileService;

        public ProfileController(
            IProfileService profileService)
        {
            _profileService = profileService;
        }
        //Get--------------------------------
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var userId = GetUserId();

            if (userId is null)
            {
                return Unauthorized();
            }

            var profile =
                await _profileService.GetAsync(userId);

            return profile is null
                ? NotFound()
                : Ok(profile);
        }
        //Update---------------------------------
        [HttpPut]
        public async Task<IActionResult> Update(
            [FromBody] UpdateProfileModel model)
        {
            var userId = GetUserId();

            if (userId is null)
            {
                return Unauthorized();
            }

            var profile =
                await _profileService.UpdateAsync(
                    userId,
                    model);

            return profile is null
                ? NotFound()
                : Ok(profile);
        }
        //GetUserId------------------------
        private string? GetUserId()
        {
            return User.FindFirstValue(
                ClaimTypes.NameIdentifier);
        }
    }
}
