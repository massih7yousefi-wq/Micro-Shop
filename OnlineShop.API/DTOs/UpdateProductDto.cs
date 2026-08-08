using Microsoft.AspNetCore.Http;

namespace OnlineShop.API.DTOs
{
    public class UpdateProductDto
    {
        public string Name { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public int CategoryId { get; set; }

        
        public List<IFormFile>? NewImages { get; set; }

       
        public List<int>? DeletedImageIds { get; set; }

       
        public int? MainImageId { get; set; }

        public string Description { get; set; } = string.Empty;
    }
}