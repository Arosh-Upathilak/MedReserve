using backend.Dtos.Appointment;
using backend.Models;
using backend.Repository.AppointmentRepository;
using backend.Service.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentController : ControllerBase
    {
        private readonly IUserService _iuserService;
        private readonly IAppointmentRepository _appointmentRepository;

        public AppointmentController(IUserService iuserService, IAppointmentRepository appointmentRepository)
        {
            _iuserService = iuserService;
            _appointmentRepository = appointmentRepository;
        }

        [HttpPost("CreateAppointment")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateAppointment(CreateAppointmentDto createAppointmentDto)
        {
            var user = await _iuserService.GetCurrentUser();
            if (user == null)
                return Unauthorized(new { message = "Invalid token or user not found" });

            var appointment = new DoctorSchedule
            {
                DoctorId = createAppointmentDto.doctorId,
                Fee = createAppointmentDto.doctorFree,
                ScheduleTimes = createAppointmentDto.doctorAppointmentList.Select(doctorAppointment => new DoctorScheduleTime
                {
                    ScheduleDate = doctorAppointment.appointmentDate,
                    ScheduleTime = doctorAppointment.appointmentTime,
                    AllowedAppointments = doctorAppointment.appointmentSlot,
                }).ToList()
            };

            await _appointmentRepository.CreateAppointment(appointment);
            return Ok(new
            {
                message = "Doctor added successfully",
            });
        }

        [HttpGet("GetAppointment")]
        [Authorize]
        public async Task<IActionResult> GetAppointment()
        {
            var user = await _iuserService.GetCurrentUser();
            if (user == null)
                return Unauthorized(new { message = "Invalid token or user not found" });

            var appointments = await _appointmentRepository.GetAppointment();
            if (appointments == null)
                return Ok(new
                {
                    message = "Not Appointments registered yet"
                });

            return Ok(new
            {
                appointments,
                message = "Appointments details are getting successfully",
            });
        }

        [HttpGet("GetAppointment/{appointmentId}")]
        [Authorize]
        public async Task<IActionResult> GetAppointmentById(string appointmentId)
        {
            var user = await _iuserService.GetCurrentUser();
            if (user == null)
                return Unauthorized(new { message = "Invalid token or user not found" });

            var appointment = await _appointmentRepository.GetAppointmentById(appointmentId);
            if (appointment == null)
                return BadRequest();
            return Ok(new
            {
                appointment,
                message = "Appointment details is getting successfully",
            });
        }

        [HttpPut("UpdateAppointment/{appointmentId}")]
        [Authorize]
        public async Task<IActionResult> UpdateAppointmentById(string appointmentId, UpdateAppointmentDto updateAppointmentDto)
        {
            var user = await _iuserService.GetCurrentUser();

            if (user == null)
                return Unauthorized(new { message = "Invalid token or user not found" });
            Console.WriteLine(appointmentId);
            Console.WriteLine(updateAppointmentDto);


            var updateAppointment = new DoctorSchedule
            {
                DoctorId = updateAppointmentDto.doctorId,
                Fee = updateAppointmentDto.fee,
                ScheduleTimes = updateAppointmentDto.doctorAppointmentList.Select(doctorAppointment => new DoctorScheduleTime
                {
                    ScheduleDate = doctorAppointment.appointmentDate,
                    ScheduleTime = doctorAppointment.appointmentTime,
                    AllowedAppointments = doctorAppointment.appointmentSlot,
                }).ToList()
            };

            var appointment = await _appointmentRepository.UpdateAppointmentById(appointmentId, updateAppointment);
            if (appointment == null)
                return BadRequest();

            return Ok(new
            {
                message = "Appointment details update successfully",
            });
        }

        [HttpDelete("DeleteAppointment/{appointmentId}")]
        [Authorize]
        public async Task<IActionResult> DeleteAppointmentId(string appointmentId)
        {
            var user = await _iuserService.GetCurrentUser();
            if (user == null)
                return Unauthorized(new { message = "Invalid token or user not found" });

            var appointment = await _appointmentRepository.GetAppointmentById(appointmentId);
            if (appointment == null)
                return BadRequest();

            await _appointmentRepository.DeleteAppointmentId(appointmentId);

            return Ok(new
            {
                appointment,
                message = "Appointment delete successfully",
            });
        }

        [HttpGet("DoctorDetailsGetById/{doctorId}")]
        [Authorize]
        public async Task<IActionResult> DoctorAppointmentDetailsGetById(string doctorId)
        {
            var user = await _iuserService.GetCurrentUser();
            if (user == null)
                return Unauthorized(new { message = "Invalid token or user not found" });

            var doctor = await _appointmentRepository.DoctorAppointmentDetailsGetById(doctorId);
            if (doctor == null)
                return BadRequest();

            return Ok(new
            {
                doctor,
                message = "Appointment delete successfully",
            });
        }
    }
}