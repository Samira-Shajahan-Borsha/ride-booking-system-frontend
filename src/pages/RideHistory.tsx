import { useState } from "react";
import { useGetRideHistoryQuery } from "@/redux/features/ride/ride.api";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/modules/rides/data-table";
import { rideColumns } from "@/components/modules/rides/columns";
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

export default function RideHistory() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<string | undefined>("ALL");

  const query = {
    page,
    limit: 10,
    searchTerm,
    sort: "-createdAt",
    fields: "status,fare,pickUp,destination,createdAt",
    ...(status !== "ALL" && { status }),
  };

  const { data } = useGetRideHistoryQuery(query);

  const totalPages = data?.meta?.totalPage || 1;

  return (
    <div className="space-y-4">

      <div className="flex flex-wrap gap-3">
        <Input
          placeholder="Search location..."
          value={searchTerm}
          disabled={data?.meta?.total === 0}
          onChange={(e) => {
            setPage(1);
            setSearchTerm(e.target.value);
          }}
          className="w-64"
        />

        <Select
          value={status}
          disabled={data?.meta?.total === 0}
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
      </div>

      <DataTable columns={rideColumns} data={data?.data ?? []} />

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
