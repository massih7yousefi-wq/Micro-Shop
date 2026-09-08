//usings-------------------------------------
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.API.Models;
using OnlineShop.API.Services.Interfaces;
using System.Security.Claims;

namespace OnlineShop.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IJwtService _jwtService;

        //AccountController-----------------------------
        public AccountController(
            IAccountService accountService,
            IJwtService jwtService)
        {
            _accountService = accountService;
            _jwtService = jwtService;
        }

        //Register--------------------------
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(
            [FromBody] RegisterModel model)
        {
            var result =
                await _accountService.RegisterAsync(model);

            if (!result.Succeeded)
            {
                return BadRequest(
                    new
                    {
                        message = "Registration failed.",
                        errors = result.Errors.Select(e => new
                        {
                            e.Code,
                            e.Description
                        })
                    });
            }

            return Ok(
                new
                {
                    message =
                        "Registration successful."
                });
        }

        //Login-----------------------------------
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(
            [FromBody] LoginModel model)
        {
            var response =
                await _accountService.LoginAsync(model);

            if (response is null)
            {
                return Unauthorized(
                    new
                    {
                        message =
                            "Invalid credentials or account is unavailable."
                    });
            }

            return Ok(response);
        }

        //ChangePassword---------------------------------
        [Authorize]
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword(
            [FromBody] ChangePasswordModel model)
        {
            var userId = GetCurrentUserId();

            if (userId is null)
            {
                return Unauthorized();
            }

            var result =
                await _accountService.ChangePasswordAsync(
                    userId,
                    model);

            if (!result.Succeeded)
            {
                return BadRequest(
                    new
                    {
                        message =
                            "Password change failed.",
                        errors = result.Errors.Select(e => new
                        {
                            e.Code,
                            e.Description
                        })
                    });
            }

            return Ok(
                new
                {
                    message =
                        "Password changed successfully. Please login again."
                });
        }

        //Refresh----------------------------------
        [AllowAnonymous]
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh(
            [FromBody] RefreshTokenModel model)
        {
            var response =
                await _jwtService.RefreshTokenAsync(
                    model.RefreshToken);

            if (response is null)
            {
                return Unauthorized(
                    new
                    {
                        message =
                            "Invalid or expired refresh token."
                    });
            }

            return Ok(response);
        }

        //Logout---------------------------
        [AllowAnonymous]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout(
            [FromBody] RefreshTokenModel model)
        {
            await _jwtService.RevokeRefreshTokenAsync(
                model.RefreshToken);

            return Ok(
                new
                {
                    message = "Logged out successfully."
                });
        }

        //GetCurrentUser------------------------
        [Authorize]
        [HttpGet("me")]
        public IActionResult GetCurrentUser()
        {
            var userId = GetCurrentUserId();

            if (userId is null)
            {
                return Unauthorized();
            }

            return Ok(
                new
                {
                    userId,
                    userName =
                        User.FindFirstValue(
                            ClaimTypes.Name),
                    email =
                        User.FindFirstValue(
                            ClaimTypes.Email),
                    roles =
                        User.FindAll(
                            ClaimTypes.Role)
                            .Select(x => x.Value)
                            .ToList()
                });
        }

        //Admin-----------------------------------
        [Authorize(Roles = "Admin")]
        [HttpGet("admin")]
        public IActionResult Admin()
        {
            return Ok(
                new
                {
                    message =
                        "Admin authorization successful.",
                    userName =
                        User.FindFirstValue(
                            ClaimTypes.Name)
                });
        }

        //GetCurrentUserId-------------------
        private string? GetCurrentUserId()
        {
            return User.FindFirstValue(
                ClaimTypes.NameIdentifier);
        }
    }
}