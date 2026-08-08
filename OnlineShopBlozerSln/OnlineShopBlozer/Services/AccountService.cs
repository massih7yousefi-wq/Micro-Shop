//Usings------------------------------------
using Microsoft.AspNetCore.Identity;
using OnlineShopBlozer.Models;
using OnlineShopBlozer.Services.Interfaces;

namespace OnlineShopBlozer.Services
{
    public class AccountService : IAccountService
    {
        //Made=>_context&_logger---------------------------
        private readonly UserManager<AppUser> _userManager;
        private readonly ILogger<AccountService> _logger;
        //Constructor_method-------------------------------
        public AccountService(
            UserManager<AppUser> userManager,
            ILogger<AccountService> logger
            )
        {
            _logger = logger;
            _userManager = userManager;
        }
        //Identity_Result----------------------------------
        public async Task<IdentityResult> RegisterAsync(RegisterModel model)
        {
            try 
            {
                var user = new AppUser
                {
                    UserName = model.UserName,
                    Email = model.Email
                };
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    _logger.LogInformation($"User {model.UserName} registered successfully.");
                }
                else 
                {
                    foreach (var error in result.Errors)
                    {
                        _logger.LogWarning(error.Description);
                    }    
                }
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error while registering user.");
                throw;
            }
        }

    }
}
