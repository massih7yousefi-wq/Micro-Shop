//Using--------------------------------
using Microsoft.EntityFrameworkCore;
using OnlineShop.API.Models;
using OnlineShop.API.Data;
using OnlineShop.API.Services.Interfaces;
using System.Reflection.Metadata.Ecma335;

namespace OnlineShop.API.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IDbContextFactory<AppDbContext> _contextFactory;
        //Constructor_method-------------------------------

        public DashboardService(IDbContextFactory<AppDbContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }
        //Get_total_products-----------------------
        public async Task<int> GetTotalProductAsync()
        {
            using var context = _contextFactory.CreateDbContext();
            return await context.Products.CountAsync();
        }
        //Get_total_categories---------------------
        public async Task<int> GetTotalCategoriesAsync()
        {
            using var context = _contextFactory.CreateDbContext();
            return await context.Categories.CountAsync();
        }
        //Get_Average_Price------------------------
        public async Task<decimal> GetAveragePriceAsync()
        {
            using var context = _contextFactory.CreateDbContext();
            if (!await context.Products.AnyAsync()) 
            {
                return 0;
            }
            return await context.Products
                .AverageAsync(p => p.Price);
        }
        //Get_Most_Expensive----------------------
        public async Task<Product?> GetMostExpensiveAsync()
        {
            using var context = _contextFactory.CreateDbContext();
            return await context.Products
                .OrderByDescending(p => p.Price)
                .FirstOrDefaultAsync(); 
        }
        //Get_Cheapest------------------------------
        public async Task<Product?> GetCheapestAsync()
        {
            using var context = _contextFactory.CreateDbContext();
            return await context.Products
                .OrderBy(p => p.Price)
                .FirstOrDefaultAsync();
        }
    }
}
