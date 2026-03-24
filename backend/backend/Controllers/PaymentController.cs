using Microsoft.AspNetCore.Mvc;
using Stripe;
using Microsoft.AspNetCore.Authorization;
using backend.Dtos.Payment;
using backend.Repository.AppointmentRepository;
using backend.Service.ExchangeRateService;
using backend.Service.QrService;
using backend.Repository.PaymentRepository;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IAppointmentRepository _appointmentRepository;
        private readonly IExchangeRateService _iexchangeRateService;
        private readonly IQrService _iqrService;
        private readonly IPaymentRepository _ipaymentRepository;

        public PaymentController(IConfiguration config, IAppointmentRepository appointmentRepository, IExchangeRateService exchangeRateService, IQrService qrService, IPaymentRepository paymentRepository)
        {
            var secretKey = config["Stripe:StripeSecretKey"]
                ?? throw new InvalidOperationException("StripeSecretKey not configured.");

            StripeConfiguration.ApiKey = secretKey;
            _appointmentRepository = appointmentRepository;
            _iexchangeRateService = exchangeRateService;
            _iqrService = qrService;
            _ipaymentRepository = paymentRepository;
        }

        [HttpPost("create-payment/{appointmentId}")]
        [Authorize]
        public async Task<IActionResult> CreatePaymentIntent([FromBody] PaymentRequestDto paymentRequestDto, string appointmentId)
        {
            decimal dollor = await _iexchangeRateService.GetUsdToLkrRateAsync();
            var appointment = await _appointmentRepository
                .GetAppointmentByAppointmentId(appointmentId);

            if (appointment == null)
                return NotFound(new { message = "Appointment not found" });

            if (appointment.CreatedAt < DateTime.UtcNow.AddMinutes(-150))
            {
                return BadRequest(new
                {
                    message = "Your time is exceeded"
                });
            }

            var options = new PaymentIntentCreateOptions
            {
                Amount = (long)(paymentRequestDto.Amount / dollor * 100),
                Currency = "usd",
                AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                {
                    Enabled = true,
                },
            };

            var service = new PaymentIntentService();
            var intent = service.Create(options);

            return Ok(new
            {
                clientSecret = intent.ClientSecret
            });
        }

        [HttpPost("confirm-payment/{appointmentId}")]
        [Authorize]
        public async Task<IActionResult> ConfirmPayment(string appointmentId)
        {
            var appointment = await _appointmentRepository.GetAppointmentByAppointmentId(appointmentId);

            if (appointment == null)
            {
                return NotFound(new { message = "Appointment not found" });
            }

            await _appointmentRepository.ChangeAppointmentStatusById(appointmentId);
            var qrText = $"Doctor: {appointment.DoctorName}\n" +
                 $"Appointment No: {appointment.AppointmentNumber}\n" +
                 $"Date: {appointment.ScheduleDate}\n" +
                 $"Time: {appointment.ScheduleTime}";

            var qrBytes = _iqrService.GenerateQrCode(qrText);
            var qrBase64 = Convert.ToBase64String(qrBytes);

            var savePayment = new Payment
            {
                AppointmentId = appointment.AppointmentId,
                Amount = appointment.Fee,
                Status = PaymentStatus.Paid,
                QrCode = qrBase64
            };

            var payment = await _ipaymentRepository.CreatePayment(savePayment);

            return Ok(new
            {
                paymentId = payment.PaymentId,
                message = "Payment successful and appointment confirmed"
            });
        }

        [HttpGet("get-qrCode/{paymentId}")]
        [Authorize]
        public async Task<IActionResult> GetQrCode(string paymentId)
        {
            var payment = await _ipaymentRepository.GetQrCode(paymentId);
            return Ok(new
            {
                payment,
                message = "QR code getting successful."
            });
        }

        [HttpGet("GetAllPaymentDetails")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllPaymentDetails()
        {
            var payments = await _ipaymentRepository.GetAllPaymentDetails();
            return Ok(new
            {
                payments,
                message = "All payment details getting successful."
            });
        }
    }
}