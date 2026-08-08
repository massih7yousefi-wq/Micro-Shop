namespace OnlineShop.API.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public decimal TotalPrice { get; set; }
        public string Status { get; set; } = "Pending";
        public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();

    }
}
