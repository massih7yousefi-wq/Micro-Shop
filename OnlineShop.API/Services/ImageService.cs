//usings--------------------------------
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using OnlineShop.API.Services.Interfaces;
using OnlineShop.API.Services.Storage;

namespace OnlineShop.API.Services
{
    //Constructor----------------------------
    public class ImageService : IImageService
    {
        private readonly IFileStorage _fileStorage;
        private readonly ILogger<ImageService> _logger;

        public ImageService(
            IFileStorage fileStorage,
            ILogger<ImageService> logger)
        {
            _fileStorage = fileStorage;
            _logger = logger;
        }
        //UploadAsync------------------------------------
        public async Task<string> UploadAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return string.Empty;

            var allowedExtensions = new[]
            {
                ".jpg",
                ".jpeg",
                ".png",
                ".webp"
             };

            var extension = Path.GetExtension(file.FileName)
                .ToLowerInvariant();

            if (!allowedExtensions.Contains(extension))
            {
                throw new InvalidOperationException(
                    "Only JPG, JPEG, PNG and WEBP images are allowed.");
            }

            const long maxFileSize = 5 * 1024 * 1024;

            if (file.Length > maxFileSize)
            {
                throw new InvalidOperationException(
                    "Image size cannot exceed 5 MB.");
            }

            _logger.LogInformation(
                "Uploading image: {FileName}, Size: {Size}",
                file.FileName,
                file.Length);

            var imageUrl = await _fileStorage.SaveAsync(file);

            _logger.LogInformation(
                "Image uploaded successfully: {ImageUrl}",
                imageUrl);

            return imageUrl;
        }
        //DeleteAsync-------------------------------
        public async Task DeleteAsync(string imageUrl)
        {
            if (string.IsNullOrWhiteSpace(imageUrl))
                return;

            await _fileStorage.DeleteAsync(imageUrl);

            _logger.LogInformation(
                "Image deleted successfully: {ImageUrl}",
                imageUrl);
        }
    }
}