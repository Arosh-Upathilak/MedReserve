using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Appointment
    {
        [Key]
        public Guid AppointmentId { get; set; } = Guid.NewGuid();

        public required string UserId { get; set; }
        public string? UserName { get; set; }
        public User? User { get; set; }

        [Required]
        public Guid DoctorId { get; set; }
        public Doctor? Doctor { get; set; }
        public string? DoctorName { get; set; }

        [Required]
        public decimal Fee { get; set; }

        [Required]
        public Guid DoctorScheduleTimeId { get; set; }
        public DoctorScheduleTime? DoctorScheduleTime { get; set; }

        public AppointmentStatus Status { get; set; } = AppointmentStatus.Pending;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public enum AppointmentStatus
    {
        Pending,
        Confirmed,
        Cancelled,
        Completed
    }
}