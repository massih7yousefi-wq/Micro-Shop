//using----------------------------
using OnlineShopBlozer.Services.Interfaces;
//Body--------------------------------
namespace OnlineShopBlozer.Services
{
    public class ToastService : IToastService
    {
        //OnShow---------------------------
        public event Action<string, string>? OnShow;
        //Show_Success----------------------
        public void ShowSuccess(string message) 
        {
            OnShow?.Invoke(message, "success");   
        }
        //Show_Error-------------------------
        public void ShowError(string message)
        {
            OnShow?.Invoke(message, "error");
        }
        //Show_Warning----------------------
        public void ShowWarning(string message)
        {
            OnShow?.Invoke(message, "warning"); 
        }
    }
}
