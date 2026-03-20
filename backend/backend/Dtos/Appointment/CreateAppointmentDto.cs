namespace backend.Dtos.Appointment
{
    public class CreateAppointmentDto
    {
        public required Guid doctorId { get; set; }
        public required long doctorFree { get; set; }
        public List<AppointmentDetailsDto> doctorAppointmentList { get; set; } = new List<AppointmentDetailsDto>();
    }
}