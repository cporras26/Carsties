import { getDetailedViewData } from "@/app/actions/auctionActions";
import Heading from "@/app/components/Heading";
import CountdownTimer from "@/app/auctions/CountdownTimer";
import CarImage from "@/app/auctions/CarImage";
import DetailedSpecs from "@/app/auctions/details/[id]/DetailedSpecs";
import { getCurrentUser } from "@/app/actions/AuthActions";
import EditButton from "@/app/auctions/details/[id]/EditButton";
import DeleteButton from "@/app/auctions/details/[id]/DeleteButton";

export default async function Details({ params }: { params: { id: string } }) {
  const data = await getDetailedViewData(params.id);
  const user = await getCurrentUser();

  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading title={`${data.make} ${data.model}`} />
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold sm:text-base md:text-lg">
            Time remaining:
          </h3>
          <div className="text-xs sm:text-base">
            <CountdownTimer auctionEnd={data.auctionEnd} />
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-6">
        <div className="aspect-h-7 aspect-w-14 overflow-hidden rounded-lg bg-gray-200">
          <CarImage imageUrl={data.imageUrl} />
        </div>

        <div className="rounded-lg border-2 bg-gray-100 p-2">
          <Heading title="Bids" />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 rounded-lg">
        <DetailedSpecs auction={data} />
      </div>

      {user?.username === data.seller && (
        <div className="mt-3 flex justify-center gap-3 sm:justify-end">
          <EditButton id={data.id} />
          <DeleteButton id={data.id} />
        </div>
      )}
    </div>
  );
}
