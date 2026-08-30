using System.ComponentModel.DataAnnotations;

namespace OnlineShop.API.Models
{
    public class ChangeUserRoleModel
    {
        [Required]
        public string Role { get; set; } = string.Empty;
    }
}