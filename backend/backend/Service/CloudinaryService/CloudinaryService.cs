using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace backend.Service.CloudinaryService
{
    public class CloudinaryService : ICloudinaryService
    {
        private readonly Cloudinary _cloudinary;

        public CloudinaryService(IConfiguration config)
        {
            var cloudName = config["Cloudinary:CloudinaryCloudName"]
                ?? throw new InvalidOperationException("CloudinaryCloudName not configured.");

            var apiKey = config["Cloudinary:CloudinaryApiKey"]
                ?? throw new InvalidOperationException("CloudinaryApiKey not configured.");

            var apiSecret = config["Cloudinary:CloudinaryApiSecret"]
                ?? throw new InvalidOperationException("CloudinaryApiSecret not configured.");

            var account = new Account(cloudName, apiKey, apiSecret);

            _cloudinary = new Cloudinary(account);
        }

        public async Task DeleteCloudinaryImage(string imageURL)
        {
            if (string.IsNullOrWhiteSpace(imageURL))
                return;

            var publicId = GetPublicID(imageURL);
            var result = await _cloudinary.DestroyAsync(
                new DeletionParams(publicId)
                {
                    ResourceType = ResourceType.Image,
                    Invalidate = true
                });

            if (result.Result != "ok" && result.Result != "not found")
            {
                throw new Exception("Cloudinary delete failed");
            }
        }

        public string? GetPublicID(string imageURL)
        {
            if (string.IsNullOrWhiteSpace(imageURL))
                return null;

            var uri = new Uri(imageURL);

            var path = uri.AbsolutePath;

            var uploadIndex = path.IndexOf("/upload/");

            if (uploadIndex == -1)
                return null;

            var publicIdWithVersion = path.Substring(uploadIndex + 8);

            var firstSlash = publicIdWithVersion.IndexOf('/');

            if (firstSlash == -1)
                return null;

            var publicId = publicIdWithVersion.Substring(firstSlash + 1);

            return Path.ChangeExtension(publicId, null);
        }
    }
}