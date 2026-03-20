using System.ComponentModel.DataAnnotations;
using backend.Dtos.Doctor;
using backend.Models;
using backend.Repository.DoctorRepository;
using backend.Service.CloudinaryService;
using backend.Service.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorController : ControllerBase
    {
        private readonly IUserService _iuserService;
        private readonly ICloudinaryService _icloudinaryService;
        private readonly IDoctorRepository _idoctorRepository;
        public DoctorController(IUserService iuserService, ICloudinaryService icloudinaryService, IDoctorRepository idoctorRepository)
        {
            _icloudinaryService = icloudinaryService;
            _iuserService = iuserService;
            _idoctorRepository = idoctorRepository;
        }

        [HttpPost("AddDoctor")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddDoctor([FromBody] AddDoctorDto addDoctorDto)
        {
            if (addDoctorDto == null)
                return BadRequest(new { message = "Invalid request data" });

            var user = await _iuserService.GetCurrentUser();
            if (user == null)
                return Unauthorized(new { message = "Invalid token or user not found" });

            var newDoctor = new Doctor
            {
                DoctorName = addDoctorDto.doctorName,
                DoctorEmail = addDoctorDto.doctorEmail,
                Speciality = addDoctorDto.doctorSpeciality,
                Education = addDoctorDto.doctorEducation,
                Experience = addDoctorDto.doctorExperience,
                About = addDoctorDto.doctorAbout,
                DoctorImageUrl = addDoctorDto.doctorProfileLink,

            };

            await _idoctorRepository.AddDoctorAsync(newDoctor);

            return Ok(new
            {
                message = "Doctor added successfully",
            });
        }

        [HttpPut("EditDoctor/{doctorId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> EditDoctor([FromBody] EditDoctorDto editDoctor, Guid doctorId)
        {
            var user = await _iuserService.GetCurrentUser();
            if (user == null)
                return Unauthorized(new { message = "Invalid token or user not found" });

            var currentDoctor = await _idoctorRepository.GetDoctorById(doctorId);

            if (currentDoctor == null)
                return NotFound(new { message = "Doctor not found" });

            if (!string.IsNullOrEmpty(currentDoctor.DoctorImageUrl) && currentDoctor.DoctorImageUrl != editDoctor.doctorProfileLink)
                await _icloudinaryService.DeleteCloudinaryImage(currentDoctor.DoctorImageUrl);

            currentDoctor.DoctorImageUrl = editDoctor.doctorProfileLink;
            currentDoctor.DoctorName = editDoctor.doctorName ?? "";
            currentDoctor.DoctorEmail = editDoctor.doctorEmail ?? "";
            currentDoctor.About = editDoctor.doctorAbout;
            currentDoctor.Education = editDoctor.doctorEducation ?? "";
            currentDoctor.Experience = editDoctor.doctorExperience;
            currentDoctor.Speciality = editDoctor.doctorSpeciality;

            await _idoctorRepository.SaveEditDoctor(currentDoctor);

            return Ok(new
            {
                message = "Doctor edited successfully",
            });
        }

        [HttpDelete("DeleteDoctor/{doctorId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteDoctor(Guid doctorId)
        {
            var user = await _iuserService.GetCurrentUser();
            if (user == null)
                return Unauthorized(new { message = "Invalid token or user not found" });

            var currentDoctor = await _idoctorRepository.GetDoctorById(doctorId);

            if (currentDoctor == null)
                return NotFound(new { message = "Doctor not found" });

            await _idoctorRepository.DeleteDoctorById(currentDoctor);

            return Ok(new
            {
                message = "Doctor deleted successfully",
            });
        }

        [HttpGet("GetDoctors")]
        [Authorize]
        public async Task<IActionResult> GetDoctors()
        {
            var user = await _iuserService.GetCurrentUser();
            if (user == null)
                return Unauthorized(new { message = "Invalid token or user not found" });

            var doctors = await _idoctorRepository.GetAllDoctors();
            return Ok(new
            {
                doctors,
                message = "Doctors details getting successfully",
            });
        }

        [HttpGet("GetDoctor/{doctorId}")]
        [Authorize]
        public async Task<IActionResult> GetDoctor(Guid doctorId)
        {
            var user = await _iuserService.GetCurrentUser();
            if (user == null)
                return Unauthorized(new { message = "Invalid token or user not found" });

            var currentDoctor = await _idoctorRepository.GetDoctorById(doctorId);
            return Ok(new
            {
                currentDoctor,
                message = "Doctor details getting successfully",
            });
        }

        [HttpGet("GetDoctorList")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetDoctorList()
        {
            var user = await _iuserService.GetCurrentUser();
            if (user == null)
                return Unauthorized(new { message = "Invalid token or user not found" });

            var doctorList = await _idoctorRepository.GetDoctorList();
            return Ok(new
            {
                doctorList,
                message = "Doctor list getting successfully",
            });
        }
    }
}