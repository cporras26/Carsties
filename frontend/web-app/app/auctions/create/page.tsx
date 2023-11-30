import Heading from "@/app/components/Heading";
import AuctionForm from "@/app/auctions/AuctionForm";

export default function Create() {
  return (
    <div className="mx-auto max-w-[95%] rounded-lg bg-white p-2 shadow-lg sm:max-w-[75%] sm:p-10">
      <Heading
        title="Sell your car!"
        subtitle="Please enter the details of your car"
      />
      <AuctionForm />
    </div>
  );
}
