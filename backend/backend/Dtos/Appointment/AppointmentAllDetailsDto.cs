using backend.Models;

public class AppointmentAllDetailsDto
{
    public Guid AppointmentId { get; set; }
    public Guid DoctorId { get; set; }
    public string? DoctorName { get; set; }
    public string? DoctorImageUrl { get; set; }
    public Specialty Speciality { get; set; }
    public Guid DoctorScheduleTimeId { get; set; }
    public int AppointmentNumber { get; set; }
    public decimal Fee { get; set; }
    public required string Status { get; set; }
    public required DateOnly ScheduleDate { get; set; }
    public required TimeOnly ScheduleTime { get; set; }
    public DateTime CreatedAt { get; set; }
}