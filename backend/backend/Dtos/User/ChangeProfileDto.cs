using backend.Models;

namespace backend.Dtos.User
{
    public class ChangeProfileDto
    {
        public string? phoneNumber { get; set; }
        public string? address { get; set; }
        public string? profileImageUrl { get; set; } = null;
        public string? birthDay { get; set; }
        public Gender? gender { get; set; }
    }
}