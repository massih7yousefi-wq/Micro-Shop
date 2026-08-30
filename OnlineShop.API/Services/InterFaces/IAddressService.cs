using OnlineShop.API.Models;

namespace OnlineShop.API.Services.Interfaces
{
    public interface IAddressService
    {
        Task<IReadOnlyList<AddressResponse>> GetAllAsync(
            string userId);

        Task<AddressResponse?> GetAsync(
            string userId,
            int addressId);

        Task<AddressResponse> CreateAsync(
            string userId,
            CreateAddressModel model);

        Task<AddressResponse?> UpdateAsync(
            string userId,
            int addressId,
            UpdateAddressModel model);

        Task<bool> DeleteAsync(
            string userId,
            int addressId);

        Task<bool> SetDefaultAsync(
            string userId,
            int addressId);
    }
}
