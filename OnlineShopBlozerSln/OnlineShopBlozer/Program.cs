//usings--------------------------------
using Microsoft.EntityFrameworkCore;
using OnlineShopBlozer.Components;
using OnlineShopBlozer.Data;
using OnlineShopBlozer.Services;
using OnlineShopBlozer.Services.Interfaces;
using static OnlineShopBlozer.Services.CartService;
using Microsoft.AspNetCore.Identity;
using OnlineShopBlozer.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

// ? ??? ???? ?? ?? ?? ????? ????? (?? ?? ?? ?? ??)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration
        .GetConnectionString("DefaultConnection")));

builder.Services.AddDbContextFactory<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration
        .GetConnectionString("DefaultConnection")),
    ServiceLifetime.Scoped);  // ??? ?? ????

// Use Identity
builder.Services.AddIdentity<AppUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

// Authorization
builder.Services.AddAuthorization();

// ??? ????????
builder.Services.AddScoped<IProductsService, ProductService>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IDashboardService, DashboardService>();
builder.Services.AddScoped<ICartService, CartService>();
builder.Services.AddScoped<CartState>();
builder.Services.AddScoped<IToastService, ToastService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IAccountService, AccountService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    app.UseHsts();
}

app.UseHttpsRedirection();

// Middleware Identity
app.UseAuthentication();
app.UseAuthorization();

app.UseAntiforgery();

app.MapStaticAssets();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();