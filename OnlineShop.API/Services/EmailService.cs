// Usings ---------------------------------------------------------
using OnlineShop.API.Services.Interfaces;
using Resend;

namespace OnlineShop.API.Services
{
    public class EmailService : IEmailService
    {
        private readonly IResend _resend;
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;


        // EmailService --------------------------------------------
        public EmailService(
            IResend resend,
            IConfiguration configuration,
            ILogger<EmailService> logger)
        {
            _resend = resend;
            _configuration = configuration;
            _logger = logger;
        }


        // SendEmail ----------------------------------------------
        public async Task SendEmailAsync(
            string to,
            string subject,
            string body)
        {
            var fromEmail =
                GetRequiredConfiguration(
                    "Resend:FromEmail");


            try
            {
                var message =
                    new EmailMessage();

                message.From =
                    $"MicroShop <{fromEmail}>";

                message.To.Add(to);

                message.Subject =
                    subject;

                message.HtmlBody =
                    body;


                await _resend.EmailSendAsync(
                    message);


                _logger.LogInformation(
                    "Email sent successfully to {Email}.",
                    to);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Failed to send email to {Email}.",
                    to);

                throw;
            }
        }


        // GetRequiredConfiguration ------------------------------
        private string GetRequiredConfiguration(
            string key)
        {
            var value =
                _configuration[key];

            if (string.IsNullOrWhiteSpace(value))
            {
                throw new InvalidOperationException(
                    $"{key} is not configured.");
            }

            return value;
        }
    }
}