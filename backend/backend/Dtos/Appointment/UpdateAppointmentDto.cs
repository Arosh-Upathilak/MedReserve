namespace backend.Dtos.Appointment
{
    public class UpdateAppointmentDto
    {
        public required Guid doctorId { get; set; }
        public required long fee { get; set; }
        public List<AppointmentDetailsDto> doctorAppointmentList { get; set; } = new List<AppointmentDetailsDto>();
    }
}