using AuctionService.Data;
using Contracts;
using MassTransit;

namespace AuctionService.Consumers;

public class BidPlacedConsumer : IConsumer<BidPlaced>
{
    private readonly AuctionDbContext _dbContext;

    public BidPlacedConsumer(AuctionDbContext _dbContext)
    {
        this._dbContext = _dbContext;
    }
    
    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        Console.WriteLine("--> Consuming bid placed");
        
        var auction = await _dbContext.Auctions.FindAsync(context.Message.Id);

        // Process if there is no current bid, or if the bid is accepted and
        // the value is higher that the current bid.
        if (auction.CurrentHighBid == null
            || (context.Message.BidStatus.Contains("Accepted")
                && context.Message.Amount > auction.CurrentHighBid))
        {
            auction.CurrentHighBid = context.Message.Amount;
        }

        await _dbContext.SaveChangesAsync();
    }
}