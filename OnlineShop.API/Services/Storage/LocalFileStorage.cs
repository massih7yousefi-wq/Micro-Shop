//usings-------------------------
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace OnlineShop.API.Services.Storage
{
    //Constructor--------------------------------
    public class LocalFileStorage : IFileStorage
    {
        private readonly IWebHostEnvironment _environment;

        public LocalFileStorage(IWebHostEnvironment environment)
        {
            _environment = environment;
        }
        //SaveAsync-----------------------------
        public async Task<string> SaveAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return string.Empty;

            var folderPath = Path.Combine(
                _environment.WebRootPath,
                "images");

            Directory.CreateDirectory(folderPath);

            var fileName =
                $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";

            var filePath = Path.Combine(folderPath, fileName);

            await using var stream = new FileStream(
                filePath,
                FileMode.Create);

            await file.CopyToAsync(stream);

            return $"/images/{fileName}";
        }
        //DeleteAsync-----------------------
        public Task DeleteAsync(string fileUrl)
        {
            if (string.IsNullOrWhiteSpace(fileUrl))
                return Task.CompletedTask;

            var filePath = Path.Combine(
                _environment.WebRootPath,
                fileUrl.TrimStart('/'));

            if (File.Exists(filePath))
                File.Delete(filePath);

            return Task.CompletedTask;
        }
    }
}