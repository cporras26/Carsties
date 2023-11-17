"use client";

import AuctionCard from "./AuctionCard";
import AppPagination from "@/app/components/AppPagination";
import { useEffect, useState } from "react";
import { Auction, PagedResult } from "@/types";
import { getData } from "@/app/actions/auctionActions";
import Filters from "@/app/auctions/Filters";
import { useParamsStore } from "@/hooks/useParamsStore";
import { shallow } from "zustand/vanilla/shallow";
import qs from "query-string";
import EmptyFilter from "@/app/components/EmptyFilter";

export default function Listings() {
  const [data, setData] = useState<PagedResult<Auction>>();

  const params = useParamsStore(
    (state) => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
      orderBy: state.orderBy,
      filterBy: state.filterBy,
    }),
    shallow,
  );
  const setParams = useParamsStore((state) => state.setParams);
  const url = qs.stringifyUrl({ url: "", query: params });

  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber });
  }

  useEffect(
    function () {
      getData(url).then((data) => {
        setData(data);
      });
    },
    [url],
  );

  if (!data) return <h3>Loading...</h3>;

  return (
    <>
      <Filters />
      {data.pageSize === 0 ? (
        <EmptyFilter showReset />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
            {data.results.map((auction) => (
              <AuctionCard auction={auction} key={auction.id} />
            ))}
          </div>

          <div className="mt-4 flex justify-center text-xs sm:text-sm md:text-base">
            <AppPagination
              currentPage={params.pageNumber}
              pageCount={data.pageCount}
              pageChanged={setPageNumber}
            />
          </div>
        </>
      )}
    </>
  );
}
