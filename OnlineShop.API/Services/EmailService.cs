//usings-----------------------------------------
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using OnlineShop.API.Services.Interfaces;

namespace OnlineShop.API.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;
        //EmailService----------------------------------
        public EmailService(
            IConfiguration configuration,
            ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }
        //SendEmail------------------------------------
        public async Task SendEmailAsync(
            string to,
            string subject,
            string body)
        {
            var email =
                GetRequiredConfiguration("Email:Username");

            var password =
                GetRequiredConfiguration("Email:Password");

            var host =
                _configuration["Email:Host"]
                ?? "smtp.gmail.com";

            var port =
                _configuration
                    .GetValue<int?>("Email:Port")
                ?? 587;

            var message = new MimeMessage();

            message.From.Add(
                new MailboxAddress(
                    "MicroShop",
                    email));

            message.To.Add(
                MailboxAddress.Parse(to));

            message.Subject = subject;

            message.Body = new TextPart("html")
            {
                Text = body
            };

            using var smtp = new SmtpClient();

            try
            {
                await smtp.ConnectAsync(
                    host,
                    port,
                    SecureSocketOptions.StartTls);

                await smtp.AuthenticateAsync(
                    email,
                    password);

                await smtp.SendAsync(message);

                _logger.LogInformation(
                    "Email sent to {Email}.",
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
            finally
            {
                if (smtp.IsConnected)
                {
                    await smtp.DisconnectAsync(true);
                }
            }
        }
        //GetRequiredConfiguration----------------   
        private string GetRequiredConfiguration(
            string key)
        {
            var value = _configuration[key];

            if (string.IsNullOrWhiteSpace(value))
            {
                throw new InvalidOperationException(
                    $"{key} is not configured.");
            }

            return value;
        }
    }
}