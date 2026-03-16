using backend.Models;

namespace backend.Dtos.Doctor
{
    public class AddDoctorDto
    {
        public required string doctorProfileLink {get; set;}
        public required string doctorName {get; set;}
        public required Specialty doctorSpeciality {get; set;}
        public required string doctorEmail {get; set;}
        public required string doctorEducation {get; set;}
        public required ExperienceLevel doctorExperience {get; set;}
        public  string? doctorAbout {get; set;}
    }
}