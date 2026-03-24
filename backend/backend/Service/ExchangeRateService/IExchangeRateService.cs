namespace backend.Service.ExchangeRateService
{
    public interface IExchangeRateService
    {
        Task<decimal> GetUsdToLkrRateAsync();
    }
}