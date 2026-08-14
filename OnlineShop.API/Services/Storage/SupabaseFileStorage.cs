using Microsoft.AspNetCore.Http;
using Supabase;
using Supabase.Storage;

namespace OnlineShop.API.Services.Storage;

public class SupabaseFileStorage : IFileStorage
{
    private readonly Supabase.Client _supabase;
    private const string BucketName = "product-images";

    public SupabaseFileStorage(Supabase.Client supabase)
    {
        _supabase = supabase;
    }

    public async Task<string> SaveAsync(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return string.Empty;

        var extension = Path.GetExtension(file.FileName)
            .ToLowerInvariant();

        var fileName = $"{Guid.NewGuid()}{extension}";

        await using var memoryStream = new MemoryStream();

        await file.CopyToAsync(memoryStream);

        var fileBytes = memoryStream.ToArray();

        await _supabase.Storage
            .From(BucketName)
            .Upload(
                fileBytes,
                fileName,
                new Supabase.Storage.FileOptions
                {
                    ContentType = file.ContentType,
                    Upsert = false
                });

        return _supabase.Storage
            .From(BucketName)
            .GetPublicUrl(fileName);
    }

    public async Task DeleteAsync(string fileUrl)
    {
        if (string.IsNullOrWhiteSpace(fileUrl))
            return;

        var fileName = Path.GetFileName(
            new Uri(fileUrl).AbsolutePath);

        await _supabase.Storage
            .From(BucketName)
            .Remove(new List<string>
            {
                fileName
            });
    }
}