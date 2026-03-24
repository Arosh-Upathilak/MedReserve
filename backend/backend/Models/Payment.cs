using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Payment
    {
        [Key]
        public Guid PaymentId { get; set; } = Guid.NewGuid();
        [Required]
        public Guid AppointmentId { get; set; }
        public Appointment? Appointment { get; set; }
        public decimal Amount { get; set; }
        public PaymentStatus Status { get; set; } = PaymentStatus.Pending;
        public string? QrCode { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
    public enum PaymentStatus
    {
        Pending,
        Paid,
        Cancelled,
    }
}