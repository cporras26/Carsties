"use client";

import AuctionCard from "./AuctionCard";
import AppPagination from "@/app/components/AppPagination";
import { useEffect, useState } from "react";
import { getData } from "@/app/actions/auctionActions";
import Filters from "@/app/auctions/Filters";
import { useParamsStore } from "@/hooks/useParamsStore";
import { shallow } from "zustand/vanilla/shallow";
import qs from "query-string";
import EmptyFilter from "@/app/components/EmptyFilter";
import { useAuctionStore } from "@/hooks/useAuctionStore";

export default function Listings() {
  const [loading, setLoading] = useState(true);
  const params = useParamsStore(
    (state) => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
      orderBy: state.orderBy,
      filterBy: state.filterBy,
      seller: state.seller,
      winner: state.winner,
    }),
    shallow,
  );

  const data = useAuctionStore((state) => ({
    auctions: state.auctions,
    totalCount: state.totalCount,
    pageCount: state.pageCount,
  }));
  const setData = useAuctionStore((state) => state.setData);

  const setParams = useParamsStore((state) => state.setParams);
  const url = qs.stringifyUrl({ url: "", query: params });

  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber });
  }

  useEffect(
    function () {
      getData(url).then((data) => {
        setData(data);
        setLoading(false);
      });
    },
    [url, setData],
  );

  if (loading) return <h3>Loading...</h3>;

  return (
    <>
      <Filters />
      {data.totalCount === 0 ? (
        <EmptyFilter showReset />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {data.auctions.map((auction) => (
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
