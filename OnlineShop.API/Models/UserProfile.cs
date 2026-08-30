namespace OnlineShop.API.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        public string UserId { get; set; } = string.Empty;

        public AppUser User { get; set; } = null!;

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string? AvatarUrl { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}