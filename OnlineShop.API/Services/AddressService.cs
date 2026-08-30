//usings--------------------------------
using Microsoft.EntityFrameworkCore;
using OnlineShop.API.Data;
using OnlineShop.API.Models;
using OnlineShop.API.Services.Interfaces;

namespace OnlineShop.API.Services
{
    public class AddressService : IAddressService
    {
        private readonly AppDbContext _dbContext;

        public AddressService(
            AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        //GetAll--------------------------------------------------
        public async Task<IReadOnlyList<AddressResponse>> GetAllAsync(
            string userId)
        {
            return await _dbContext.UserAddresses
                .AsNoTracking()
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.IsDefault)
                .ThenByDescending(x => x.CreatedAt)
                .Select(x => new AddressResponse
                {
                    Id = x.Id,
                    RecipientName = x.RecipientName,
                    RecipientPhone = x.RecipientPhone,
                    AddressLine = x.AddressLine,
                    City = x.City,
                    State = x.State,
                    PostalCode = x.PostalCode,
                    IsDefault = x.IsDefault
                })
                .ToListAsync();
        }
        //Get-------------------------------------------
        public async Task<AddressResponse?> GetAsync(
            string userId,
            int addressId)
        {
            return await _dbContext.UserAddresses
                .AsNoTracking()
                .Where(x =>
                    x.Id == addressId &&
                    x.UserId == userId)
                .Select(x => new AddressResponse
                {
                    Id = x.Id,
                    RecipientName = x.RecipientName,
                    RecipientPhone = x.RecipientPhone,
                    AddressLine = x.AddressLine,
                    City = x.City,
                    State = x.State,
                    PostalCode = x.PostalCode,
                    IsDefault = x.IsDefault
                })
                .FirstOrDefaultAsync();
        }
        //Create---------------------------------------
        public async Task<AddressResponse> CreateAsync(
            string userId,
            CreateAddressModel model)
        {
            if (model.IsDefault)
            {
                await ClearDefaultAsync(userId);
            }

            var hasAnyAddress =
                await _dbContext.UserAddresses
                    .AnyAsync(x => x.UserId == userId);

            var address = new UserAddress
            {
                UserId = userId,
                RecipientName = model.RecipientName.Trim(),
                RecipientPhone = model.RecipientPhone.Trim(),
                AddressLine = model.AddressLine.Trim(),
                City = model.City.Trim(),
                State = model.State.Trim(),
                PostalCode = model.PostalCode.Trim(),
                IsDefault = model.IsDefault || !hasAnyAddress
            };

            _dbContext.UserAddresses.Add(address);

            await _dbContext.SaveChangesAsync();

            return Map(address);
        }
        //Update---------------------------------
        public async Task<AddressResponse?> UpdateAsync(
            string userId,
            int addressId,
            UpdateAddressModel model)
        {
            var address =
                await _dbContext.UserAddresses
                    .FirstOrDefaultAsync(x =>
                        x.Id == addressId &&
                        x.UserId == userId);

            if (address is null)
            {
                return null;
            }

            if (model.IsDefault)
            {
                await ClearDefaultAsync(
                    userId,
                    addressId);
            }

            address.RecipientName =
                model.RecipientName.Trim();

            address.RecipientPhone =
                model.RecipientPhone.Trim();

            address.AddressLine =
                model.AddressLine.Trim();

            address.City =
                model.City.Trim();

            address.State =
                model.State.Trim();

            address.PostalCode =
                model.PostalCode.Trim();

            address.IsDefault =
                model.IsDefault;

            address.UpdatedAt =
                DateTime.UtcNow;

            await _dbContext.SaveChangesAsync();

            return Map(address);
        }
        //Delete---------------------------------
        public async Task<bool> DeleteAsync(
            string userId,
            int addressId)
        {
            var address =
                await _dbContext.UserAddresses
                    .FirstOrDefaultAsync(x =>
                        x.Id == addressId &&
                        x.UserId == userId);

            if (address is null)
            {
                return false;
            }

            var wasDefault =
                address.IsDefault;

            _dbContext.UserAddresses.Remove(address);

            await _dbContext.SaveChangesAsync();

            if (wasDefault)
            {
                var replacement =
                    await _dbContext.UserAddresses
                        .Where(x => x.UserId == userId)
                        .OrderByDescending(x => x.CreatedAt)
                        .FirstOrDefaultAsync();

                if (replacement is not null)
                {
                    replacement.IsDefault = true;

                    await _dbContext.SaveChangesAsync();
                }
            }

            return true;
        }
        //SetDefault-----------------------------
        public async Task<bool> SetDefaultAsync(
            string userId,
            int addressId)
        {
            var address =
                await _dbContext.UserAddresses
                    .FirstOrDefaultAsync(x =>
                        x.Id == addressId &&
                        x.UserId == userId);

            if (address is null)
            {
                return false;
            }

            await ClearDefaultAsync(
                userId,
                addressId);

            address.IsDefault = true;

            await _dbContext.SaveChangesAsync();

            return true;
        }
        //ClearDefault------------------------
        private async Task ClearDefaultAsync(
            string userId,
            int? exceptAddressId = null)
        {
            var addresses =
                await _dbContext.UserAddresses
                    .Where(x =>
                        x.UserId == userId &&
                        x.IsDefault &&
                        (!exceptAddressId.HasValue ||
                         x.Id != exceptAddressId.Value))
                    .ToListAsync();

            foreach (var address in addresses)
            {
                address.IsDefault = false;
            }
        }
        //Map------------------------------------
        private static AddressResponse Map(
            UserAddress address)
        {
            return new AddressResponse
            {
                Id = address.Id,
                RecipientName =
                    address.RecipientName,
                RecipientPhone =
                    address.RecipientPhone,
                AddressLine =
                    address.AddressLine,
                City =
                    address.City,
                State =
                    address.State,
                PostalCode =
                    address.PostalCode,
                IsDefault =
                    address.IsDefault
            };
        }
    }
}