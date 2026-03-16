using backend.Data;
using backend.Dtos.User;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ApplicationDbContext _applicationDbContext;
        public UserRepository(UserManager<User> userManager, SignInManager<User> signInManager, ApplicationDbContext applicationDbContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _applicationDbContext = applicationDbContext;
        }

        public async Task<User?> FindByEmailAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        public async Task<IdentityResult> CreateUserAsync(User user, string password)
        {
            return await _userManager.CreateAsync(user, password);
        }

        public async Task AddToRoleAsync(User user, string role)
        {
            await _userManager.AddToRoleAsync(user, role);
        }

        public async Task<IList<string>> GetRolesAsync(User user)
        {
            return await _userManager.GetRolesAsync(user);
        }

        public async Task<Microsoft.AspNetCore.Identity.SignInResult> CheckPasswordAsync(User user, string password)
        {
            return await _signInManager.CheckPasswordSignInAsync(user, password, false);
        }

        public async Task<IdentityResult> UpdateUserAsync(User user)
        {
            return await _userManager.UpdateAsync(user);
        }

        public async Task<string> GeneratePasswordResetTokenAsync(User user)
        {
            return await _userManager.GeneratePasswordResetTokenAsync(user);
        }

        public async Task<bool> VerifyResetTokenAsync(User user, string token)
        {
            return await _userManager.VerifyUserTokenAsync(
                user,
                _userManager.Options.Tokens.PasswordResetTokenProvider,
                "ResetPassword",
                token
            );
        }

        public async Task<IdentityResult> ResetPasswordAsync(User user, string token, string newPassword)
        {
            return await _userManager.ResetPasswordAsync(user, token, newPassword);
        }

        public IQueryable<User> GetUsers()
        {
            return _userManager.Users;
        }

        public async Task<List<PatientDto>> GetPatientsDetails()
        {

            var patients = await(
                from user in _applicationDbContext.Users
                join userRole in _applicationDbContext.UserRoles on user.Id equals userRole.UserId
                join role in _applicationDbContext.Roles on userRole.RoleId equals role.Id
                where role.Name == "Patient"
                select new PatientDto
                            {
                email = user.Email ?? "",
                name = user.UserName ?? "",
                birthday = user.BirthDay,
                address = user.Address,
                phoneNumber = user.PhoneNumber,
                gender = user.Gender,
                profileImageUrl = user.UserImageUrl,
                registeredDate = user.CreatedAt
            }
            ).ToListAsync();

            return patients;
        }
    }
}