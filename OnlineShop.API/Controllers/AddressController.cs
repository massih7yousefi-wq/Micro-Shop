//usings-----------------------------------
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.API.Models;
using OnlineShop.API.Services.Interfaces;
using System.Security.Claims;

namespace OnlineShop.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/addresses")]
    public class AddressController : ControllerBase
    {
        private readonly IAddressService _addressService;

        public AddressController(
            IAddressService addressService)
        {
            _addressService = addressService;
        }
        //GetAll---------------------------------
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var userId = GetUserId();

            if (userId is null)
            {
                return Unauthorized();
            }

            return Ok(
                await _addressService.GetAllAsync(
                    userId));
        }
        //Get-----------------------------------
        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(
            int id)
        {
            var userId = GetUserId();

            if (userId is null)
            {
                return Unauthorized();
            }

            var address =
                await _addressService.GetAsync(
                    userId,
                    id);

            return address is null
                ? NotFound()
                : Ok(address);
        }
        //Create------------------------------
        [HttpPost]
        public async Task<IActionResult> Create(
            [FromBody] CreateAddressModel model)
        {
            var userId = GetUserId();

            if (userId is null)
            {
                return Unauthorized();
            }

            var address =
                await _addressService.CreateAsync(
                    userId,
                    model);

            return CreatedAtAction(
                nameof(Get),
                new { id = address.Id },
                address);
        }
        //Update--------------------------------
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(
            int id,
            [FromBody] UpdateAddressModel model)
        {
            var userId = GetUserId();

            if (userId is null)
            {
                return Unauthorized();
            }

            var address =
                await _addressService.UpdateAsync(
                    userId,
                    id,
                    model);

            return address is null
                ? NotFound()
                : Ok(address);
        }
        //Delete----------------------------------
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(
            int id)
        {
            var userId = GetUserId();

            if (userId is null)
            {
                return Unauthorized();
            }

            var deleted =
                await _addressService.DeleteAsync(
                    userId,
                    id);

            return deleted
                ? NoContent()
                : NotFound();
        }
        //SetDefault--------------------------------
        [HttpPatch("{id:int}/default")]
        public async Task<IActionResult> SetDefault(
            int id)
        {
            var userId = GetUserId();

            if (userId is null)
            {
                return Unauthorized();
            }

            var result =
                await _addressService.SetDefaultAsync(
                    userId,
                    id);

            return result
                ? Ok(new
                {
                    message =
                        "Default address updated successfully."
                })
                : NotFound();
        }
        //GetUserId-----------------------
        private string? GetUserId()
        {
            return User.FindFirstValue(
                ClaimTypes.NameIdentifier);
        }
    }
}
