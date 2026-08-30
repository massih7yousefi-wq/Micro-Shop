using OnlineShop.API.Models;

namespace OnlineShop.API.Services.Interfaces
{
    public interface IProfileService
    {
        Task<ProfileResponse?> GetAsync(
            string userId);

        Task<ProfileResponse?> UpdateAsync(
            string userId,
            UpdateProfileModel model);
    }
}
