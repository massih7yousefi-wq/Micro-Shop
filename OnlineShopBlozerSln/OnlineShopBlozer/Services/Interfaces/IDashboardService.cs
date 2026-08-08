using OnlineShopBlozer.Models;
namespace OnlineShopBlozer.Services.Interfaces
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
