using Microsoft.AspNetCore.Identity;
using OnlineShop.API.Models;

namespace OnlineShop.API.Services.Interfaces
{
    public interface IAccountService
    {
        Task<IdentityResult> RegisterAsync(RegisterModel model);
    }
}
