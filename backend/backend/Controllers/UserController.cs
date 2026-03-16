using System.Security.Claims;
using backend.Dtos.User;
using backend.Models;
using backend.Repository;
using backend.Service.CloudinaryService;
using backend.Service.EmailService;
using backend.Service.UserService;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _iuserService;
        private readonly IEmailService _iemailService;

        private readonly IUserRepository _iuserRepository;
        private readonly ICloudinaryService _icloudinaryService;
        public UserController(IUserService iuserService, IEmailService iemailService, IUserRepository iuserRepository, ICloudinaryService icloudinaryService)
        {
            _iuserService = iuserService;
            _iemailService = iemailService;
            _iuserRepository = iuserRepository;
            _icloudinaryService = icloudinaryService;
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            var userExits = await _iuserRepository.FindByEmailAsync(registerDto.email);
            if (userExits != null)
                return BadRequest(new { message = "Email already exists" });

            var newUser = new User
            {
                UserName = registerDto.userName,
                Email = registerDto.email,
                PhoneNumber = registerDto.phoneNumber
            };
            var result = await _iuserRepository.CreateUserAsync(newUser, registerDto.password);

            if (!result.Succeeded)
                return BadRequest(new { message = "User creation failed! Please check user details and try again." });

            await _iuserRepository.AddToRoleAsync(newUser, "Patient");

            var roles = await _iuserRepository.GetRolesAsync(newUser);
            var token = _iuserService.GenerateJWTToken(newUser, roles.First());
            return Ok(new
            {
                token,
                message = "User registered successfully",
                Role = roles.FirstOrDefault()
            });

        }
        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var userExists = await _iuserRepository.FindByEmailAsync(loginDto.email);
            if (userExists == null)
                return BadRequest(new { message = "User does not exists please create account first" });

            var result = await _iuserRepository.CheckPasswordAsync(userExists, loginDto.password);
            if (!result.Succeeded)
                return BadRequest(new { message = "Invalid login attempt" });

            var role = await _iuserRepository.GetRolesAsync(userExists);
            var token = _iuserService.GenerateJWTToken(userExists, role.First());
            return Ok(new
            {
                token,
                message = "User Login Successfully",
                role = role.FirstOrDefault()
            });
        }

        [HttpGet("Profile")]
        [Authorize]
        public async Task<IActionResult> GetProfile()
        {
            var user = await _iuserService.GetCurrentUser();
            if (user == null)
                return Unauthorized(new { message = "Invalid token or user not found" });

            var role = await _iuserRepository.GetRolesAsync(user);
            return Ok(new
            {
                user = new
                {
                    user.UserName,
                    user.Email,
                    user.Address,
                    user.Gender,
                    user.PhoneNumber,
                    user.UserImageUrl,
                    user.BirthDay,
                    Role = role.FirstOrDefault()
                }
            });
        }

        [HttpPut("ChangeProfile")]
        [Authorize]
        public async Task<IActionResult> ChangeProfile(ChangeProfileDto changeProfileDto)
        {
            if (changeProfileDto == null)
                return BadRequest(new { message = "Invalid request data" });

            var user = await _iuserService.GetCurrentUser();
            if (user == null)
                return Unauthorized(new { message = "Invalid token or user not found" });

            if (!string.IsNullOrEmpty(user.UserImageUrl) && user.UserImageUrl != changeProfileDto.profileImageUrl)
                await _icloudinaryService.DeleteCloudinaryImage(user.UserImageUrl);


            user.Address = changeProfileDto.address;
            if (!string.IsNullOrEmpty(changeProfileDto.birthDay))
            {
                user.BirthDay = DateOnly.Parse(changeProfileDto.birthDay);
            }
            user.Gender = changeProfileDto.gender;
            user.UserImageUrl = changeProfileDto.profileImageUrl;
            user.PhoneNumber = changeProfileDto.phoneNumber;

            var result = await _iuserRepository.UpdateUserAsync(user);
            if (!result.Succeeded)
                return BadRequest(new { message = "Failed to update profile" });

            return Ok(new
            {
                message = "Profile update successfully",
            }
            );
        }

        [HttpPost("Forgot-Password")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDto forgotPasswordDto)
        {
            var user = await _iuserRepository.FindByEmailAsync(forgotPasswordDto.email);
            if (user == null)
                return BadRequest(new { message = "User not found" });

            var resetToken = await _iuserRepository.GeneratePasswordResetTokenAsync(user);
            var body = await _iuserService.ForgotPasswordToken(resetToken);

            if (!string.IsNullOrEmpty(user.Email))
            {
                await _iemailService.SendEmailAsync(user.Email, "Reset Your Password", body);
            }

            return Ok(new
            {
                resetToken,
                message = "Password reset email sent successfully"
            });
        }

        [HttpPost("Reset-Password")]
        [AllowAnonymous]

        public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            if (string.IsNullOrEmpty(resetPasswordDto.token) || string.IsNullOrEmpty(resetPasswordDto.newPassword))
                return BadRequest(new { message = "Invalid request" });

            var decodedToken = Uri.UnescapeDataString(resetPasswordDto.token);

            var users = _iuserRepository.GetUsers();
            User? user = null;

            foreach (var _user in users)
            {
                var isValidToken = await _iuserRepository.VerifyResetTokenAsync(_user, decodedToken);

                if (isValidToken)
                {
                    user = _user;
                    break;
                }
            }

            if (user == null)
                return BadRequest(new { message = "Invalid or expired token" });

            var result = await _iuserRepository.ResetPasswordAsync(user, decodedToken, resetPasswordDto.newPassword);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new
            {
                message = "Password reset successful"
            });
        }

        [HttpGet("Get-Patient")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetPatient()
        {
            var user = await _iuserService.GetCurrentUser();
            if (user == null)
                return Unauthorized(new { message = "Invalid token or user not found" });

            var patients = await _iuserRepository.GetPatientsDetails();

            return Ok(
                new
                {
                    patients,
                    message = "Patient details received successfully"
                }
            );
        }

    }
}