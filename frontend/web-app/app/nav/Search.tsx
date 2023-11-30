"use client";

import { FaSearch } from "react-icons/fa";
import { useParamsStore } from "@/hooks/useParamsStore";
import { usePathname, useRouter } from "next/navigation";

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();

  const setParams = useParamsStore((state) => state.setParams);

  const searchValue = useParamsStore((state) => state.searchValue);
  const setSearchValue = useParamsStore((state) => state.setSearchValue);

  function onChange(event: any) {
    setSearchValue(event.target.value);
  }

  function search() {
    if (pathname !== "/") router.push("/");

    setParams({ searchTerm: searchValue });
  }

  return (
    <div className="order-1 flex w-full items-center rounded-full border-2 shadow-sm sm:order-none sm:w-[50%] md:py-1">
      <input
        onKeyDown={(e: any) => {
          if (e.key === "Enter") search();
        }}
        value={searchValue}
        onChange={onChange}
        type="text"
        placeholder="Search for cars by make, model or color"
        className="flex-grow border-transparent bg-transparent pl-3 text-xs text-gray-600 focus:border-transparent focus:outline-none focus:ring-0 md:pl-4 md:text-sm"
      />
      <button onClick={search}>
        <FaSearch
          size=""
          className="mx-2 cursor-pointer rounded-full bg-red-400 p-1.5 text-2xl text-white md:p-2 md:text-3xl"
        />
      </button>
    </div>
  );
}
