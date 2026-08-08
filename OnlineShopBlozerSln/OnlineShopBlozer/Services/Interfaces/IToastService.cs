namespace OnlineShopBlozer.Services.Interfaces
{
    public interface IToastService
    {
        event Action<string, string>? OnShow;
        void ShowSuccess(string message);
        void ShowError(string message);
        void ShowWarning(string message);
    }
}
