using Microsoft.AspNetCore.Identity;
using OnlineShop.API.Models;

namespace OnlineShop.API.Services.Interfaces
{
    public interface IAdminUserService
    {
        Task<AdminUserListResponse> GetUsersAsync(
            string? search,
            int page,
            int pageSize);

        Task<AdminUserResponse?> GetUserAsync(
            string userId);

        Task<IdentityResult> UpdateUserAsync(
            string userId,
            AdminUpdateUserModel model);

        Task<IdentityResult> ChangeRoleAsync(
            string userId,
            string role);

        Task<IdentityResult> SetActiveAsync(
            string userId,
            bool isActive);

        Task<IdentityResult> SetLockoutAsync(
            string userId,
            bool locked);

        Task<IdentityResult> DeleteUserAsync(
            string userId);
    }
}