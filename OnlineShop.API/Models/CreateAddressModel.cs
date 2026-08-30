using System.ComponentModel.DataAnnotations;

namespace OnlineShop.API.Models
{
    public class CreateAddressModel
    {
        [Required]
        [MaxLength(100)]
        public string RecipientName { get; set; } = string.Empty;

        [Required]
        [Phone]
        [MaxLength(30)]
        public string RecipientPhone { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string AddressLine { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string City { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string State { get; set; } = string.Empty;

        [Required]
        [MaxLength(30)]
        public string PostalCode { get; set; } = string.Empty;

        public bool IsDefault { get; set; }
    }
}
