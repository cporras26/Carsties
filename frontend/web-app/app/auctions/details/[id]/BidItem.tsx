// @ts-ignore
import { Bid } from "@/types";
import { format } from "date-fns";
import { numberWithCommas } from "@/app/lib/numberWithCommas";

type Props = {
  bid: Bid;
};
export default function BidItem({ bid }: Props) {
  function getBidInfo() {
    let bgColor = "";
    let text = "";

    switch (bid.bidStatus) {
      case "Accepted":
        bgColor = "bg-green-200";
        text = "Bid accepted";
        break;
      case "AcceptedBelowReserve":
        bgColor = "bg-amber-500";
        text = "Reserve not met";
        break;
      case "TooLow":
        bgColor = "bg-red-200";
        text = "Bid was too low";
        break;
      default:
        bgColor = "bg-red-200";
        text = "Bid placed after auction finished";
    }
    return { bgColor, text };
  }
  return (
    <div
      className={`
    mb-2 flex items-center justify-between rounded-lg 
    border-2 border-gray-200 px-3 py-2
    ${getBidInfo().bgColor}
  `}
    >
      <div className="flex flex-col">
        <span>Bidder: {bid.bidder}</span>
        <span className="text-xs text-gray-700 sm:text-sm">
          Time: {format(new Date(bid.bidTime), "dd MMM yyyy h:mm a")}
        </span>
      </div>
      <div className="flex flex-col text-right">
        <div className="font-semibold">${numberWithCommas(bid.amount)}</div>
        <div className="flex flex-row items-center text-sm">
          <span>{getBidInfo().text}</span>
        </div>
      </div>
    </div>
  );
}
