using Microsoft.AspNetCore.Components.Forms;

namespace OnlineShopBlozer.Services.Interfaces
{
    public interface IImageService
    {
        Task<string> UploadAsync(IBrowserFile file);
        Task DeleteAsync(string imageUrl);
    }
}
