using System.ComponentModel.DataAnnotations;

namespace OnlineShop.API.Models
{
    public class UpdateProfileModel
    {
        [MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [MaxLength(50)]
        public string LastName { get; set; } = string.Empty;

        [Phone]
        [MaxLength(30)]
        public string? PhoneNumber { get; set; }
    }
}