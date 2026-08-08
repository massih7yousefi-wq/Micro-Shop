//Usings--------------------------------
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.IdentityModel.Tokens;
using OnlineShopBlozer.Data;
using OnlineShopBlozer.Models;
using OnlineShopBlozer.Services.Interfaces;

namespace OnlineShopBlozer.Services
{
    public class CartService : ICartService
    {
        //Made=>_context&_logger---------------------------
        private readonly IDbContextFactory<AppDbContext> _contextFactory;
        private readonly ILogger<CartService> _logger;
        

        //Constructor_method-------------------------------
        public CartService(
            IDbContextFactory<AppDbContext> contextFactory, ILogger<CartService> logger)
        {
            _contextFactory = contextFactory;
            _logger = logger;
        }
        //Get_Cart---------------------------------------
        public async Task<Cart?> GetCartAsync(string userId)
        {
            using var context = _contextFactory.CreateDbContext();
            try 
            {
                
                return await context.Carts
                    .Include(c => c.Items)
                    .ThenInclude(i => i.Product)
                    .FirstOrDefaultAsync(c => c.UserId == userId);
            }
            catch (Exception ex) 
            {
                _logger.LogError(ex,
                    "Error while getting cart");
                throw;
            }
        }
        //Add_Item_&_Cart----------------------------------------------------
        public async Task AddToCartAsync(string userId, int productId) 
        {
            using var context = _contextFactory.CreateDbContext();
            try 
            {
                //Dose_the_product_exist?----------------
                var productExists = await context.Products
                    .AnyAsync(p => p.Id == productId);
                if (!productExists)
                {
                    throw new Exception("Product not found!");
                }
                //Find_cart------------------------------
                var cart = await context.Carts
                    .Include(c => c.Items)
                    .FirstOrDefaultAsync(c => c.UserId == userId);
                //Is_there_a_Cart?--------------------
                if (cart == null) 
                {
                    cart = new Cart
                    {
                        UserId = userId,
                        CreatedAt = DateTime.Now
                    };
                    context.Carts.Add(cart);
                    await context.SaveChangesAsync();
                }
                //Is_the_product_in_the_cart?-------------
                var item = cart.Items
                    .FirstOrDefault(i => i.ProductId == productId);
                if (item == null)
                {
                    cart.Items.Add(new CartItem
                    {
                        ProductId = productId,
                        Quantity = 1
                    });
                }
                else 
                {
                    item.Quantity++;
                }
                await context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error while adding product to cart.");
                throw;  
            
            }
        }
        //Remove_item---------------------------------
        public async Task RemoveFromCartAsync(int cartItemId)
        {
            using var context = _contextFactory.CreateDbContext();
            try 
            {
                var item = await context.CartItems
                    .FirstOrDefaultAsync (i => i.Id == cartItemId);
                if (item == null)
                {
                    throw new Exception("Cart item not found!");
                }
                context.CartItems.Remove(item);
                await context.SaveChangesAsync();
            }
            catch (Exception ex) 
            {
                _logger.LogError(ex,
                    "Error while removing item from cart.");
                throw;
            }
        }
        //IncreaseQuantity---------------------------------
        public async Task IncreaseQuantityAsync(int cartItemId)
        {
            using var context = _contextFactory.CreateDbContext();
            try 
            {
                var item = await context.CartItems
                    .FirstOrDefaultAsync(i => i.Id == cartItemId);
                if (item == null)
                {
                    throw new Exception("Cart item not found.");
                }
                item.Quantity++;
                await context.SaveChangesAsync();

            }
            catch (Exception ex) 
            {
                _logger.LogError(ex,
                    "Error while increasing cart item quantity.");
                throw;
            }
        }
        //DecreaseQuantity--------------------------------------
        public async Task DecreaseQuantityAsync(int cartItemId)
        {
            using var context = _contextFactory.CreateDbContext();
            try
            {
                var item = await context.CartItems
                    .FirstOrDefaultAsync(i => i.Id == cartItemId);
                if (item == null)
                {
                    throw new Exception("Cart item not found.");
                }
                if (item.Quantity > 1)
                {
                    item.Quantity--;
                }
                else 
                {
                context.CartItems.Remove(item);
                }
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error while decreasing cart item quantity.");
                throw;

            }
        }
        //Clear_Cart-----------------------------------
        public async Task ClearCartAsync(string userId) 
        {
            using var context = _contextFactory.CreateDbContext();
            try 
            {
                var cart = await context.Carts
                    .Include(c => c.Items)
                    .FirstOrDefaultAsync(c => c.UserId == userId);

                if (cart == null) 
                {
                    throw new Exception("Cart not found.");
                }
                context.CartItems.RemoveRange(cart.Items);
                await context.SaveChangesAsync();
            
            }
            catch (Exception ex) 
            {
                _logger.LogError(ex,
                    "Error while clearing cart.");
                throw;
            }
        }
        public async Task<int> GetCartItemCountAsyng(string userId)
        {
            using var context = _contextFactory.CreateDbContext();
            var cart = await context.Carts
                .Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.UserId == userId);
            if (cart == null)
            {
                return 0;
            }
            return cart.Items.Sum(i => i.Quantity);
        }
    }
}

