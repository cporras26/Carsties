"use client";

import { User } from "next-auth";
import { useBidStore } from "../../../../hooks/useBidStore";

// @ts-ignore
import { Auction, Bid } from "@/types";
import { useEffect, useState } from "react";
// @ts-ignore
import { getBidsForAuction } from "@/app/actions/auctionActions";
import toast from "react-hot-toast";
// @ts-ignore
import Heading from "@/app/components/Heading";
// @ts-ignore
import BidItem from "@/app/auctions/details/[id]/BidItem";
import { numberWithCommas } from "@/app/lib/numberWithCommas";
import EmptyFilter from "@/app/components/EmptyFilter";
import BidForm from "@/app/auctions/details/[id]/BidForm";

type Props = {
  user: User | null;
  auction: Auction;
};
export default function BidList({ user, auction }: Props) {
  const [loading, setLoading] = useState(true);
  const bids = useBidStore((state) => state.bids);
  const setBids = useBidStore((state) => state.setBids);
  const open = useBidStore((state) => state.open);
  const setOpen = useBidStore((state) => state.setOpen);
  const openForBids = new Date(auction.auctionEnd) > new Date();

  const highBid = bids.reduce(
    (prev, curr) =>
      prev > curr.amount
        ? prev
        : curr.bidStatus.includes("Accepted")
          ? curr.amount
          : prev,
    0,
  );

  useEffect(() => {
    getBidsForAuction(auction.id)
      .then((res: any) => {
        if (res.error) throw res.error;
        setBids(res as Bid[]);
      })
      .catch((err: any) => {
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  }, [auction.id, setLoading, setBids]);

  useEffect(() => {
    setOpen(openForBids);
  }, [openForBids, setOpen]);

  if (loading) return <span>Loading bids...</span>;

  return (
    <div className="rounded-lg shadow-md">
      <div className="h-64 bg-white px-4 py-2 sm:h-96 lg:h-[20rem] xl:h-96">
        <div className="sticky top-0 h-[15%] bg-white p-2">
          <Heading
            title={`Current high bid is $${numberWithCommas(highBid)}`}
          />
        </div>

        <div className="flex h-[70%] flex-col-reverse overflow-auto px-2">
          {bids.length === 0 ? (
            <EmptyFilter
              title="No bids for this item"
              subtitle="Please feel free to make a bid"
            />
          ) : (
            <>
              {bids.map((bid) => (
                <BidItem key={bid.id} bid={bid} />
              ))}
            </>
          )}
        </div>

        <div className="h-[15%] px-2 text-gray-500">
          {!open ? (
            <div className="flex items-center justify-center p-2 text-lg font-semibold">
              This auction has finished
            </div>
          ) : !user ? (
            <div className="flex items-center justify-center p-2 text-lg font-semibold">
              Please login to make a bid
            </div>
          ) : user && user.username === auction.seller ? (
            <div className="flex items-center justify-center p-2 text-lg font-semibold">
              You cannot bid on your own auction
            </div>
          ) : (
            <BidForm auctionId={auction.id} highBid={highBid} />
          )}
        </div>
      </div>
    </div>
  );
}
