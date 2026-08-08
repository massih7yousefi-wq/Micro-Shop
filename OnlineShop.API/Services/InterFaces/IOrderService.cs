using OnlineShop.API.Models;
namespace OnlineShop.API.Services.Interfaces
{
    public interface IOrderService
    {
        Task<List<Order>> GetAllAsync();
        Task<Order?> GetByIdAsync(int id);
        Task<List<Order>> GetUserOrdersAsync(string userId);
        Task CreateOrderAsync(string userId);
        Task UpdateStatusAsync(int orderId, string status);
        Task DeleteAsync(int id);  
    }
}
