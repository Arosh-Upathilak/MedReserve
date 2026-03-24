using backend.Models;

namespace backend.Dtos
{
    public class SaveDoctorAppointmentDto
    {
        public required string doctorId { get; set; }
        public decimal Fee { get; set; }
        public required string doctorScheduleTimeId { get; set; }
    }
}