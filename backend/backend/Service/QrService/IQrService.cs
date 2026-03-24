namespace backend.Service.QrService
{
    public interface IQrService
    {
        byte[] GenerateQrCode(string text);
    }
}