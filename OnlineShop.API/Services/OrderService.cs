//Usings-------------------------------
using OnlineShop.API.Data;
using OnlineShop.API.Models;
using OnlineShop.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace OnlineShop.API.Services
{

    public class OrderService: IOrderService
    {
        //Made=>_context&_logger---------------------------
        private readonly IDbContextFactory<AppDbContext> _contextFactory;
        private readonly ILogger<OrderService> _logger;

        //Constructor_method-------------------------------
        public OrderService(
            IDbContextFactory<AppDbContext> contextFactory, ILogger<OrderService> logger)
        {
            _contextFactory = contextFactory;
            _logger = logger;
        }
        public async Task<List<Order>> GetAllAsync()
        {
            try 
            {
                using var context = await _contextFactory.CreateDbContextAsync();
                return await context.Orders
                    .Include(o =>o.Items)
                    .ThenInclude(i =>i.Product)
                    .OrderByDescending(o => o.OrderDate)
                    .ToListAsync();
            }
            catch (Exception ex) 
            {
                _logger.LogError(ex, "Error loading orders.");
                throw;
            }
        }
        public async Task<Order?> GetByIdAsync(int id) 
        {
            try 
            {
                using var context = await _contextFactory.CreateDbContextAsync();
                return await context.Orders
                    .Include(o => o.Items)
                    .ThenInclude(i => i.Product)
                    .FirstOrDefaultAsync(o => o.Id == id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading order.");
                throw;
            }

        }
        //Create_Order-----------------------------------------
        public async Task CreateOrderAsync(string userId) 
        {
            try
            {
                using var context = await _contextFactory.CreateDbContextAsync();
                var cart = await context.Carts
                    .Include(c => c.Items)
                    .ThenInclude(i => i.Product)
                    .FirstOrDefaultAsync(c => c.UserId == userId);
                if (cart == null || !cart.Items.Any())
                {
                    throw new InvalidOperationException("Cart is empty.");
                }
                var order = new Order
                {
                    UserId = userId,
                    OrderDate = DateTime.Now,
                    Status ="Pending"
                };
                foreach (var item in cart.Items) 
                {
                    order.Items.Add(
                        new OrderItem
                        {
                            ProductId = item.ProductId,
                            Quantity = item.Quantity,
                            Price = item.Product.Price
                        });
                }
                order.TotalPrice = order.Items.Sum(i => i.Price * i.Quantity);
                context.Orders.Add(order);
                context.CartItems.RemoveRange(cart.Items);
                await context.SaveChangesAsync();
            }
            catch (Exception ex) 
            {
                _logger.LogError(ex,
                    $"Error creating order for user {userId} ");
                throw;
            }
        }
        //Get_User_Order--------------------------------------
        public async Task<List<Order>> GetUserOrdersAsync(string userId) 
        {
            try 
            {
                using var context = await _contextFactory.CreateDbContextAsync();
                return await context.Orders
                    .Include(o => o.Items)
                    .ThenInclude(i => i.Product)
                    .Where(o => o.UserId == userId)
                    .OrderByDescending(o => o.OrderDate)
                    .ToListAsync();

            } 
            catch (Exception ex) 
            {
                _logger.LogError(ex,
                    $"Error loading orders for user {userId}");
                throw;
            }
        }
        //Edit_Status----------------------------------------------
        public async Task UpdateStatusAsync(int orderId, string status)
        {
            try 
            {
                using var context = await _contextFactory.CreateDbContextAsync();
                var order = await context.Orders
                    .FirstOrDefaultAsync(o => o.Id == orderId);
                if (order == null)
                {
                    throw new InvalidOperationException("Order not found.");
                }
                order.Status = status; 
                await context.SaveChangesAsync();
                _logger.LogInformation($"Order {orderId} status updated to {status}");
            } 
            catch (Exception ex) 
            {
                _logger.LogError(ex,
                    "Error updating order status.");
                throw;
            }
        }
        //Delete_Order-----------------------------------------
        public async Task DeleteAsync(int id)
        {
            try 
            {
                using var context = await _contextFactory.CreateDbContextAsync();
                var order = await context.Orders
                    .FirstOrDefaultAsync(o => o.Id == id);
                if (order == null)
                {
                    throw new InvalidOperationException("Order not found.");
                }
                context.Orders.Remove(order);
                await context.SaveChangesAsync();
                _logger.LogInformation($"Order {id} deleted successfully.");
            }
            catch (Exception ex) 
            {
                _logger.LogError(ex ,
                    "Error deleting order.");
                throw;
            }
        }
    }

}
