//usings--------------------------
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.EntityFrameworkCore;
using OnlineShopBlozer.Services.Interfaces;

namespace OnlineShopBlozer.Services
    //images-----------------------------------
{
    public class ImageService : IImageService
    {
        private readonly IWebHostEnvironment _environment;

        public ImageService(IWebHostEnvironment environment)
        {
            _environment = environment;
        }
        //Upload_Image--------------------------------
        public async Task<string> UploadAsync (IBrowserFile file)
        {
            var fileName = Guid.NewGuid() +
                Path.GetExtension(file.Name);

            var folderPath = Path.Combine(
                _environment.WebRootPath, "images");
            if (!Directory.Exists(folderPath))
            { 
                Directory.CreateDirectory (folderPath);
            }
            var filePath = Path.Combine (
                folderPath, fileName);

            using var stream = File.Create (filePath);

            await file.OpenReadStream()
                .CopyToAsync (stream);
            return "/images/" + fileName;
        }
        //delete_image----------------------
        public Task DeleteAsync(string imageUrl)
        {
            if (string.IsNullOrEmpty(imageUrl))
            { 
                return Task.CompletedTask;
            }
            var filePach = Path.Combine(
                _environment.WebRootPath, 
                    imageUrl.TrimStart('/'));
            if (File.Exists(filePach))
            { 
                File.Delete(filePach);
            }
            return Task.CompletedTask;
        }

    }
}
