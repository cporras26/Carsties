﻿import { Auction } from "@/types";
import Link from "next/link";
import Image from "next/image";

type Props = {
  auction: Auction;
};
export default function AuctionCreatedToast({ auction }: Props) {
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
        <span className="text-sm">
          New Auction! {auction.make} {auction.model} has been added
        </span>
      </div>
    </Link>
  );
}
