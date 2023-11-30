import Heading from "@/app/components/Heading";
import AuctionForm from "@/app/auctions/AuctionForm";
import { getDetailedViewData } from "@/app/actions/auctionActions";

export default async function Update({ params }: { params: { id: string } }) {
  const auction = await getDetailedViewData(params.id);
  return (
    <div className="mx-auto max-w-[75%] rounded-lg bg-white p-10 shadow-lg">
      <Heading
        title="Update your auction"
        subtitle="Please update the details of your car"
      />
      <AuctionForm auction={auction} />
    </div>
  );
}
