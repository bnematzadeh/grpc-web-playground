using Grpc.Core;
using server;

namespace server.Services;

public class GreeterService : Greeter.GreeterBase
{
    private readonly ILogger<GreeterService> _logger;
    public GreeterService(ILogger<GreeterService> logger)
    {
        _logger = logger;
    }

    public override async Task<SearchUserResponse> SearchUser(SearchUserRequest request, ServerCallContext context)
    {
        // XSS
        var resp = new SearchUserResponse() { Message = request.Name };
        return await Task.FromResult(resp);
    }

    public override async Task<UserResponse> GetUsers(UserRequest request, ServerCallContext context)
    {
        // Information Disclosure
        var resp = new UserResponse() { Name = "admin", Email = "admin@gmail.com", Id = 1, Ssn = "secret" };
        return await Task.FromResult(resp);
    }

    public override async Task<UrlResponse> AddUrl(UrlRequest request, ServerCallContext context)
    {
        // Blind SSRF
        HttpClient client = new HttpClient();
        var resp = new UrlResponse() { Content = request.Url };
        HttpResponseMessage response = await client.GetAsync(request.Url);
        return await Task.FromResult(resp);
    }

    public override async Task<NumResponse> AddNum(NumRequest request, ServerCallContext context)
    {
        // integer overflow
        var resp = new NumResponse() { Result = unchecked(request.Number + 1) };
        return await Task.FromResult(resp);
    }
}