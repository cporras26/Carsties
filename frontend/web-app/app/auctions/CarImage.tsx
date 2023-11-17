"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  imageUrl: string;
};
export default function CarImage({ imageUrl }: Props) {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      src={imageUrl}
      alt="image"
      fill
      priority
      className={`object-cover duration-700 ease-in-out group-hover:opacity-75 
      ${
        isLoading
          ? "scale-110 blur-2xl grayscale"
          : "scale-100 blur-0 grayscale-0"
      }`}
      onLoadingComplete={() => setLoading(false)}
    />
  );
}
