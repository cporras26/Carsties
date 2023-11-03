using System.Net;
using System.Net.Http.Json;
using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.IntegrationTests.Fixtures;
using AuctionService.IntegrationTests.Util;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace AuctionService.IntegrationTests;

[Collection("Shared collection")]
public class AuctionControllerTests : IAsyncLifetime
{
    private readonly CustomWebAppFactory _factory;
    private readonly HttpClient _httpClient;
    private const string GT_ID = "afbee524-5972-4075-8800-7d1f9d7b0a0c";

    public AuctionControllerTests(CustomWebAppFactory factory)
    {
        _factory = factory;
        _httpClient = factory.CreateClient();
    }

    [Fact]
    public async Task GetAuctions_ShouldReturn3Auctions()
    {
        // act
        var response = await _httpClient.GetFromJsonAsync<List<AuctionDto>>("api/auctions");
        
        // assert
        Assert.Equal(3, response.Count);
    }
    
    [Fact]
    public async Task GetAuctionById_WithValidId_ShouldReturnAuction()
    {
        // act
        var response = await _httpClient.GetFromJsonAsync<AuctionDto>($"api/auctions/{GT_ID}");
        
        // assert
        Assert.Equal("GT", response.Model);
    }
    
    [Fact]
    public async Task GetAuctionById_WithInvalidId_ShouldReturnNoContent()
    {
        // act
        var response = await _httpClient.GetAsync($"api/auctions/{Guid.NewGuid()}");
        
        // assert
        Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
    }
    
    [Fact]
    public async Task GetAuctionById_WithInvalidGuid_ShouldReturnBadRequest()
    {
        // act
        var response = await _httpClient.GetAsync($"api/auctions/notaguid");
        
        // assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }
    
    [Fact]
    public async Task CreateAuction_WithNoAuth_ShouldReturnUnAuthorized()
    {
        // arrange
        var auction = new CreateAuctionDto { Make = "test" };
        
        // act
        var response = await _httpClient.PostAsJsonAsync($"api/auctions", auction);
        
        // assert
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }
    
    [Fact]
    public async Task CreateAuction_WithAuth_ShouldReturnCreated()
    {
        // arrange
        var auction = GetAuctionForCreate();
        _httpClient.SetFakeJwtBearerToken(AuthHelper.GetBearerForUser("bob"));
        
        // act
        var response = await _httpClient.PostAsJsonAsync($"api/auctions", auction);
        
        // assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        
        var createdAuction = await response.Content.ReadFromJsonAsync<AuctionDto>();
        Assert.Equal("bob", createdAuction.Seller);
    }
    
    [Fact]
    public async Task CreateAuction_WithInvalidCreateAuctionDto_ShouldReturnBadRequest()
    {
        // arrange
        var auction = GetAuctionForCreate();
        auction.Make = null;
        _httpClient.SetFakeJwtBearerToken(AuthHelper.GetBearerForUser("bob"));
        
        // act
        var response = await _httpClient.PostAsJsonAsync($"api/auctions", auction);
        
        // assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }
    
    [Fact]
    public async Task UpdateAuction_WithValidUpdateDtoAndUser_ShouldReturnOk()
    {
        // arrange
        var auction = GetAuctionForUpdate();
        _httpClient.SetFakeJwtBearerToken(AuthHelper.GetBearerForUser("bob"));
        
        // act
        var response = await _httpClient.PutAsJsonAsync($"api/auctions/{GT_ID}", auction);
        
        // assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
    
    [Fact]
    public async Task UpdateAuction_WithValidUpdateDtoAndInvalidUser_ShouldReturnForbidden()
    {
        // arrange
        var auction = GetAuctionForUpdate();
        _httpClient.SetFakeJwtBearerToken(AuthHelper.GetBearerForUser("NotBob"));
        
        // act
        var response = await _httpClient.PutAsJsonAsync($"api/auctions/{GT_ID}", auction);
        
        // assert
        Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
    }
    
    public Task InitializeAsync() => Task.CompletedTask;

    public Task DisposeAsync()
    {
        using var scope = _factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AuctionDbContext>();
        DbHelper.ReinitDbForTests(db);
        return Task.CompletedTask;
    }

    private CreateAuctionDto GetAuctionForCreate()
    {
        return new CreateAuctionDto()
        {
            Make = "TestMake",
            Model = "TestModel",
            Color = "TestColor",
            ReservePrice = 10,
            Year = 10,
            Mileage = 10,
            ImageUrl = "TestImgUrl",
            AuctionEnd = DateTime.UtcNow
        };
    }
    
    private UpdateAuctionDto GetAuctionForUpdate()
    {
        return new UpdateAuctionDto()
        {
            Make = "TestUpdateMake",
            Model = "TestUpdateModel",
            Color = "TestUpdateColor",
            Year = 20,
            Mileage = 20,
        };
    }
}