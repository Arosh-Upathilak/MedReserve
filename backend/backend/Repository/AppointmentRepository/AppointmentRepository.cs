using backend.Data;
using backend.Dtos.Appointment;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository.AppointmentRepository
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public AppointmentRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        public async Task<DoctorSchedule> CreateAppointment(DoctorSchedule doctorSchedule)
        {
            await _applicationDbContext.DoctorSchedules.AddAsync(doctorSchedule);
            await _applicationDbContext.SaveChangesAsync();
            return doctorSchedule;
        }

        public async Task<object> GetAppointment()
        {
            return await _applicationDbContext.DoctorSchedules
                .Select(doctorSchedule => new
                {
                    doctorSchedule.DoctorScheduleId,
                    doctorSchedule.DoctorId,
                    doctorName = doctorSchedule.Doctor!.DoctorName,
                    doctorSchedule.Fee,
                    doctorScheduleTimes = doctorSchedule.ScheduleTimes.Select(scheduleTimes => new
                    {
                        scheduleTimes.ScheduleDate,
                        scheduleTimes.ScheduleTime,
                        scheduleTimes.AllowedAppointments,
                    }).ToList()
                })
                .ToListAsync();
        }

        public async Task<object?> GetAppointmentById(string appointmentId)
        {
            return await _applicationDbContext.DoctorSchedules.Where(doctorSchedule => doctorSchedule.DoctorScheduleId.ToString() == appointmentId)
                .Select(doctorSchedule => new
                {
                    doctorSchedule.DoctorScheduleId,
                    doctorSchedule.DoctorId,
                    doctorName = doctorSchedule.Doctor!.DoctorName,
                    doctorSchedule.Fee,
                    doctorScheduleTimes = doctorSchedule.ScheduleTimes.Select(scheduleTimes => new
                    {
                        scheduleTimes.ScheduleDate,
                        scheduleTimes.ScheduleTime,
                        scheduleTimes.AllowedAppointments,
                    }).ToList()
                }).FirstOrDefaultAsync();
        }

        public async Task<object?> UpdateAppointmentById(string appointmentId, DoctorSchedule doctorSchedule)
        {
            var existingAppointment = await _applicationDbContext.DoctorSchedules
                .Include(ds => ds.ScheduleTimes)
                .FirstOrDefaultAsync(ds => ds.DoctorScheduleId.ToString() == appointmentId);

            if (existingAppointment == null)
                return null;

            existingAppointment.DoctorId = doctorSchedule.DoctorId;
            existingAppointment.Fee = doctorSchedule.Fee;
            _applicationDbContext.DoctorScheduleTimes.RemoveRange(existingAppointment.ScheduleTimes);
            await _applicationDbContext.SaveChangesAsync();

            foreach (var schedule in doctorSchedule.ScheduleTimes)
            {
                var newEntity = new DoctorScheduleTime
                {
                    DoctorScheduleTimeId = Guid.NewGuid(),
                    DoctorScheduleId = existingAppointment.DoctorScheduleId,
                    ScheduleDate = schedule.ScheduleDate,
                    ScheduleTime = schedule.ScheduleTime,
                    AllowedAppointments = schedule.AllowedAppointments,
                    CreatedAt = DateTime.UtcNow
                };

                await _applicationDbContext.DoctorScheduleTimes.AddAsync(newEntity);
            }
            await _applicationDbContext.SaveChangesAsync();

            return new
            {
                existingAppointment.DoctorScheduleId,
                existingAppointment.DoctorId,
                existingAppointment.Fee,
                ScheduleTimes = existingAppointment.ScheduleTimes.Select(st => new
                {
                    st.ScheduleDate,
                    st.ScheduleTime,
                    st.AllowedAppointments
                })
            };
        }

        public async Task DeleteAppointmentId(string appointmentId)
        {
            var existingAppointment = await _applicationDbContext.DoctorSchedules
                .Include(ds => ds.ScheduleTimes)
                .FirstOrDefaultAsync(ds => ds.DoctorScheduleId.ToString() == appointmentId);

            if (existingAppointment == null)
                throw new KeyNotFoundException("Appointment not found");
            _applicationDbContext.DoctorScheduleTimes.RemoveRange(existingAppointment.ScheduleTimes);
            _applicationDbContext.DoctorSchedules.Remove(existingAppointment);
            await _applicationDbContext.SaveChangesAsync();
        }

        public async Task<object?> DoctorAppointmentDetailsGetById(string doctorId)
        {
            return await _applicationDbContext.Doctors
                .Where(d => d.DoctorId.ToString() == doctorId)
                .Select(d => new
                {
                    d.DoctorId,
                    d.DoctorName,
                    d.DoctorEmail,
                    d.Speciality,
                    d.Education,
                    d.Experience,
                    d.About,
                    d.DoctorImageUrl,

                    schedules = d.Schedules!.Select(s => new
                    {
                        s.DoctorScheduleId,
                        s.Fee,
                        scheduleTimes = s.ScheduleTimes.Select(st => new
                        {
                            bookedAppointments = _applicationDbContext.Appointments
                                .Where(a => a.DoctorScheduleTimeId == st.DoctorScheduleTimeId)
                                .Select(a => (int?)a.AppointmentNumber)
                                .Max() ?? 0,
                            st.DoctorScheduleTimeId,
                            st.ScheduleDate,
                            st.ScheduleTime,
                            st.AllowedAppointments
                        }).ToList(),

                    }).ToList()
                })
                .FirstOrDefaultAsync();
        }

        public async Task<Appointment> SaveDoctorAppointment(Appointment appointment)
        {
            var maxNumber = await _applicationDbContext.Appointments
                .Where(a => a.DoctorScheduleTimeId == appointment.DoctorScheduleTimeId)
                .Select(a => (int?)a.AppointmentNumber)
                .MaxAsync() ?? 0;

            appointment.AppointmentNumber = maxNumber + 1;

            await _applicationDbContext.Appointments.AddAsync(appointment);
            await _applicationDbContext.SaveChangesAsync();
            return appointment;
        }

        public async Task<object> GetDoctorAppointmentByUserId(string userId)
        {
            return await _applicationDbContext.Appointments.Where(appointment => appointment.UserId == userId)
                .Select(appointment => new
                {
                    appointment.AppointmentId,
                    appointment.DoctorId,
                    appointment.Doctor!.DoctorName,
                    appointment.Doctor!.DoctorImageUrl,
                    appointment.DoctorScheduleTimeId,
                    appointment.AppointmentNumber,
                    appointment.Fee,
                    appointment.Status,
                    appointment.DoctorScheduleTime!.ScheduleDate,
                    appointment.DoctorScheduleTime!.ScheduleTime,
                    appointment.CreatedAt,
                    paymentId = appointment.Payment != null ? appointment.Payment.PaymentId : (Guid?)null
                }).ToListAsync();
        }

        public async Task DeleteDoctorAppointment(string appointmentId)
        {
            var existingAppointment = await _applicationDbContext.Appointments
                    .FirstOrDefaultAsync(a => a.AppointmentId == Guid.Parse(appointmentId));

            if (existingAppointment == null)
                throw new KeyNotFoundException("Appointment not found");

            if (existingAppointment.Status == AppointmentStatus.Completed)
                throw new Exception("You cannot delete because you already paid for this");

            _applicationDbContext.Appointments.Remove(existingAppointment);
            await _applicationDbContext.SaveChangesAsync();
        }

        public async Task<AppointmentAllDetailsDto?> GetAppointmentByAppointmentId(string appointmentId)
        {
            return await _applicationDbContext.Appointments
                .Where(a => a.AppointmentId == Guid.Parse(appointmentId))
                .Select(a => new AppointmentAllDetailsDto
                {
                    AppointmentId = a.AppointmentId,
                    DoctorId = a.DoctorId,
                    DoctorName = a.Doctor!.DoctorName,
                    DoctorImageUrl = a.Doctor!.DoctorImageUrl,
                    Speciality = a.Doctor.Speciality,
                    DoctorScheduleTimeId = a.DoctorScheduleTimeId,
                    AppointmentNumber = a.AppointmentNumber,
                    Fee = a.Fee,
                    Status = a.Status.ToString(),
                    ScheduleDate = a.DoctorScheduleTime!.ScheduleDate,
                    ScheduleTime = a.DoctorScheduleTime.ScheduleTime,
                    CreatedAt = a.CreatedAt
                })
                .FirstOrDefaultAsync();
        }

        public async Task<Appointment> ChangeAppointmentStatusById(string appointmentId)
        {
            var id = Guid.Parse(appointmentId);
            var appointment = await _applicationDbContext.Appointments
                .FirstOrDefaultAsync(a => a.AppointmentId == id);

            if (appointment == null)
                throw new Exception("Appointment not found");

            appointment.Status = AppointmentStatus.Completed;
            await _applicationDbContext.SaveChangesAsync();
            return appointment;
        }
    }
}