namespace backend.Dtos.Appointment
{
    public class AppointmentDetailsDto
    {
        public required DateOnly appointmentDate { get; set; }
        public required TimeOnly appointmentTime { get; set; }
        public required int appointmentSlot { get; set; }
    }
}