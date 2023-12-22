"use client";

import { FieldValues, useForm } from "react-hook-form";
import { Button } from "flowbite-react";
import Input from "@/app/components/Input";
import { useEffect } from "react";
import DateInput from "@/app/components/DateInput";
import { createAuction, updateAuction } from "@/app/actions/auctionActions";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Auction } from "@/types";

type Props = {
  auction?: Auction;
};
export default function AuctionForm({ auction }: Props) {
  // prettier-ignore
  const { 
    control,
    handleSubmit,
    setFocus, 
      reset,
    formState: {isSubmitting, isValid}
  } = useForm({mode: "onTouched"});

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (auction) {
      const { make, model, color, mileage, year } = auction;
      reset({ make, model, color, mileage, year });
    }
    setFocus("make");
  }, [setFocus, auction, reset]);

  async function onSubmit(data: FieldValues) {
    try {
      let res;
      let id = "";

      if (pathname === "/auctions/create") {
        res = await createAuction(data);
        id = res.id;
      } else {
        if (auction) {
          res = await updateAuction(data, auction.id);
          id = auction.id;
        }
      }

      if (res.error) {
        throw res.error;
      }

      router.push(`/auctions/details/${id}`);
    } catch (error: any) {
      toast.error(`${error.status} ${error.message}`);
    }
  }

  return (
    <form className="mt-3 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Make"
        name="make"
        control={control}
        rules={{ required: "Make is required" }}
      />
      <Input
        label="Model"
        name="model"
        control={control}
        rules={{ required: "Model is required" }}
      />{" "}
      <Input
        label="Color"
        name="color"
        control={control}
        rules={{ required: "Color is required" }}
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Year"
          name="year"
          control={control}
          rules={{ required: "Year is required" }}
          type="number"
        />
        <Input
          label="Mileage"
          name="mileage"
          control={control}
          rules={{ required: "Mileage is required" }}
          type="number"
        />
      </div>
      {pathname === "/auctions/create" && (
        <>
          <Input
            label="Image URL"
            name="imageUrl"
            control={control}
            rules={{ required: "Image URL is required" }}
          />
          <Input
            label="Reserve Price (enter 0 if no reserve)"
            name="reservePrice"
            control={control}
            rules={{ required: "Reserve price is required" }}
            type="number"
          />
          <DateInput
            label="Auction end date/time"
            name="auctionEnd"
            control={control}
            rules={{ required: "Auction end date is required" }}
            dateFormat="dd MMMM yyyy h:mm a"
            showTimeSelect
          />
        </>
      )}
      <div className="flex justify-between">
        <Button outline color="gray">
          Cancel
        </Button>
        <Button
          isProcessing={isSubmitting}
          disabled={!isValid}
          type="submit"
          outline
          color="success"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
