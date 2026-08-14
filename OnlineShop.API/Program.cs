//Usings------------------------------------
using Microsoft.EntityFrameworkCore;
using OnlineShop.API.Data;
using OnlineShop.API.Models;
using OnlineShop.API.Services;
using OnlineShop.API.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using OnlineShop.API.Services.Storage;
using Supabase;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
//Swagger-------------------------------------------------------------
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//PostgreSQL---------------------------------------
builder.Services.AddDbContextFactory<AppDbContext>(options =>
        options.UseNpgsql(
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
// Supabase------------------------------------------------
var supabaseUrl = builder.Configuration["Supabase:Url"];
var supabaseKey = builder.Configuration["Supabase:Key"];

if (string.IsNullOrWhiteSpace(supabaseUrl))
    throw new InvalidOperationException("Supabase URL is not configured.");

if (string.IsNullOrWhiteSpace(supabaseKey))
    throw new InvalidOperationException("Supabase Key is not configured.");

var supabaseClient = new Supabase.Client(
    supabaseUrl,
    supabaseKey);

await supabaseClient.InitializeAsync();

builder.Services.AddSingleton(supabaseClient);

// Storage-------------------------------------------------
builder.Services.AddScoped<IFileStorage, SupabaseFileStorage>();
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
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
//-------------------------------------------
builder.Services.AddOpenApi();

var app = builder.Build();



// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();



app.UseHttpsRedirection();

app.UseStaticFiles();
//Api------------
app.UseCors("ReactPolicy");

app.UseAuthorization();


app.MapControllers();

app.Run();
