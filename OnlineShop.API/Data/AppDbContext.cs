using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OnlineShop.API.Models;

namespace OnlineShop.API.Data
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {
        public AppDbContext(
            DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }


        // ============================================================
        // Products
        // ============================================================

        public DbSet<Product> Products =>
            Set<Product>();


        // ============================================================
        // Categories
        // ============================================================

        public DbSet<Category> Categories =>
            Set<Category>();


        // ============================================================
        // Cart
        // ============================================================

        public DbSet<Cart> Carts =>
            Set<Cart>();

        public DbSet<CartItem> CartItems =>
            Set<CartItem>();


        // ============================================================
        // Orders
        // ============================================================

        public DbSet<Order> Orders =>
            Set<Order>();

        public DbSet<OrderItem> OrderItems =>
            Set<OrderItem>();


        // ============================================================
        // Product Images
        // ============================================================

        public DbSet<ProductImage> ProductImages =>
            Set<ProductImage>();


        // ============================================================
        // User Profile
        // ============================================================

        public DbSet<UserProfile> UserProfiles =>
            Set<UserProfile>();


        // ============================================================
        // User Address
        // ============================================================

        public DbSet<UserAddress> UserAddresses =>
            Set<UserAddress>();


        // ============================================================
        // Refresh Token
        // ============================================================

        public DbSet<RefreshToken> RefreshTokens =>
            Set<RefreshToken>();


        // ============================================================
        // Fluent API
        // ============================================================

        protected override void OnModelCreating(
            ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            // ========================================================
            // Product
            // ========================================================

            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(18, 2);


            // ========================================================
            // Product Image
            // ========================================================

            modelBuilder.Entity<ProductImage>()
                .HasOne(pi => pi.Product)
                .WithMany(p => p.Images)
                .HasForeignKey(pi => pi.ProductId)
                .OnDelete(DeleteBehavior.Cascade);


            // ========================================================
            // User Profile
            // ========================================================

            modelBuilder.Entity<UserProfile>()
                .HasKey(x => x.Id);

            modelBuilder.Entity<UserProfile>()
                .HasOne(x => x.User)
                .WithOne(x => x.Profile)
                .HasForeignKey<UserProfile>(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);


            // ========================================================
            // User Address
            // ========================================================

            modelBuilder.Entity<UserAddress>()
                .HasKey(x => x.Id);

            modelBuilder.Entity<UserAddress>()
                .HasOne(x => x.User)
                .WithMany(x => x.Addresses)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);


            // ========================================================
            // Refresh Token
            // ========================================================

            modelBuilder.Entity<RefreshToken>()
                .HasKey(x => x.Id);

            modelBuilder.Entity<RefreshToken>()
                .Property(x => x.TokenHash)
                .HasMaxLength(64)
                .IsRequired();

            modelBuilder.Entity<RefreshToken>()
                .HasIndex(x => x.TokenHash)
                .IsUnique();

            modelBuilder.Entity<RefreshToken>()
                .Property(x => x.UserId)
                .HasMaxLength(450)
                .IsRequired();

            modelBuilder.Entity<RefreshToken>()
                .HasIndex(x => x.UserId);

            modelBuilder.Entity<RefreshToken>()
                .HasOne(x => x.User)
                .WithMany(x => x.RefreshTokens)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<RefreshToken>()
                .Property(x => x.ReplacedByTokenHash)
                .HasMaxLength(64);
        }
    }
}