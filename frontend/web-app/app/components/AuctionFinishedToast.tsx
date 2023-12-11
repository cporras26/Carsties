import { Auction, AuctionFinished } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { numberWithCommas } from "@/app/lib/numberWithCommas";

type Props = {
  finishedAuction: AuctionFinished;
  auction: Auction;
};
export default function AuctionFinishedToast({
  auction,
  finishedAuction,
}: Props) {
  return (
    <Link
      href={`/auctions/details/${auction.id}`}
      className="flex flex-col items-center"
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          src={auction.imageUrl}
          alt="image"
          height={80}
          width={80}
          className="h-auto w-auto rounded-lg"
        />
        <div className="flex flex-col">
          <span className="text-sm">
            Auction for {auction.make} {auction.model} has finished
          </span>
          {finishedAuction.itemSold && finishedAuction.amount ? (
            <p className="text-xs">
              Congrats to {finishedAuction.winner} who was won this auction for
              ${numberWithCommas(finishedAuction.amount)}
            </p>
          ) : (
            <p className="text-xs">This item did not sell</p>
          )}
        </div>
      </div>
    </Link>
  );
}
