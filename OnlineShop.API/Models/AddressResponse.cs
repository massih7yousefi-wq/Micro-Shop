namespace OnlineShop.API.Models
{
    public class AddressResponse
    {
        public int Id { get; set; }

        public string RecipientName { get; set; } = string.Empty;

        public string RecipientPhone { get; set; } = string.Empty;

        public string AddressLine { get; set; } = string.Empty;

        public string City { get; set; } = string.Empty;

        public string State { get; set; } = string.Empty;

        public string PostalCode { get; set; } = string.Empty;

        public bool IsDefault { get; set; }
    }
}
