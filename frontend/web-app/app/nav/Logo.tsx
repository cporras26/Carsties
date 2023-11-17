"use client";

import { useParamsStore } from "@/hooks/useParamsStore";

export default function Logo() {
  const reset = useParamsStore((state) => state.reset);
  return (
    <h1
      onClick={reset}
      className="flex cursor-pointer items-center gap-2 text-lg font-medium uppercase tracking-wider text-red-800 sm:text-xl md:text-2xl"
    >
      Carsties
    </h1>
  );
}
