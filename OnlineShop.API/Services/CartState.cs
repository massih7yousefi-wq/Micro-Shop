namespace OnlineShop.API.Services
{
        public class CartState
        {
            public event Action? OnChange;
            public void NotifyStateChanged()
            {
                OnChange?.Invoke();
            }
        }
}
