using backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<DoctorSchedule> DoctorSchedules { get; set; }
        public DbSet<DoctorScheduleTime> DoctorScheduleTimes { get; set; }
        public DbSet<Payment> Payments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Doctor>()
                .HasMany(doctor => doctor.Schedules)
                .WithOne(schedule => schedule.Doctor)
                .HasForeignKey(schedule => schedule.DoctorId)
                .OnDelete(DeleteBehavior.Cascade);


            builder.Entity<DoctorSchedule>()
                .HasMany(doctorSchedule => doctorSchedule.ScheduleTimes)
                .WithOne(doctorScheduleTime => doctorScheduleTime.DoctorSchedule)
                .HasForeignKey(doctorScheduleTime => doctorScheduleTime.DoctorScheduleId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Appointment>()
                .HasOne(doctorScheduleTime => doctorScheduleTime.DoctorScheduleTime)
                .WithMany()
                .HasForeignKey(doctorScheduleTime => doctorScheduleTime.DoctorScheduleTimeId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Appointment>()
                .HasOne(doctor => doctor.Doctor)
                .WithMany()
                .HasForeignKey(doctor => doctor.DoctorId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Appointment>()
                .HasOne(user => user.User)
                .WithMany()
                .HasForeignKey(user => user.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Payment>()
                .HasOne(payment => payment.Appointment)
                .WithOne()
                .HasForeignKey<Payment>(payment => payment.AppointmentId)
                .OnDelete(DeleteBehavior.Cascade);
        }

    }
}