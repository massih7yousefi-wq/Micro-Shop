using Microsoft.AspNetCore.Identity;
using OnlineShopBlozer.Models;

namespace OnlineShopBlozer.Services.Interfaces
{
    public interface IAccountService
    {
        Task<IdentityResult> RegisterAsync(RegisterModel model);
    }
}
