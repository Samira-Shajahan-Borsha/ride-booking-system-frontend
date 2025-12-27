import { useState } from "react";
import { useGetRideHistoryQuery } from "@/redux/features/ride/ride.api";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/modules/common/data-table";
import { getRideColumns } from "@/components/modules/common/rideColumns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { rideStatus } from "@/constants/rideStatus";
import { useUserInfoQuery } from "@/redux/features/auth/auth.Api";
import { role } from "@/constants/role";
import { useNavigate } from "react-router";
import Loading from "@/components/modules/common/Loading";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { type DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";

export default function RideHistory() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<string | undefined>("ALL");
  const [sort, setSort] = useState("-createdAt");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const navigate = useNavigate();

  const { data: userData } = useUserInfoQuery(null);
  const isAdmin = userData?.data?.role === role.admin || userData?.data?.role === role.superAdmin;

  const query: Record<string, string | number> = {
    page,
    limit: 10,
    searchTerm,
    sort,
    ...(status !== "ALL" && { status }),
  };

  if (
    isAdmin &&
    dateRange?.from &&
    dateRange?.to &&
    dateRange.from.getTime() !== dateRange.to.getTime()
  ) {
    query.startDate = format(dateRange.from, "yyyy-MM-dd");
    query.endDate = format(dateRange.to, "yyyy-MM-dd");
  }

  const { data, isLoading: isRideHistoryDataLoading } = useGetRideHistoryQuery(query);

  const totalPages = data?.meta?.totalPage || 1;

  const dateRangeText = !dateRange?.from
    ? "Select date range"
    : !dateRange.to
      ? `From ${format(dateRange.from, "LLL dd, y")}`
      : `${format(dateRange.from, "LLL dd, y")} - ${format(dateRange.to, "LLL dd, y")}`;

  const toggleSort = () => {
    setSort(prev => (prev === "-createdAt" ? "createdAt" : "-createdAt"));
  };

  if (isRideHistoryDataLoading) {
    return <Loading />
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Ride History
        </h1>
        <p className="text-sm text-muted-foreground">
          View and manage all past rides
        </p>
      </div>

      <div className="flex flex-wrap items-start gap-3">
        <div className="w-64 flex flex-col gap-1">
          <div className="relative">
            <Input
              placeholder="Search location..."
              value={searchTerm}
              onChange={(e) => {
                setPage(1);
                setSearchTerm(e.target.value);
              }}
              className="pr-6"
            />

            {searchTerm && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchTerm("");
                  setPage(1);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer select-none"
              >
                ✕
              </span>
            )}
          </div>

          <span className="text-[10px] text-muted-foreground ml-1">
            Search applies to pickup and destination field only
          </span>
        </div>

        <Select
          value={status}
          onValueChange={(value) => {
            setPage(1);
            setStatus(value);
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value={rideStatus.COMPLETED}>Completed</SelectItem>
            <SelectItem value={rideStatus.CANCELED}>Cancelled</SelectItem>
          </SelectContent>
        </Select>

        {isAdmin && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[260px] justify-start text-left font-normal flex items-center gap-2"
              >
                <CalendarIcon className="h-4 w-4" />

                <span className="flex-1 truncate">{dateRangeText}</span>

                {dateRange?.from && dateRange?.to && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setDateRange(undefined);
                      setPage(1);
                    }}
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    ✕
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                numberOfMonths={1}
                selected={dateRange}
                disabled={(date) => date > new Date()}
                onSelect={(range) => {
                  setPage(1);
                  setDateRange(range);
                }}
              />
            </PopoverContent>
          </Popover>
        )}
      </div>

      <DataTable columns={getRideColumns(toggleSort, isAdmin, navigate)} data={data?.data ?? []} />

      {totalPages > 1 && (
        <div className="w-full flex justify-end mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setPage((prePage: number) => prePage - 1)
                  }
                  className={`${page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
                    }`}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((p) => (
                <PaginationItem key={p} onClick={() => setPage(p)}>
                  <PaginationLink
                    className="cursor-pointer"
                    isActive={p === page}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setPage((prePage: number) => prePage + 1)
                  }
                  className={`${page === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                    }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
