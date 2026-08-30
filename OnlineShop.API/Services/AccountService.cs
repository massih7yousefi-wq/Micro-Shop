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
        private readonly IEmailService _emailService;
        private readonly ILogger<AccountService> _logger;
        private readonly IConfiguration _configuration;

        public AccountService(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            IDbContextFactory<AppDbContext> dbContextFactory,
            IJwtService jwtService,
            IEmailService emailService,
            ILogger<AccountService> logger,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _dbContextFactory = dbContextFactory;
            _jwtService = jwtService;
            _emailService = emailService;
            _logger = logger;
            _configuration = configuration;
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

            var user =
                new AppUser
                {
                    UserName = userName,
                    Email = email,
                    EmailConfirmed = false
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

            var roleResult =
                await _userManager.AddToRoleAsync(
                    user,
                    "User");

            if (!roleResult.Succeeded)
            {
                await _userManager.DeleteAsync(user);

                LogIdentityErrors(
                    roleResult,
                    "User role assignment failed.");

                return roleResult;
            }

            var confirmationToken =
                await _userManager
                    .GenerateEmailConfirmationTokenAsync(user);

            var frontendUrl =
                GetRequiredConfiguration(
                    "Frontend:BaseUrl");

            var confirmationUrl =
                $"{frontendUrl.TrimEnd('/')}/confirm-email" +
                $"?userId={Uri.EscapeDataString(user.Id)}" +
                $"&token={Uri.EscapeDataString(confirmationToken)}";

            await _emailService.SendEmailAsync(
                user.Email!,
                "Confirm your MicroShop account",
                $"""
                <h2>Welcome to MicroShop</h2>

                <p>Hello {user.UserName},</p>

                <p>
                    Thank you for registering with MicroShop.
                </p>

                <p>
                    Please confirm your email address:
                </p>

                <p>
                    <a href="{confirmationUrl}">
                        Confirm Email
                    </a>
                </p>

                <p>
                    If you did not create this account,
                    you can safely ignore this email.
                </p>
                """);

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
        // Confirm Email
        // ============================================================

        public async Task<IdentityResult> ConfirmEmailAsync(
            string userId,
            string token)
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
                await _userManager.ConfirmEmailAsync(
                    user,
                    token);

            if (result.Succeeded)
            {
                _logger.LogInformation(
                    "Email confirmed for user {UserId}.",
                    user.Id);
            }

            return result;
        }

        // ============================================================
        // Forgot Password
        // ============================================================

        public async Task<bool> ForgotPasswordAsync(
            ForgotPasswordModel model)
        {
            var email =
                model.Email.Trim().ToLowerInvariant();

            var user =
                await _userManager.FindByEmailAsync(email);

            // Prevent account enumeration
            if (user is null)
            {
                return true;
            }

            if (!await _userManager.IsEmailConfirmedAsync(user))
            {
                return true;
            }

            var token =
                await _userManager
                    .GeneratePasswordResetTokenAsync(user);

            var frontendUrl =
                GetRequiredConfiguration(
                    "Frontend:BaseUrl");

            var resetUrl =
                $"{frontendUrl.TrimEnd('/')}/reset-password" +
                $"?email={Uri.EscapeDataString(user.Email!)}" +
                $"&token={Uri.EscapeDataString(token)}";

            await _emailService.SendEmailAsync(
                user.Email!,
                "Reset your MicroShop password",
                $"""
                <h2>MicroShop Password Reset</h2>

                <p>Hello {user.UserName},</p>

                <p>
                    We received a request to reset your password.
                </p>

                <p>
                    <a href="{resetUrl}">
                        Reset Password
                    </a>
                </p>

                <p>
                    If you did not request this,
                    you can safely ignore this email.
                </p>
                """);

            return true;
        }

        // ============================================================
        // Reset Password
        // ============================================================

        public async Task<IdentityResult> ResetPasswordAsync(
            ResetPasswordModel model)
        {
            var user =
                await _userManager.FindByEmailAsync(
                    model.Email.Trim().ToLowerInvariant());

            if (user is null)
            {
                return InvalidResetRequest();
            }

            var result =
                await _userManager.ResetPasswordAsync(
                    user,
                    model.Token,
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
        // Helpers
        // ============================================================

        private string GetRequiredConfiguration(
            string key)
        {
            var value =
                _configuration[key];

            if (string.IsNullOrWhiteSpace(value))
            {
                throw new InvalidOperationException(
                    $"Configuration '{key}' is not configured.");
            }

            return value;
        }

        private static IdentityResult InvalidResetRequest()
        {
            return IdentityResult.Failed(
                new IdentityError
                {
                    Code = "InvalidResetRequest",
                    Description =
                        "Invalid password reset request."
                });
        }

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