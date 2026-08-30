using Microsoft.AspNetCore.Identity;

namespace OnlineShop.API.Models
{
    public class AppUser : IdentityUser
    {
        public bool IsActive { get; set; } = true;

        public UserProfile? Profile { get; set; }

        public ICollection<UserAddress> Addresses { get; set; }
            = new List<UserAddress>();

        public ICollection<RefreshToken> RefreshTokens { get; set; }
            = new List<RefreshToken>();
    }
}