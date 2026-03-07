using CloudinaryDotNet.Actions;

namespace backend.Service.CloudinaryService
{
    public interface ICloudinaryService
    {
        Task DeleteCloudinaryImage(string imageURL);
        public string? GetPublicID(string imageURL);
    }
}