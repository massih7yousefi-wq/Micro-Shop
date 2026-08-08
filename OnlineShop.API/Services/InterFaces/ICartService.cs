using OnlineShop.API.Models;
namespace OnlineShop.API.Services.Interfaces
{
    public interface ICartService
    {
        Task<Cart?> GetCartAsync(string userId);
        Task AddToCartAsync(string userId, int productId);
        Task RemoveFromCartAsync(int cartItemId);
        Task IncreaseQuantityAsync(int cartItemId);
        Task DecreaseQuantityAsync(int cartItemId);
        Task ClearCartAsync(string userId);
        Task<int> GetCartItemCountAsyng(string userId);
    }
}
