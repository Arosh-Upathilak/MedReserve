using backend.Dtos.Doctor;
using backend.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Repository.DoctorRepository
{
    public interface IDoctorRepository
    {
        Task<Doctor> AddDoctorAsync(Doctor user);
        Task<List<Doctor>> GetAllDoctors();
        Task<Doctor?> GetDoctorById(Guid doctorId);
        Task SaveEditDoctor(Doctor doctor);
        Task DeleteDoctorById(Doctor doctor);
        Task<object> GetDoctorList();
    }
}