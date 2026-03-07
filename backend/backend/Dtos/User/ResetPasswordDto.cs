namespace backend.Dtos.User
{
    public class ResetPasswordDto
    {
        public required string token { get; set; }
        public required string newPassword { get; set; }
    }
}