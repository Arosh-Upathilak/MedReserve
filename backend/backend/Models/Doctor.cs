using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Doctor
    {
        [Key]
        public Guid DoctorId { get; set; } = Guid.NewGuid();
        [Required]
        public required string DoctorName { get; set; }
        [Required]
        public required string DoctorEmail { get; set; }
        [Required]
        public required Specialty Speciality { get; set; }
        [Required]
        public required string Education { get; set; }
        [Required]
        public ExperienceLevel Experience { get; set; }
        public string? About { get; set; }

        public string? DoctorImageUrl { get; set; }
        public List<DoctorSchedule>? Schedules { get; set; } = new();

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }

    public enum ExperienceLevel
    {
        LessThanOneYear,
        OneYear,
        TwoYears,
        ThreeYears,
        FourYears,
        FiveYears,
        MoreThanFiveYears
    }

    public enum Specialty
    {

        GeneralPhysician,
        Gynecologist,
        Dermatologist,
        Cardiologist,
        Pediatricians,
        Neurologist,
        Gastroenterologist
    }
}