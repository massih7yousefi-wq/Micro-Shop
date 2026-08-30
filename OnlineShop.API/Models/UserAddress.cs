namespace OnlineShop.API.Models
{
    public class UserAddress
    {
        public int Id { get; set; }

        public string UserId { get; set; } = string.Empty;

        public AppUser User { get; set; } = null!;

        public string RecipientName { get; set; } = string.Empty;

        public string RecipientPhone { get; set; } = string.Empty;

        public string AddressLine { get; set; } = string.Empty;

        public string City { get; set; } = string.Empty;

        public string State { get; set; } = string.Empty;

        public string PostalCode { get; set; } = string.Empty;

        public bool IsDefault { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}