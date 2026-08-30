using System.ComponentModel.DataAnnotations;

namespace OnlineShop.API.Models
{
    public class AdminUpdateUserModel
    {
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string UserName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(256)]
        public string Email { get; set; } = string.Empty;

        [Phone]
        [MaxLength(30)]
        public string? PhoneNumber { get; set; }
    }
}