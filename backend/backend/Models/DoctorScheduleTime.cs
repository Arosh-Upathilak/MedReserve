using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class DoctorScheduleTime
    {
        [Key]
        public Guid DoctorScheduleTimeId { get; set; } = Guid.NewGuid();
        [Required]
        public Guid DoctorScheduleId { get; set; }
        [Required]
        public DoctorSchedule? DoctorSchedule { get; set; }
        [Required]
        public DateOnly ScheduleDate { get; set; }
        [Required]
        public TimeOnly ScheduleTime { get; set; }
        [Required]
        public int AllowedAppointments { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }
}