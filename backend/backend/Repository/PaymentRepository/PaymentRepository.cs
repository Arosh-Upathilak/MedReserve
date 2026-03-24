using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository.PaymentRepository
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public PaymentRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        public async Task<Payment> CreatePayment(Payment payment)
        {
            await _applicationDbContext.Payments.AddAsync(payment);
            await _applicationDbContext.SaveChangesAsync();
            return payment;
        }

        public async Task<Payment?> GetQrCode(string paymentId)
        {
            var payment = await _applicationDbContext.Payments
                .FirstOrDefaultAsync(p => p.PaymentId == Guid.Parse(paymentId));

            return payment;
        }

        public async Task<object> GetAllPaymentDetails()
        {
            return await _applicationDbContext.Payments.Select(
                payment => new
                {
                    payment.PaymentId,
                    payment.Appointment!.User!.UserName,
                    payment.Appointment!.DoctorScheduleTime!.ScheduleDate,
                    payment.Appointment.DoctorScheduleTime.ScheduleTime,
                    payment.Appointment.Fee,
                    payment.Appointment.Doctor!.DoctorName,
                    payment.Appointment.Doctor!.DoctorImageUrl,
                    payment.Appointment.AppointmentNumber
                }
            ).ToListAsync();
        }
    }
}