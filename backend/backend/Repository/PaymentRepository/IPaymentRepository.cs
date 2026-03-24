using backend.Models;

namespace backend.Repository.PaymentRepository
{
    public interface IPaymentRepository
    {
        Task<Payment> CreatePayment(Payment payment);
        Task<Payment?> GetQrCode(string paymentId);
        Task<object> GetAllPaymentDetails();
    }
}