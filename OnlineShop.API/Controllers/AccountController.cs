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
        private readonly ILogger<AccountController> _logger;
        //AccountController-----------------------------
        public AccountController(
            IAccountService accountService,
            IJwtService jwtService,
            ILogger<AccountController> logger)
        {
            _accountService = accountService;
            _jwtService = jwtService;
            _logger = logger;
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
                        "Registration successful. Please check your email."
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
        //ConfirmEmail----------------------------------
        [AllowAnonymous]
        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(
            [FromQuery] string userId,
            [FromQuery] string token)
        {
            if (string.IsNullOrWhiteSpace(userId) ||
                string.IsNullOrWhiteSpace(token))
            {
                return BadRequest(
                    new
                    {
                        message =
                            "Invalid email confirmation request."
                    });
            }

            var result =
                await _accountService.ConfirmEmailAsync(
                    userId,
                    token);

            if (!result.Succeeded)
            {
                return BadRequest(
                    new
                    {
                        message =
                            "Email confirmation failed.",
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
                        "Email confirmed successfully."
                });
        }
        //ForgotPassword-------------------------------
        [AllowAnonymous]
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(
            [FromBody] ForgotPasswordModel model)
        {
            await _accountService.ForgotPasswordAsync(model);

            return Ok(
                new
                {
                    message =
                        "If the email exists and is confirmed, a password reset link has been sent."
                });
        }
        //ResetPassword--------------------------------
        [AllowAnonymous]
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(
            [FromBody] ResetPasswordModel model)
        {
            var result =
                await _accountService.ResetPasswordAsync(model);

            if (!result.Succeeded)
            {
                return BadRequest(
                    new
                    {
                        message =
                            "Password reset failed.",
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
                        "Password reset successfully."
                });
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