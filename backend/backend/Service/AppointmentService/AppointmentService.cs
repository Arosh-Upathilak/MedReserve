using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Service.AppointmentService
{
    public class AppointmentService : IAppointmentService
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public AppointmentService(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task RemoveExpiredAppointments()
        {
            var expiredAppointments = await _applicationDbContext.Appointments
                .Include(a => a.DoctorScheduleTime)
                .Where(a =>
                    a.Status != AppointmentStatus.Completed &&
                    a.DoctorScheduleTime != null &&
                    a.CreatedAt < DateTime.UtcNow.AddMinutes(-150)
                )
                .ToListAsync();

            if (expiredAppointments.Any())
            {
                _applicationDbContext.Appointments.RemoveRange(expiredAppointments);
                await _applicationDbContext.SaveChangesAsync();
            }
        }
    }
}