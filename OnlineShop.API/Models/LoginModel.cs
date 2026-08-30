using System.ComponentModel.DataAnnotations;

namespace OnlineShop.API.Models
{
    public class LoginModel
    {
        [Required]
        [EmailAddress]
        [MaxLength(256)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;
    }
}