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

        Task<IdentityResult> ChangePasswordAsync(
            string userId,
            ChangePasswordModel model);

        Task RevokeAllRefreshTokensAsync(
            string userId);
    }
}