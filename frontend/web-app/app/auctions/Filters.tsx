import ButtonGroup from "flowbite-react/lib/esm/components/Button/ButtonGroup";
import { Button } from "flowbite-react";
import { useParamsStore } from "@/hooks/useParamsStore";
import { AiOutlineClockCircle, AiOutlineSortAscending } from "react-icons/ai";
import { BsFillStopCircleFill, BsStopwatchFill } from "react-icons/bs";
import { GiFinishLine, GiFlame } from "react-icons/gi";

const pageSizeButtons = [4, 8, 12];

const orderButtons = [
  {
    label: "Alphabetical",
    icon: AiOutlineSortAscending,
    value: "make",
  },
  {
    label: "End date",
    icon: AiOutlineClockCircle,
    value: "endingSoon",
  },
  {
    label: "Recently added",
    icon: BsFillStopCircleFill,
    value: "new",
  },
];

const filterButtons = [
  {
    label: "Live Auctions",
    icon: GiFlame,
    value: "live",
  },
  {
    label: "Ending < 6 hrs",
    icon: GiFinishLine,
    value: "endingSoon",
  },
  {
    label: "Completed",
    icon: BsStopwatchFill,
    value: "finished",
  },
];
export default function Filters() {
  const pageSize = useParamsStore((state) => state.pageSize);
  const setParams = useParamsStore((state) => state.setParams);
  const orderBy = useParamsStore((state) => state.orderBy);
  const filterBy = useParamsStore((state) => state.filterBy);

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
      <div>
        <span className="mr-2 text-xs uppercase text-gray-500 md:text-base">
          Filter by
        </span>
        <Button.Group>
          {filterButtons.map(({ label, icon: Icon, value }) => (
            <Button
              key={value}
              onClick={() => setParams({ filterBy: value })}
              color={`${filterBy === value ? "red" : "gray"}`}
              size=""
              className="p-2 text-[0.6rem] focus:ring-0 sm:text-sm md:p-3"
            >
              <Icon className="mr-1.5 h-3 w-3 w-4 md:h-4" />
              {label}
            </Button>
          ))}
        </Button.Group>
      </div>

      <div>
        <span className="mr-2 text-xs uppercase text-gray-500 md:text-base">
          Order by
        </span>
        <Button.Group>
          {orderButtons.map(({ label, icon: Icon, value }) => (
            <Button
              key={value}
              onClick={() => setParams({ orderBy: value })}
              color={`${orderBy === value ? "red" : "gray"}`}
              size=""
              className="p-2 text-[0.6rem] focus:ring-0 sm:text-sm md:p-3"
            >
              <Icon className="mr-1.5 h-3 w-3 w-4 md:h-4" />
              {label}
            </Button>
          ))}
        </Button.Group>
      </div>

      <div>
        <span className="mr-2 text-xs uppercase text-gray-500 md:text-base">
          Page size
        </span>
        <ButtonGroup>
          {pageSizeButtons.map((value, i) => (
            <Button
              key={i}
              onClick={() => setParams({ pageSize: value })}
              color={`${pageSize === value ? "red" : "gray"}`}
              size=""
              className="p-2 text-xs focus:ring-0 sm:text-sm md:p-3"
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
}
