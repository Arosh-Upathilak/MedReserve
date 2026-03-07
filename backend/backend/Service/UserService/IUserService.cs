using backend.Models;

namespace backend.Service.UserService
{
    public interface IUserService
    {
        public string GenerateJWTToken(User user, string role);
        public Task<User?> GetCurrentUser();

        public Task<string> ForgotPasswordToken(string token);
    }
}