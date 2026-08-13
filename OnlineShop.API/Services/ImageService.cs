// Services/ImageService.cs

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using OnlineShop.API.Services.Interfaces;

namespace OnlineShop.API.Services
{
    public class ImageService : IImageService
    {
        private readonly IWebHostEnvironment _environment;
        private readonly ILogger<ImageService> _logger;

        public ImageService(
            IWebHostEnvironment environment,
            ILogger<ImageService> logger)
        {
            _environment = environment;
            _logger = logger;
        }

        public async Task<string> UploadAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return string.Empty;

            _logger.LogInformation(
                "Uploading image: {FileName}, Size: {Size}",
                file.FileName,
                file.Length);

            var fileName =
                Guid.NewGuid().ToString() +
                Path.GetExtension(file.FileName);

            var folderPath =
                Path.Combine(_environment.WebRootPath, "images");

            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            var filePath =
                Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(
                filePath,
                FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var imageUrl = "/images/" + fileName;

            _logger.LogInformation(
                "Image uploaded successfully: {ImageUrl}",
                imageUrl);

            return imageUrl;
        }

        public Task DeleteAsync(string imageUrl)
        {
            if (string.IsNullOrEmpty(imageUrl))
                return Task.CompletedTask;

            var filePath =
                Path.Combine(
                    _environment.WebRootPath,
                    imageUrl.TrimStart('/'));

            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }

            return Task.CompletedTask;
        }
    }
}