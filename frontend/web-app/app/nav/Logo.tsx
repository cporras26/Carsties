"use client";

import { useParamsStore } from "@/hooks/useParamsStore";
import { usePathname, useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();
  const pathname = usePathname();

  const reset = useParamsStore((state) => state.reset);

  function doReset() {
    if (pathname !== "/") router.push("/");
    reset();
  }

  return (
    <h1
      onClick={doReset}
      className="flex cursor-pointer items-center gap-2 text-lg font-medium uppercase tracking-wider text-red-800 sm:text-xl md:text-2xl"
    >
      Carsties
    </h1>
  );
}
