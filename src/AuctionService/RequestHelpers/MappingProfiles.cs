using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;
using Contracts;

namespace AuctionService.RequestHelpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        //Mappings for GetAuctions
        CreateMap<Auction, AuctionDto>().IncludeMembers(x => x.Item);
        CreateMap<Item, AuctionDto>();
        
        //Mappings for CreateAuction
        CreateMap<CreateAuctionDto, Auction>()
        .ForMember(d => d.Item, o => o.MapFrom(s => s));
        CreateMap<CreateAuctionDto, Item>();
        
        //Mappings for UpdateAuction
        CreateMap<UpdateAuctionDto, Auction>()
            .ForMember(d => d.Item, o => o.MapFrom(s => s));
        CreateMap<int?, int>().ConvertUsing((src, dest) => src ?? dest);
        CreateMap<UpdateAuctionDto, Item>()
            .ForAllMembers(opts => opts.Condition((_, _, srcMember) => srcMember != null));

        // For rabbitMQ
        //For the CreateConsumer
        CreateMap<AuctionDto, AuctionCreated>();
        //For the UpdateConsumer
        CreateMap<Auction, AuctionUpdated>().IncludeMembers(x => x.Item);
        CreateMap<Item, AuctionUpdated>();
    }
}
