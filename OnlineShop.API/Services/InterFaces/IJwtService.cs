using OnlineShop.API.Models;

namespace OnlineShop.API.Services.Interfaces
{
    public interface IJwtService
    {
        Task<AuthResponse> GenerateTokenAsync(
            AppUser user);

        Task<AuthResponse?> RefreshTokenAsync(
            string refreshToken);

        Task RevokeRefreshTokenAsync(
            string refreshToken);
    }
}