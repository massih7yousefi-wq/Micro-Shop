using System.ComponentModel.DataAnnotations;

namespace OnlineShop.API.Models
{
    public class ForgotPasswordModel
    {
        [Required]
        [EmailAddress]
        [MaxLength(256)]
        public string Email { get; set; } = string.Empty;
    }
}