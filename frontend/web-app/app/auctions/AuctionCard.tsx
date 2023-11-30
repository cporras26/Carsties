import Image from "next/image";
import CountdownTimer from "@/app/auctions/CountdownTimer";
import CarImage from "@/app/auctions/CarImage";
import { Auction } from "@/types";
import Link from "next/link";

type Props = {
  auction: Auction;
};

export default function AuctionCard({ auction }: Props) {
  return (
    <Link href={`/auctions/details/${auction.id}`} className="group">
      <div className="aspect-h-9 aspect-w-16 overflow-hidden rounded-lg bg-gray-200">
        <div>
          <CarImage imageUrl={auction.imageUrl} />
          <div className="absolute bottom-0 right-0 text-[0.6rem] sm:text-xs lg:text-base">
            <CountdownTimer auctionEnd={auction.auctionEnd} />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm md:text-base">
        <h3 className="text-stone-700">
          {auction.make} {auction.model}
        </h3>
        <p className="font-semibold">{auction.year}</p>
      </div>
    </Link>
  );
}
