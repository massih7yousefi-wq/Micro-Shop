using Microsoft.AspNetCore.Identity;
using OnlineShop.API.Models;

namespace OnlineShop.API.Data
{
    public static class IdentitySeeder
    {
        private const string AdminRole = "Admin";
        private const string UserRole = "User";

        public static async Task SeedAsync(
            IServiceProvider services)
        {
            var configuration =
                services.GetRequiredService<IConfiguration>();

            var roleManager =
                services.GetRequiredService<RoleManager<IdentityRole>>();

            var userManager =
                services.GetRequiredService<UserManager<AppUser>>();

            await SeedRolesAsync(roleManager);

            await SeedAdminAsync(
                userManager,
                configuration);
        }


        // ============================================================
        // Roles
        // ============================================================

        private static async Task SeedRolesAsync(
            RoleManager<IdentityRole> roleManager)
        {
            var roles = new[]
            {
                AdminRole,
                UserRole
            };

            foreach (var roleName in roles)
            {
                if (await roleManager.RoleExistsAsync(roleName))
                {
                    continue;
                }

                var result =
                    await roleManager.CreateAsync(
                        new IdentityRole(roleName));

                if (!result.Succeeded)
                {
                    throw new InvalidOperationException(
                        $"Failed to create role '{roleName}': " +
                        FormatErrors(result));
                }
            }
        }


        // ============================================================
        // Admin
        // ============================================================

        private static async Task SeedAdminAsync(
            UserManager<AppUser> userManager,
            IConfiguration configuration)
        {
            var adminUserName =
                GetRequiredConfiguration(
                    configuration,
                    "Admin:UserName");

            var adminEmail =
                GetRequiredConfiguration(
                    configuration,
                    "Admin:Email");

            var adminPassword =
                GetRequiredConfiguration(
                    configuration,
                    "Admin:Password");


            // --------------------------------------------------------
            // Find existing admin by username
            // --------------------------------------------------------

            var admin =
                await userManager.FindByNameAsync(
                    adminUserName);


            // --------------------------------------------------------
            // Create admin if it does not exist
            // --------------------------------------------------------

            if (admin is null)
            {
                admin = new AppUser
                {
                    UserName = adminUserName,
                    Email = adminEmail,

                    EmailConfirmed = true,
                    IsActive = true
                };

                var createResult =
                    await userManager.CreateAsync(
                        admin,
                        adminPassword);

                if (!createResult.Succeeded)
                {
                    throw new InvalidOperationException(
                        "Failed to create admin: " +
                        FormatErrors(createResult));
                }
            }
            else
            {
                // ----------------------------------------------------
                // Existing admin
                // ----------------------------------------------------

                var changed = false;

                if (admin.Email != adminEmail)
                {
                    admin.Email = adminEmail;
                    admin.EmailConfirmed = true;
                    changed = true;
                }

                if (!admin.EmailConfirmed)
                {
                    admin.EmailConfirmed = true;
                    changed = true;
                }

                if (!admin.IsActive)
                {
                    admin.IsActive = true;
                    changed = true;
                }

                if (changed)
                {
                    var updateResult =
                        await userManager.UpdateAsync(admin);

                    if (!updateResult.Succeeded)
                    {
                        throw new InvalidOperationException(
                            "Failed to update admin: " +
                            FormatErrors(updateResult));
                    }
                }
            }


            // --------------------------------------------------------
            // Ensure Admin role
            // --------------------------------------------------------

            if (!await userManager.IsInRoleAsync(
                    admin,
                    AdminRole))
            {
                var roleResult =
                    await userManager.AddToRoleAsync(
                        admin,
                        AdminRole);

                if (!roleResult.Succeeded)
                {
                    throw new InvalidOperationException(
                        "Failed to assign Admin role: " +
                        FormatErrors(roleResult));
                }
            }
        }


        // ============================================================
        // Configuration
        // ============================================================

        private static string GetRequiredConfiguration(
            IConfiguration configuration,
            string key)
        {
            var value =
                configuration[key];

            if (string.IsNullOrWhiteSpace(value))
            {
                throw new InvalidOperationException(
                    $"Configuration '{key}' is not configured.");
            }

            return value;
        }


        // ============================================================
        // Identity Errors
        // ============================================================

        private static string FormatErrors(
            IdentityResult result)
        {
            return string.Join(
                " | ",
                result.Errors.Select(error =>
                    $"{error.Code}: {error.Description}"));
        }
    }
}