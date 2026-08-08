using OnlineShop.API.Models;
namespace OnlineShop.API.Services.Interfaces
{
    public interface IDashboardService
    {
        Task<int> GetTotalProductAsync();
        Task<int> GetTotalCategoriesAsync();
        Task<decimal> GetAveragePriceAsync();
        Task<Product?> GetMostExpensiveAsync();
        Task<Product?> GetCheapestAsync();
    }
}
