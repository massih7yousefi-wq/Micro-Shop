using System.ComponentModel.DataAnnotations;

namespace OnlineShop.API.Models
{
    public class RefreshTokenModel
    {
        [Required]
        public string RefreshToken { get; set; } = string.Empty;
    }
}