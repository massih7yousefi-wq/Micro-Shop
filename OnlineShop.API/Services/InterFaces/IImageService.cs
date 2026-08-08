// Services/Interfaces/IImageService.cs

using Microsoft.AspNetCore.Http;

namespace OnlineShop.API.Services.Interfaces
{
    public interface IImageService
    {
        Task<string> UploadAsync(IFormFile file);
        Task DeleteAsync(string imageUrl);
    }
}