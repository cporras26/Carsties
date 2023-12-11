type Props = {
  amount?: number;
  reservePrice: number;
};
export default function CurrentBid({ amount, reservePrice }: Props) {
  const text = amount ? "$" + amount : "No bids";
  const color = amount
    ? amount > reservePrice
      ? "bg-green-600"
      : "bg-amber-600"
    : "bg-red-600";
  return (
    <div
      className={`flex justify-center rounded-lg border-2 border-white px-2 py-1
  text-white ${color}`}
    >
      {text}
    </div>
  );
}
