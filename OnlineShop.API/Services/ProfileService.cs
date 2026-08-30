//usings---------------------------------
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnlineShop.API.Data;
using OnlineShop.API.Models;
using OnlineShop.API.Services.Interfaces;

namespace OnlineShop.API.Services
{
    public class ProfileService : IProfileService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly AppDbContext _dbContext;

        public ProfileService(
            UserManager<AppUser> userManager,
            AppDbContext dbContext)
        {
            _userManager = userManager;
            _dbContext = dbContext;
        }
        //Get-----------------------------------------
        public async Task<ProfileResponse?> GetAsync(
            string userId)
        {
            var user =
                await _userManager.Users
                    .Include(x => x.Profile)
                    .FirstOrDefaultAsync(
                        x => x.Id == userId);

            if (user is null)
            {
                return null;
            }

            return Map(user);
        }
        //Update--------------------------------------
        public async Task<ProfileResponse?> UpdateAsync(
            string userId,
            UpdateProfileModel model)
        {
            var user =
                await _userManager.Users
                    .Include(x => x.Profile)
                    .FirstOrDefaultAsync(
                        x => x.Id == userId);

            if (user is null)
            {
                return null;
            }

            user.Profile ??= new UserProfile
            {
                UserId = user.Id
            };

            user.Profile.FirstName =
                model.FirstName.Trim();

            user.Profile.LastName =
                model.LastName.Trim();

            user.Profile.UpdatedAt =
                DateTime.UtcNow;

            user.PhoneNumber =
                string.IsNullOrWhiteSpace(
                    model.PhoneNumber)
                    ? null
                    : model.PhoneNumber.Trim();

            await _dbContext.SaveChangesAsync();

            return Map(user);
        }
        //Map------------------------------------
        private static ProfileResponse Map(
            AppUser user)
        {
            return new ProfileResponse
            {
                UserId = user.Id,
                UserName = user.UserName ?? string.Empty,
                Email = user.Email ?? string.Empty,
                PhoneNumber = user.PhoneNumber,
                FirstName =
                    user.Profile?.FirstName ?? string.Empty,
                LastName =
                    user.Profile?.LastName ?? string.Empty,
                AvatarUrl =
                    user.Profile?.AvatarUrl
            };
        }
    }
}