using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnlineShop.API.Data;
using OnlineShop.API.Models;
using OnlineShop.API.Services.Interfaces;

namespace OnlineShop.API.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IDbContextFactory<AppDbContext> _dbContextFactory;
        private readonly IJwtService _jwtService;
        private readonly ILogger<AccountService> _logger;

        public AccountService(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            IDbContextFactory<AppDbContext> dbContextFactory,
            IJwtService jwtService,
            ILogger<AccountService> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _dbContextFactory = dbContextFactory;
            _jwtService = jwtService;
            _logger = logger;
        }

        // ============================================================
        // Register
        // ============================================================

        public async Task<IdentityResult> RegisterAsync(
            RegisterModel model)
        {
            var email =
                model.Email.Trim().ToLowerInvariant();

            var userName =
                model.UserName.Trim();

            // --------------------------------------------------------
            // Duplicate email check
            // --------------------------------------------------------

            var existingEmail =
                await _userManager.FindByEmailAsync(email);

            if (existingEmail is not null)
            {
                return IdentityResult.Failed(
                    new IdentityError
                    {
                        Code = "DuplicateEmail",
                        Description =
                            "This email address is already registered."
                    });
            }

            // --------------------------------------------------------
            // Duplicate username check
            // --------------------------------------------------------

            var existingUserName =
                await _userManager.FindByNameAsync(userName);

            if (existingUserName is not null)
            {
                return IdentityResult.Failed(
                    new IdentityError
                    {
                        Code = "DuplicateUserName",
                        Description =
                            "This username is already taken."
                    });
            }

            // --------------------------------------------------------
            // Create user
            // --------------------------------------------------------

            var user =
                new AppUser
                {
                    UserName = userName,
                    Email = email,

                    // Email verification is disabled.
                    EmailConfirmed = true
                };

            var result =
                await _userManager.CreateAsync(
                    user,
                    model.Password);

            if (!result.Succeeded)
            {
                LogIdentityErrors(
                    result,
                    "User registration failed.");

                return result;
            }

            // --------------------------------------------------------
            // Add User role
            // --------------------------------------------------------

            var roleResult =
                await _userManager.AddToRoleAsync(
                    user,
                    "User");

            if (!roleResult.Succeeded)
            {
                await DeleteUserAfterRegistrationFailureAsync(
                    user,
                    "User role assignment failed.");

                LogIdentityErrors(
                    roleResult,
                    "User role assignment failed.");

                return roleResult;
            }

            // --------------------------------------------------------
            // Registration completed
            // --------------------------------------------------------

            _logger.LogInformation(
                "User {UserId} registered successfully.",
                user.Id);

            return IdentityResult.Success;
        }

        // ============================================================
        // Login
        // ============================================================

        public async Task<AuthResponse?> LoginAsync(
            LoginModel model)
        {
            var email =
                model.Email.Trim().ToLowerInvariant();

            var user =
                await _userManager.FindByEmailAsync(email);

            if (user is null)
            {
                _logger.LogWarning(
                    "Login failed for unknown email.");

                return null;
            }

            if (!await _userManager.IsEmailConfirmedAsync(user))
            {
                _logger.LogWarning(
                    "Login blocked for unconfirmed email. UserId: {UserId}",
                    user.Id);

                return null;
            }

            if (await _userManager.IsLockedOutAsync(user))
            {
                _logger.LogWarning(
                    "Login blocked because user {UserId} is locked out.",
                    user.Id);

                return null;
            }

            var signInResult =
                await _signInManager.CheckPasswordSignInAsync(
                    user,
                    model.Password,
                    lockoutOnFailure: true);

            if (signInResult.IsLockedOut)
            {
                _logger.LogWarning(
                    "User {UserId} was locked out.",
                    user.Id);

                return null;
            }

            if (!signInResult.Succeeded)
            {
                _logger.LogWarning(
                    "Invalid login credentials for user {UserId}.",
                    user.Id);

                return null;
            }

            var response =
                await _jwtService.GenerateTokenAsync(user);

            _logger.LogInformation(
                "User {UserId} logged in successfully.",
                user.Id);

            return response;
        }

        // ============================================================
        // Change Password
        // ============================================================

        public async Task<IdentityResult> ChangePasswordAsync(
            string userId,
            ChangePasswordModel model)
        {
            var user =
                await _userManager.FindByIdAsync(userId);

            if (user is null)
            {
                return IdentityResult.Failed(
                    new IdentityError
                    {
                        Code = "UserNotFound",
                        Description = "User not found."
                    });
            }

            var result =
                await _userManager.ChangePasswordAsync(
                    user,
                    model.CurrentPassword,
                    model.NewPassword);

            if (result.Succeeded)
            {
                await RevokeAllRefreshTokensAsync(
                    user.Id);

                await _userManager.ResetAccessFailedCountAsync(
                    user);
            }

            return result;
        }

        // ============================================================
        // Revoke All Refresh Tokens
        // ============================================================

        public async Task RevokeAllRefreshTokensAsync(
            string userId)
        {
            await using var db =
                await _dbContextFactory
                    .CreateDbContextAsync();

            var tokens =
                await db.RefreshTokens
                    .Where(x =>
                        x.UserId == userId &&
                        x.RevokedAt == null)
                    .ToListAsync();

            if (tokens.Count == 0)
            {
                return;
            }

            var now =
                DateTime.UtcNow;

            foreach (var token in tokens)
            {
                token.RevokedAt = now;
            }

            await db.SaveChangesAsync();

            _logger.LogInformation(
                "Revoked {Count} refresh tokens for user {UserId}.",
                tokens.Count,
                userId);
        }

        // ============================================================
        // Delete User After Registration Failure
        // ============================================================

        private async Task<bool> DeleteUserAfterRegistrationFailureAsync(
            AppUser user,
            string reason)
        {
            try
            {
                var deleteResult =
                    await _userManager.DeleteAsync(user);

                if (deleteResult.Succeeded)
                {
                    _logger.LogInformation(
                        "User {UserId} was removed after registration failure. Reason: {Reason}",
                        user.Id,
                        reason);

                    return true;
                }

                LogIdentityErrors(
                    deleteResult,
                    $"Failed to remove user {user.Id} after registration failure. Reason: {reason}");

                return false;
            }
            catch (Exception ex)
            {
                _logger.LogCritical(
                    ex,
                    "Exception while removing user {UserId} after registration failure. Reason: {Reason}",
                    user.Id,
                    reason);

                return false;
            }
        }

        // ============================================================
        // Helpers
        // ============================================================

        private void LogIdentityErrors(
            IdentityResult result,
            string message)
        {
            foreach (var error in result.Errors)
            {
                _logger.LogWarning(
                    "{Message} Code: {Code}, Description: {Description}",
                    message,
                    error.Code,
                    error.Description);
            }
        }
    }
}