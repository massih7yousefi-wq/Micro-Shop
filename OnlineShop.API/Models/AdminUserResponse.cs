namespace OnlineShop.API.Models
{
    public class AdminUserResponse
    {
        public string Id { get; set; } = string.Empty;

        public string UserName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string? PhoneNumber { get; set; }

        public bool EmailConfirmed { get; set; }

        public bool IsActive { get; set; }

        public bool IsLockedOut { get; set; }

        public DateTime? LockoutEnd { get; set; }

        public IList<string> Roles { get; set; }
            = new List<string>();
    }
}