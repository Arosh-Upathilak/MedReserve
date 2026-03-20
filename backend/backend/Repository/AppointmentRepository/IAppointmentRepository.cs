
using backend.Dtos.Appointment;
using backend.Models;

namespace backend.Repository.AppointmentRepository
{
    public interface IAppointmentRepository
    {
        Task<DoctorSchedule> CreateAppointment(DoctorSchedule doctorSchedule);
        Task<object> GetAppointment();
        Task<object?> GetAppointmentById(string appointmentId);
        Task<object?> UpdateAppointmentById(string appointmentId, DoctorSchedule doctorSchedule);
        Task DeleteAppointmentId(string appointmentId);
        Task<object?> DoctorAppointmentDetailsGetById(string doctorId);
    }
}
