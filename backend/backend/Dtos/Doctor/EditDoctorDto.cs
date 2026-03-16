using backend.Models;

namespace backend.Dtos.Doctor
{
    public class EditDoctorDto
    {
        public  string? doctorProfileLink {get; set;}
        public  string? doctorName {get; set;}
        public  Specialty doctorSpeciality {get; set;}
        public  string? doctorEmail {get; set;}
        public  string? doctorEducation {get; set;}
        public  ExperienceLevel doctorExperience {get; set;}
        public  string? doctorAbout {get; set;}
    }
}