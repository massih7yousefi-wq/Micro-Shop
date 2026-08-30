using Microsoft.AspNetCore.Identity;
using OnlineShop.API.Models;

namespace OnlineShop.API.Services.Interfaces
{
    public interface IAccountService
    {
        Task<IdentityResult> RegisterAsync(
            RegisterModel model);

        Task<AuthResponse?> LoginAsync(
            LoginModel model);

        Task<IdentityResult> ConfirmEmailAsync(
            string userId,
            string token);

        Task<bool> ForgotPasswordAsync(
            ForgotPasswordModel model);

        Task<IdentityResult> ResetPasswordAsync(
            ResetPasswordModel model);

        Task<IdentityResult> ChangePasswordAsync(
            string userId,
            ChangePasswordModel model);

        Task RevokeAllRefreshTokensAsync(
            string userId);
    }
}