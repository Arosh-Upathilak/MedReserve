using backend.Data;
using backend.Dtos.Doctor;
using backend.Models;
using backend.Service.CloudinaryService;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository.DoctorRepository
{
    public class DoctorRepository : IDoctorRepository
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly ICloudinaryService _icloudinaryService;
        public DoctorRepository(ApplicationDbContext applicationDbContext,ICloudinaryService icloudinaryService)
        {
            _applicationDbContext = applicationDbContext;
            _icloudinaryService = icloudinaryService;
        }
        public async Task<Doctor> AddDoctorAsync(Doctor doctor)
        {
            await _applicationDbContext.Doctors.AddAsync(doctor);
            await _applicationDbContext.SaveChangesAsync();
            return doctor;
        }

        public async Task<List<Doctor>> GetAllDoctors()
        {
            return await _applicationDbContext.Doctors.ToListAsync();
        }

        public async Task<Doctor?> GetDoctorById(Guid doctorId)
        {
            var doctor = await _applicationDbContext.Doctors.FindAsync(doctorId);

            if (doctor == null)
                throw new Exception("Doctor not found");

            return doctor;
        }

        public async Task SaveEditDoctor(Doctor doctor)
        {
            _applicationDbContext.Doctors.Update(doctor);
            await _applicationDbContext.SaveChangesAsync();

        }

        public async Task DeleteDoctorById(Doctor doctor)
        {
            if(!string.IsNullOrEmpty(doctor.DoctorImageUrl))
                await _icloudinaryService.DeleteCloudinaryImage(doctor.DoctorImageUrl);
            _applicationDbContext.Doctors.Remove(doctor);
            await _applicationDbContext.SaveChangesAsync();
        }

    }
}