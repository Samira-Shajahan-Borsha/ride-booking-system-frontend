import { useState } from "react";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/modules/common/data-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loading from "@/components/modules/common/Loading";
import { useGetAllDriversQuery } from "@/redux/features/driver/driver.api";
import { getAdminDriverColumns } from "@/components/modules/admin/columns";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useApproveDriverMutation, useSuspendDriverMutation } from "@/redux/features/driver/driver.api";
import { APPROVAL_STATUS } from "@/constants/approvalStatus";
import { Button } from "@/components/ui/button";

type TAction = "APPROVE" | "SUSPEND";

export default function AdminDrivers() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [approval, setApproval] = useState<string | undefined>("ALL");
  const [sort, setSort] = useState("-createdAt");

  const [open, setOpen] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<TAction | null>(null);

  const query: Record<string, string | number> = {
    page,
    limit: 10,
    searchTerm,
    sort,
    ...(approval !== "ALL" && { approvalStatus: approval }),
  };

  const { data, isLoading } = useGetAllDriversQuery(query);
  const totalPages = data?.meta?.totalPage || 1;

  const [approveDriver] = useApproveDriverMutation();
  const [suspendDriver] = useSuspendDriverMutation();

  const handleActionClick = (type: TAction, id: string) => {
    setSelectedDriverId(id);
    setActionType(type);
    setOpen(true);
  };

  const handleConfirm = async () => {
    if (!selectedDriverId || !actionType) return;

    try {
      if (actionType === "APPROVE") await approveDriver(selectedDriverId).unwrap();
      if (actionType === "SUSPEND") await suspendDriver(selectedDriverId).unwrap();
    } catch (err) {
      console.error(err);
    } finally {
      setOpen(false);
      setSelectedDriverId(null);
      setActionType(null);
    }
  };

  const toggleSort = () => {
    setSort(prev => (prev === "-createdAt" ? "createdAt" : "-createdAt"));
  };


  if (isLoading) return <Loading />;

  return (
    <>
      {/* ALERT MODAL */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="sm:max-w-lg w-full">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionType === "APPROVE" ? "Approve Driver?" : "Suspend Driver?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === "APPROVE"
                ? "This driver will be approved and can access the platform."
                : "This driver will be suspended and will not be able to access the platform."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2 mt-4">
            <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* MAIN CONTENT */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Drivers</h1>
          <p className="text-sm text-muted-foreground">View and manage all registered drivers</p>
        </div>

        <div className="flex flex-wrap items-start gap-3">
          <div className="relative w-64 flex flex-col gap-1">
            <Input
              placeholder="Search driver name or email..."
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

          <Select
            value={approval}
            onValueChange={(value) => {
              setPage(1);
              setApproval(value);
            }}
          >
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Approval Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value={APPROVAL_STATUS.PENDING}>Pending</SelectItem>
              <SelectItem value={APPROVAL_STATUS.APPROVED}>Approved</SelectItem>
              <SelectItem value={APPROVAL_STATUS.SUSPEND}>Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DataTable
          columns={getAdminDriverColumns(handleActionClick, toggleSort)}
          data={data?.data ?? []}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="w-full flex justify-end mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((p) => p - 1)}
                    className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <PaginationItem key={p} onClick={() => setPage(p)}>
                    <PaginationLink className="cursor-pointer" isActive={p === page}>
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage((p) => p + 1)}
                    className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </>
  );
}
