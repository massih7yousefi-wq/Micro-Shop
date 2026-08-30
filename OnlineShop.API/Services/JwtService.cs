using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OnlineShop.API.Data;
using OnlineShop.API.Models;
using OnlineShop.API.Services.Interfaces;

namespace OnlineShop.API.Services
{
    public class JwtService : IJwtService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IDbContextFactory<AppDbContext> _dbContextFactory;
        private readonly IConfiguration _configuration;
        private readonly ILogger<JwtService> _logger;

        public JwtService(
            UserManager<AppUser> userManager,
            IDbContextFactory<AppDbContext> dbContextFactory,
            IConfiguration configuration,
            ILogger<JwtService> logger)
        {
            _userManager = userManager;
            _dbContextFactory = dbContextFactory;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<AuthResponse> GenerateTokenAsync(
            AppUser user)
        {
            var accessToken =
                await GenerateAccessTokenAsync(user);

            var refreshToken =
                GenerateSecureRefreshToken();

            var refreshTokenHash =
                HashRefreshToken(refreshToken);

            var refreshExpiresAt =
                DateTime.UtcNow.Add(
                    GetRefreshTokenLifetime());

            await using var db =
                await _dbContextFactory.CreateDbContextAsync();

            db.RefreshTokens.Add(
                new RefreshToken
                {
                    UserId = user.Id,
                    TokenHash = refreshTokenHash,
                    ExpiresAt = refreshExpiresAt,
                    CreatedAt = DateTime.UtcNow
                });

            await db.SaveChangesAsync();

            var roles =
                await _userManager.GetRolesAsync(user);

            var accessExpiresAt =
                DateTime.UtcNow.Add(
                    GetAccessTokenLifetime());

            return new AuthResponse
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                ExpiresAt = accessExpiresAt,
                UserId = user.Id,
                UserName = user.UserName ?? string.Empty,
                Email = user.Email ?? string.Empty,
                Roles = roles
            };
        }

        public async Task<AuthResponse?> RefreshTokenAsync(
            string refreshToken)
        {
            if (string.IsNullOrWhiteSpace(refreshToken))
            {
                return null;
            }

            var tokenHash =
                HashRefreshToken(refreshToken);

            await using var db =
                await _dbContextFactory.CreateDbContextAsync();

            var storedToken =
                await db.RefreshTokens
                    .Include(x => x.User)
                    .SingleOrDefaultAsync(
                        x => x.TokenHash == tokenHash);

            if (storedToken is null ||
                !storedToken.IsActive)
            {
                _logger.LogWarning(
                    "Invalid or inactive refresh token was used.");

                return null;
            }

            var user = storedToken.User;

            if (user is null)
            {
                return null;
            }

            var newAccessToken =
                await GenerateAccessTokenAsync(user);

            var newRefreshToken =
                GenerateSecureRefreshToken();

            var newRefreshTokenHash =
                HashRefreshToken(newRefreshToken);

            var newRefreshTokenEntity =
                new RefreshToken
                {
                    UserId = user.Id,
                    TokenHash = newRefreshTokenHash,
                    ExpiresAt =
                        DateTime.UtcNow.Add(
                            GetRefreshTokenLifetime()),
                    CreatedAt = DateTime.UtcNow
                };

            // Token Rotation
            storedToken.RevokedAt =
                DateTime.UtcNow;

            storedToken.ReplacedByTokenHash =
                newRefreshTokenHash;

            db.RefreshTokens.Add(
                newRefreshTokenEntity);

            await db.SaveChangesAsync();

            var roles =
                await _userManager.GetRolesAsync(user);

            var accessExpiresAt =
                DateTime.UtcNow.Add(
                    GetAccessTokenLifetime());

            _logger.LogInformation(
                "Refresh token rotated for user {UserId}.",
                user.Id);

            return new AuthResponse
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken,
                ExpiresAt = accessExpiresAt,
                UserId = user.Id,
                UserName = user.UserName ?? string.Empty,
                Email = user.Email ?? string.Empty,
                Roles = roles
            };
        }

        public async Task RevokeRefreshTokenAsync(
            string refreshToken)
        {
            if (string.IsNullOrWhiteSpace(refreshToken))
            {
                return;
            }

            var tokenHash =
                HashRefreshToken(refreshToken);

            await using var db =
                await _dbContextFactory.CreateDbContextAsync();

            var storedToken =
                await db.RefreshTokens
                    .SingleOrDefaultAsync(
                        x => x.TokenHash == tokenHash);

            if (storedToken is null ||
                storedToken.RevokedAt.HasValue)
            {
                return;
            }

            storedToken.RevokedAt =
                DateTime.UtcNow;

            await db.SaveChangesAsync();

            _logger.LogInformation(
                "Refresh token revoked for user {UserId}.",
                storedToken.UserId);
        }

        private async Task<string> GenerateAccessTokenAsync(
            AppUser user)
        {
            var jwtKey =
                GetRequiredConfiguration("Jwt:Key");

            var issuer =
                GetRequiredConfiguration("Jwt:Issuer");

            var audience =
                GetRequiredConfiguration("Jwt:Audience");

            var keyBytes =
                Encoding.UTF8.GetBytes(jwtKey);

            if (keyBytes.Length < 32)
            {
                throw new InvalidOperationException(
                    "Jwt:Key must be at least 32 bytes long.");
            }

            var roles =
                await _userManager.GetRolesAsync(user);

            var claims =
                new List<Claim>
                {
                    new(
                        JwtRegisteredClaimNames.Sub,
                        user.Id),

                    new(
                        JwtRegisteredClaimNames.UniqueName,
                        user.UserName ?? string.Empty),

                    new(
                        JwtRegisteredClaimNames.Email,
                        user.Email ?? string.Empty),

                    new(
                        ClaimTypes.NameIdentifier,
                        user.Id),

                    new(
                        ClaimTypes.Name,
                        user.UserName ?? string.Empty),

                    new(
                        ClaimTypes.Email,
                        user.Email ?? string.Empty)
                };

            foreach (var role in roles)
            {
                claims.Add(
                    new Claim(
                        ClaimTypes.Role,
                        role));
            }

            var key =
                new SymmetricSecurityKey(keyBytes);

            var credentials =
                new SigningCredentials(
                    key,
                    SecurityAlgorithms.HmacSha256);

            var expiresAt =
                DateTime.UtcNow.Add(
                    GetAccessTokenLifetime());

            var token =
                new JwtSecurityToken(
                    issuer: issuer,
                    audience: audience,
                    claims: claims,
                    notBefore: DateTime.UtcNow,
                    expires: expiresAt,
                    signingCredentials: credentials);

            return new JwtSecurityTokenHandler()
                .WriteToken(token);
        }

        private static string GenerateSecureRefreshToken()
        {
            var bytes =
                RandomNumberGenerator.GetBytes(64);

            return Convert.ToBase64String(bytes);
        }

        private static string HashRefreshToken(
            string refreshToken)
        {
            var bytes =
                Encoding.UTF8.GetBytes(refreshToken);

            var hash =
                SHA256.HashData(bytes);

            return Convert.ToHexString(hash);
        }

        private TimeSpan GetAccessTokenLifetime()
        {
            var minutes =
                _configuration.GetValue<int?>(
                    "Jwt:AccessTokenMinutes") ?? 60;

            if (minutes <= 0)
            {
                throw new InvalidOperationException(
                    "Jwt:AccessTokenMinutes must be greater than zero.");
            }

            return TimeSpan.FromMinutes(minutes);
        }

        private TimeSpan GetRefreshTokenLifetime()
        {
            var days =
                _configuration.GetValue<int?>(
                    "Jwt:RefreshTokenDays") ?? 7;

            if (days <= 0)
            {
                throw new InvalidOperationException(
                    "Jwt:RefreshTokenDays must be greater than zero.");
            }

            return TimeSpan.FromDays(days);
        }

        private string GetRequiredConfiguration(
            string key)
        {
            var value = _configuration[key];

            if (string.IsNullOrWhiteSpace(value))
            {
                throw new InvalidOperationException(
                    $"Configuration '{key}' is not configured.");
            }

            return value;
        }
    }
}
