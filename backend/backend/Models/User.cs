using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class User : IdentityUser
    {
        public string? UserImageUrl { get; set; }


        public Gender? Gender { get; set; }

        public string? Address { get; set; }
        public DateOnly? BirthDay { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public enum Gender
    {
        Male,
        Female,
        NotPrefer,
        Other
    }
}