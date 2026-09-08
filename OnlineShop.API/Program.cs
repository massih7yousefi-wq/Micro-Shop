// Usings ---------------------------------------------------------
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

using OnlineShop.API.Data;
using OnlineShop.API.Models;
using OnlineShop.API.Services;
using OnlineShop.API.Services.Interfaces;
using OnlineShop.API.Services.Storage;

using Resend;

using Supabase;

using System.Text;


// ================================================================
// Builder
// ================================================================

var builder = WebApplication.CreateBuilder(args);


// ================================================================
// Controllers
// ================================================================

builder.Services.AddControllers();


// ================================================================
// Swagger
// ================================================================

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition(
        "Bearer",
        new OpenApiSecurityScheme
        {
            Name = "Authorization",

            Type = SecuritySchemeType.Http,

            Scheme = "Bearer",

            BearerFormat = "JWT",

            In = ParameterLocation.Header,

            Description =
                "Enter your JWT token. Example: Bearer {your token}"
        });

    options.AddSecurityRequirement(
        new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },

                Array.Empty<string>()
            }
        });
});


// ================================================================
// PostgreSQL / Entity Framework
// ================================================================

var connectionString =
    builder.Configuration.GetConnectionString(
        "DefaultConnection");

if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new InvalidOperationException(
        "ConnectionStrings:DefaultConnection is not configured.");
}

builder.Services.AddDbContextFactory<AppDbContext>(
    options =>
    {
        options.UseNpgsql(connectionString);
    });


// ================================================================
// Identity
// ================================================================

builder.Services
    .AddIdentity<AppUser, IdentityRole>(options =>
    {
        // ----------------------------------------------------------
        // Password
        // ----------------------------------------------------------

        options.Password.RequiredLength = 8;

        options.Password.RequireDigit = true;

        options.Password.RequireLowercase = true;

        options.Password.RequireUppercase = true;

        options.Password.RequireNonAlphanumeric = true;

        options.Password.RequiredUniqueChars = 4;


        // ----------------------------------------------------------
        // User
        // ----------------------------------------------------------

        options.User.RequireUniqueEmail = true;


        // ----------------------------------------------------------
        // Email
        // ----------------------------------------------------------

        options.SignIn.RequireConfirmedEmail = true;


        // ----------------------------------------------------------
        // Lockout
        // ----------------------------------------------------------

        options.Lockout.AllowedForNewUsers = true;

        options.Lockout.MaxFailedAccessAttempts = 5;

        options.Lockout.DefaultLockoutTimeSpan =
            TimeSpan.FromMinutes(10);
    })
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();


// ================================================================
// JWT Configuration
// ================================================================

var jwtKey =
    builder.Configuration["Jwt:Key"];

var jwtIssuer =
    builder.Configuration["Jwt:Issuer"];

var jwtAudience =
    builder.Configuration["Jwt:Audience"];


if (string.IsNullOrWhiteSpace(jwtKey))
{
    throw new InvalidOperationException(
        "Jwt:Key is not configured.");
}


if (string.IsNullOrWhiteSpace(jwtIssuer))
{
    throw new InvalidOperationException(
        "Jwt:Issuer is not configured.");
}


if (string.IsNullOrWhiteSpace(jwtAudience))
{
    throw new InvalidOperationException(
        "Jwt:Audience is not configured.");
}


// JWT key must be at least 256 bits / 32 bytes
var jwtKeyBytes =
    Encoding.UTF8.GetBytes(jwtKey);


if (jwtKeyBytes.Length < 32)
{
    throw new InvalidOperationException(
        "Jwt:Key must be at least 32 bytes long.");
}


// ================================================================
// Authentication
// ================================================================

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme =
            JwtBearerDefaults.AuthenticationScheme;

        options.DefaultChallengeScheme =
            JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuer = true,

                ValidateAudience = true,

                ValidateLifetime = true,

                ValidateIssuerSigningKey = true,


                ValidIssuer =
                    jwtIssuer,

                ValidAudience =
                    jwtAudience,


                IssuerSigningKey =
                    new SymmetricSecurityKey(jwtKeyBytes),


                ClockSkew =
                    TimeSpan.FromMinutes(1)
            };
    });


// ================================================================
// Authorization
// ================================================================

builder.Services.AddAuthorization();


// ================================================================
// CORS
// ================================================================

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "ReactPolicy",
        policy =>
        {
            policy
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});


// ================================================================
// Product Service
// ================================================================

builder.Services.AddScoped<
    IProductsService,
    ProductService>();


// ================================================================
// Category Service
// ================================================================

builder.Services.AddScoped<
    ICategoryService,
    CategoryService>();


// ================================================================
// Account Service
// ================================================================

builder.Services.AddScoped<
    IAccountService,
    AccountService>();


// ================================================================
// Cart Service
// ================================================================

builder.Services.AddScoped<
    ICartService,
    CartService>();


// ================================================================
// Cart State
// ================================================================

builder.Services.AddScoped<CartState>();


// ================================================================
// Dashboard Service
// ================================================================

builder.Services.AddScoped<
    IDashboardService,
    DashboardService>();


// ================================================================
// Image Service
// ================================================================

builder.Services.AddScoped<
    IImageService,
    ImageService>();


// ================================================================
// Order Service
// ================================================================

builder.Services.AddScoped<
    IOrderService,
    OrderService>();


// ================================================================
// Toast Service
// ================================================================

builder.Services.AddScoped<
    IToastService,
    ToastService>();


// ================================================================
// JWT Service
// ================================================================

builder.Services.AddScoped<
    IJwtService,
    JwtService>();


// ================================================================
// Resend Email API
// ================================================================

builder.Services.AddOptions();

builder.Services.AddHttpClient<ResendClient>();

builder.Services.Configure<ResendClientOptions>(
    options =>
    {
        var apiKey =
            builder.Configuration["Resend:ApiKey"];

        if (string.IsNullOrWhiteSpace(apiKey))
        {
            throw new InvalidOperationException(
                "Resend:ApiKey is not configured.");
        }

        options.ApiToken = apiKey;
    });

builder.Services.AddTransient<IResend, ResendClient>();


// ================================================================
// Email Service
// ================================================================

builder.Services.AddScoped<
    IEmailService,
    EmailService>();


// ================================================================
// Profile Service
// ================================================================

builder.Services.AddScoped<
    IProfileService,
    ProfileService>();


// ================================================================
// Address Service
// ================================================================

builder.Services.AddScoped<
    IAddressService,
    AddressService>();


// ================================================================
// Admin User Service
// ================================================================

builder.Services.AddScoped<
    IAdminUserService,
    AdminUserService>();


// ================================================================
// Supabase
// ================================================================

var supabaseUrl =
    builder.Configuration["Supabase:Url"];

var supabaseKey =
    builder.Configuration["Supabase:Key"];


if (string.IsNullOrWhiteSpace(supabaseUrl))
{
    throw new InvalidOperationException(
        "Supabase:Url is not configured.");
}


if (string.IsNullOrWhiteSpace(supabaseKey))
{
    throw new InvalidOperationException(
        "Supabase:Key is not configured.");
}


var supabaseClient =
    new Supabase.Client(
        supabaseUrl,
        supabaseKey);


await supabaseClient.InitializeAsync();


builder.Services.AddSingleton(
    supabaseClient);


// ================================================================
// File Storage
// ================================================================

builder.Services.AddScoped<
    IFileStorage,
    SupabaseFileStorage>();


// ================================================================
// OpenAPI
// ================================================================

builder.Services.AddOpenApi();


// ================================================================
// Build Application
// ================================================================

var app = builder.Build();


// ================================================================
// Identity Seeder
// ================================================================

using (var scope = app.Services.CreateScope())
{
    var services =
        scope.ServiceProvider;

    await IdentitySeeder.SeedAsync(
        services);
}


// ================================================================
// Swagger
// ================================================================

app.UseSwagger();

app.UseSwaggerUI();


// ================================================================
// HTTPS
// ================================================================

if (app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}


// ================================================================
// Static Files
// ================================================================

app.UseStaticFiles();


// ================================================================
// CORS
// ================================================================

app.UseCors("ReactPolicy");


// ================================================================
// Authentication
// ================================================================

app.UseAuthentication();


// ================================================================
// Authorization
// ================================================================

app.UseAuthorization();


// ================================================================
// Controllers
// ================================================================

app.MapControllers();


// ================================================================
// Run
// ================================================================

app.Run();