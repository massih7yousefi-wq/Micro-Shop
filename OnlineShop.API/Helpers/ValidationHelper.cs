using OnlineShop.API.Helpers;

namespace OnlineShop.API.Helpers
{
    public static class ValidationHelper
    {
        public static string ? ValidateName (string? name) 
            {
                if (string.IsNullOrWhiteSpace(name))
                    return ErrorMessages.NameRequired;
                 return null;
            }
        public static string? ValidatePrice(decimal price)
        {
                if(price <= 0)
                    return ErrorMessages.PriceMustBeGreaterThanZero;
                return null;
        }
        //Use:
        /*
         @*Error_add_form----------------------------------------*@
            @if (!string.IsNullOrEmpty(errorMessage))
            {
                    <p class="error-message">@errorMessage</p>    
              }
         */
        //-----------------------------------------------------
        /*
        var nameError =
                ValidationHelper.ValidateName(newProduct.Name);

        if (nameError != null)
        {
            errorMessage = nameError;
            return;
        }
        var PriceError =
                ValidationHelper.ValidatePrice(newProduct.Price);

        if (PriceError != null)
        {
            errorMessage = PriceError;
            return;
        }
        */
        //------------------------------------------------------------
        //Error_add--------------------------------------------------
        //private string errorMessage = "";

    }
}
