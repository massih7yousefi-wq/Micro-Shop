using System.ComponentModel.DataAnnotations;

namespace OnlineShopBlozer.Models
{
    public class RegisterModel
    {
        //User_Name-------------------------------------
        [Required]
        public string UserName { get; set; } = string.Empty;
        //Email------------------------------------------
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        //Password--------------------------------------
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;
        //Confirm_Password------------------------------
        [Required]
        [DataType(DataType.Password)]
        [Compare(nameof(Password))]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
