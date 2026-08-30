//usings----------------------------
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnlineShop.API.Models;
using OnlineShop.API.Services.Interfaces;

namespace OnlineShop.API.Services
{
    public class AdminUserService : IAdminUserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IAccountService _accountService;

        public AdminUserService(
            UserManager<AppUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IAccountService accountService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _accountService = accountService;
        }
        //GetUsers------------------------------------------------
        public async Task<AdminUserListResponse> GetUsersAsync(
            string? search,
            int page,
            int pageSize)
        {
            page = Math.Max(page, 1);
            pageSize = Math.Clamp(pageSize, 1, 100);

            var query = _userManager.Users
                .AsNoTracking();

            if (!string.IsNullOrWhiteSpace(search))
            {
                search = search.Trim();

                query = query.Where(x =>
                    (x.UserName != null &&
                     x.UserName.Contains(search)) ||
                    (x.Email != null &&
                     x.Email.Contains(search)));
            }

            var totalCount =
                await query.CountAsync();

            var users =
                await query
                    .OrderByDescending(x => x.Id)
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

            var result =
                new List<AdminUserResponse>();

            foreach (var user in users)
            {
                result.Add(
                    await MapAsync(user));
            }

            return new AdminUserListResponse
            {
                Users = result,
                Page = page,
                PageSize = pageSize,
                TotalCount = totalCount,
                TotalPages =
                    (int)Math.Ceiling(
                        totalCount /
                        (double)pageSize)
            };
        }
        //GetUser-------------------------------------
        public async Task<AdminUserResponse?> GetUserAsync(
            string userId)
        {
            var user =
                await _userManager.FindByIdAsync(userId);

            return user is null
                ? null
                : await MapAsync(user);
        }
        //UpdateUser---------------------------------------
        public async Task<IdentityResult> UpdateUserAsync(
            string userId,
            AdminUpdateUserModel model)
        {
            var user =
                await _userManager.FindByIdAsync(userId);

            if (user is null)
            {
                return UserNotFound();
            }

            var existingEmail =
                await _userManager.FindByEmailAsync(
                    model.Email.Trim());

            if (existingEmail is not null &&
                existingEmail.Id != user.Id)
            {
                return Failed(
                    "DuplicateEmail",
                    "This email is already in use.");
            }

            var existingUserName =
                await _userManager.FindByNameAsync(
                    model.UserName.Trim());

            if (existingUserName is not null &&
                existingUserName.Id != user.Id)
            {
                return Failed(
                    "DuplicateUserName",
                    "This username is already in use.");
            }

            user.UserName =
                model.UserName.Trim();

            user.Email =
                model.Email.Trim();

            user.PhoneNumber =
                string.IsNullOrWhiteSpace(
                    model.PhoneNumber)
                    ? null
                    : model.PhoneNumber.Trim();

            var result =
                await _userManager.UpdateAsync(user);

            return result;
        }
        //ChangeRole---------------------------------------
        public async Task<IdentityResult> ChangeRoleAsync(
            string userId,
            string role)
        {
            var user =
                await _userManager.FindByIdAsync(userId);

            if (user is null)
            {
                return UserNotFound();
            }

            role = role.Trim();

            if (!await _roleManager.RoleExistsAsync(role))
            {
                return Failed(
                    "RoleNotFound",
                    "The requested role does not exist.");
            }

            var currentRoles =
                await _userManager.GetRolesAsync(user);

            if (currentRoles.Count > 0)
            {
                var removeResult =
                    await _userManager.RemoveFromRolesAsync(
                        user,
                        currentRoles);

                if (!removeResult.Succeeded)
                {
                    return removeResult;
                }
            }

            return await _userManager.AddToRoleAsync(
                user,
                role);
        }
        //SetActive--------------------------------------
        public async Task<IdentityResult> SetActiveAsync(
            string userId,
            bool isActive)
        {
            var user =
                await _userManager.FindByIdAsync(userId);

            if (user is null)
            {
                return UserNotFound();
            }

            user.IsActive = isActive;

            if (!isActive)
            {
                await _accountService
                    .RevokeAllRefreshTokensAsync(user.Id);
            }

            return await _userManager.UpdateAsync(user);
        }
        //SetLockout-----------------------------------------
        public async Task<IdentityResult> SetLockoutAsync(
            string userId,
            bool locked)
        {
            var user =
                await _userManager.FindByIdAsync(userId);

            if (user is null)
            {
                return UserNotFound();
            }

            if (locked)
            {
                await _userManager.SetLockoutEnabledAsync(
                    user,
                    true);

                return await _userManager.SetLockoutEndDateAsync(
                    user,
                    DateTimeOffset.UtcNow.AddYears(100));
            }

            var result =
                await _userManager.SetLockoutEndDateAsync(
                    user,
                    null);

            if (!result.Succeeded)
            {
                return result;
            }

            return await _userManager.ResetAccessFailedCountAsync(
                user);
        }
        //DeleteUser--------------------------------------
        public async Task<IdentityResult> DeleteUserAsync(
            string userId)
        {
            var user =
                await _userManager.FindByIdAsync(userId);

            if (user is null)
            {
                return UserNotFound();
            }

            await _accountService
                .RevokeAllRefreshTokensAsync(user.Id);

            return await _userManager.DeleteAsync(user);
        }
        //Map----------------------------------------
        private async Task<AdminUserResponse> MapAsync(
            AppUser user)
        {
            return new AdminUserResponse
            {
                Id = user.Id,
                UserName =
                    user.UserName ?? string.Empty,
                Email =
                    user.Email ?? string.Empty,
                PhoneNumber =
                    user.PhoneNumber,
                EmailConfirmed =
                    user.EmailConfirmed,
                IsActive =
                    user.IsActive,
                IsLockedOut =
                    await _userManager.IsLockedOutAsync(user),
                LockoutEnd =
                    user.LockoutEnd?.UtcDateTime,
                Roles =
                    await _userManager.GetRolesAsync(user)
            };
        }
        //UserNotFound------------------------------
        private static IdentityResult UserNotFound()
        {
            return Failed(
                "UserNotFound",
                "User not found.");
        }
        //Failed-------------------------------
        private static IdentityResult Failed(
            string code,
            string description)
        {
            return IdentityResult.Failed(
                new IdentityError
                {
                    Code = code,
                    Description = description
                });
        }
    }
}