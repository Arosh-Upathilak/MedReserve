namespace backend.Dtos.User
{
    public class RegisterDto
    {
        public required string userName { get; set; }
        public required string email { get; set; }
        public required string phoneNumber { get; set; }
        public required string password { get; set; }
    }
}