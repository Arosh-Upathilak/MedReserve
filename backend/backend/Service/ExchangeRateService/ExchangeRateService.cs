using System.Net.Http;
using System.Text.Json;

namespace backend.Service.ExchangeRateService
{
    public class ExchangeRateService : IExchangeRateService
    {
        private readonly HttpClient _httpClient;

        public ExchangeRateService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<decimal> GetUsdToLkrRateAsync()
        {
            var response = await _httpClient.GetAsync("https://api.exchangerate-api.com/v4/latest/USD");
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();

            using var doc = JsonDocument.Parse(json);
            var rate = doc.RootElement
                          .GetProperty("rates")
                          .GetProperty("LKR")
                          .GetDecimal();

            return rate;
        }
    }

}