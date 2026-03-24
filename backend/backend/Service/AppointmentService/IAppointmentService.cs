namespace backend.Service.AppointmentService
{
    public interface IAppointmentService
    {
        Task RemoveExpiredAppointments();
    }
}