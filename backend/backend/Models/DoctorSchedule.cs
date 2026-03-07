using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class DoctorSchedule
    {
        [Key]
        public Guid DoctorScheduleId { get; set; } = Guid.NewGuid();
        [Required]
        public Guid DoctorId { get; set; }
        [Required]
        public Doctor? Doctor { get; set; }
        [Required]
        public decimal Fee { get; set; }
        public List<DoctorScheduleTime> ScheduleTimes { get; set; } = new();

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }
}