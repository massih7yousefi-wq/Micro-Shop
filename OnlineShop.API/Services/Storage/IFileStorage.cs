using Microsoft.AspNetCore.Http;

namespace OnlineShop.API.Services.Storage
{
    public interface IFileStorage
    {
        Task<string> SaveAsync(IFormFile file);
        Task DeleteAsync(string fileUrl);
    }
}