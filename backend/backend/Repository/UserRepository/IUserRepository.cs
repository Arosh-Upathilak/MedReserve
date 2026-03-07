using backend.Dtos.User;
using backend.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Repository
{
    public interface IUserRepository
    {
        Task<User?> FindByEmailAsync(string email);
        Task<IdentityResult> CreateUserAsync(User user, string password);
        Task AddToRoleAsync(User user, string role);
        Task<IList<string>> GetRolesAsync(User user);
        Task<SignInResult> CheckPasswordAsync(User user, string password);
        Task<IdentityResult> UpdateUserAsync(User user);
        Task<string> GeneratePasswordResetTokenAsync(User user);
        Task<bool> VerifyResetTokenAsync(User user, string token);
        Task<IdentityResult> ResetPasswordAsync(User user, string token, string newPassword);
        IQueryable<User> GetUsers();
    }
}