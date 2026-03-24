using backend.Service.AppointmentService;

public class AppointmentCleanupWorker : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;

    public AppointmentCleanupWorker(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                var appointmentService = scope.ServiceProvider
                    .GetRequiredService<IAppointmentService>();

                await appointmentService.RemoveExpiredAppointments();
            }
            await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
        }
    }
}