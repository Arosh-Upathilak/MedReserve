using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.User
{
    public class LoginDto
    {
        public required string email { get; set; }
        public required string password { get; set; }
    }
}