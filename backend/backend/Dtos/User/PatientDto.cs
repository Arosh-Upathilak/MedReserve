using backend.Models;

namespace backend.Dtos.User
{
    public class PatientDto
    {
        public required string email { get; set; }
        public required string name { get; set; }
        public string? profileImageUrl { get; set; }

        public DateOnly? birthday  { get; set; }
        public  string? address { get; set; }
        public string? phoneNumber { get; set; }
        public Gender? gender { get; set; }
        public DateTime registeredDate { get; set; }
    }
}