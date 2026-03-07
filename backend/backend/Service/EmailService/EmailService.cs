using System.Net;
using System.Net.Mail;

namespace backend.Service.EmailService
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;
        public EmailService(IConfiguration config)
        {
            _config = config;
        }
        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            var host = _config["EmailSend:Host"] ?? throw new InvalidOperationException("Host not configured.");
            var port = int.Parse(_config["EmailSend:Port"] ?? throw new InvalidOperationException("Port not configured."));
            var enableSSL = bool.Parse(_config["EmailSend:EnableSSL"] ?? throw new InvalidOperationException("EnableSSL not configured."));
            var fromEmail = _config["EmailSend:FromEmail"] ?? throw new InvalidOperationException("FromEmail not configured.");
            var password = _config["EmailSend:Password"] ?? throw new InvalidOperationException("FromEmail not configured.");

            var client = new SmtpClient(host, port)
            {
                Credentials = new NetworkCredential(fromEmail, password),
                EnableSsl = enableSSL
            };

            var message = new MailMessage
            {
                From = new MailAddress(fromEmail),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };
            message.To.Add(toEmail);
            await client.SendMailAsync(message);
        }

    }
}