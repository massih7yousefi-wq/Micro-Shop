//Usings------------------------------------
using Microsoft.EntityFrameworkCore;
using OnlineShop.API.Data;
using OnlineShop.API.Models;
using OnlineShop.API.Services;
using OnlineShop.API.Services.Interfaces;
using Microsoft.AspNetCore.Identity;



var builder = WebApplication.CreateBuilder(args);
//swagger-----------------------

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
//Swagger-------------------------------------------------------------
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//SqlServer---------------------------------------
builder.Services.AddDbContextFactory<AppDbContext>(options =>
        options.UseSqlServer(
            builder.Configuration.GetConnectionString("DefaultConnection")));
//Identity-----------------------------------------
builder.Services
    .AddIdentity<AppUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

//ProductService-----------------------------------
builder.Services.AddScoped<IProductsService, ProductService>();
//CategoryService-----------------------------------------
builder.Services.AddScoped<ICategoryService, CategoryService>();
//AccountService------------------------------------------
builder.Services.AddScoped<IAccountService, AccountService>();
//CartService-----------------------------------------------
builder.Services.AddScoped<ICartService, CartService>();
//CartState---------------------------------------------
builder.Services.AddScoped<CartState>();
//DashboardService---------------------------------------
builder.Services.AddScoped<IDashboardService, DashboardService>();
//ImageService-----------------------------------------------
builder.Services.AddScoped<IImageService, ImageService>();
//OrderService---------------------------------------------
builder.Services.AddScoped<IOrderService, OrderService>();
//ToastService---------------------------------------------
builder.Services.AddScoped<IToastService, ToastService>();
//API------------------------------------------------------
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
//-------------------------------------------
builder.Services.AddOpenApi();

var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseHttpsRedirection();

app.UseStaticFiles();
//Api------------
app.UseCors("ReactPolicy");

app.UseAuthorization();


app.MapControllers();

app.Run();
