using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace backend.Service.UserService
{
    public class UserService : IUserService
    {
        private readonly IConfiguration _config;
        private readonly UserManager<User> _userManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserService(IConfiguration config, UserManager<User> userManager, IHttpContextAccessor httpContextAccessor)
        {
            _config = config;
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
        }

        public string GenerateJWTToken(User user, string role)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub,user.Id),
                new Claim(JwtRegisteredClaimNames.Email,user.Email ?? ""),
                new Claim(ClaimTypes.Name, user.UserName ?? ""),
                new Claim(ClaimTypes.Role, role)
            };
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_config["Jwt:Key"] ?? throw new Exception("JWT Secret missing")));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddDays(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        public async Task<User?> GetCurrentUser()
        {
            var userId = _httpContextAccessor.HttpContext?.User
                ?.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
                return null;

            var user = await _userManager.FindByIdAsync(userId);

            return user;
        }

        public async Task<string> ForgotPasswordToken(string token)
        {
            var frontendUrl = _config["Cors:FrontendUrl"] ?? throw new InvalidOperationException("FrontendUrl not configured.");
            var resetUrl = $"{frontendUrl}/resetpassword/{Uri.EscapeDataString(token)}";
            var currentYear = DateTime.Now.Year.ToString();
            var templatePath = Path.Combine(Directory.GetCurrentDirectory(), "Templates", "ForgotPassword.html");

            if (!File.Exists(templatePath)) throw new FileNotFoundException("Email template not found");
            var template = File.ReadAllText(templatePath);

            template = template.Replace("{{resetUrl}}", resetUrl);
            template = template.Replace("{{year}}", currentYear);

            return template;

        }
    }
}