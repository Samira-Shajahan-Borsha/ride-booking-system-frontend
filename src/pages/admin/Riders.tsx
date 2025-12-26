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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { getRiderColumns } from "@/components/modules/admin/riderColumns";
import { useBlockRiderMutation, useGetAllRidersQuery, useUnblockRiderMutation } from "@/redux/features/admin/admin.api";
import { accountStatus } from "@/constants/accountStatus";

type TAction = "BLOCK" | "UNBLOCK";

export default function Riders() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("-createdAt");

  const [open, setOpen] = useState(false);
  const [selectedRiderId, setSelectedRiderId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<TAction | null>(null);
  const [status, setStatus] = useState<string | undefined>("ALL");

  const query: Record<string, string | number> = {
    page,
    limit: 10,
    searchTerm,
    sort,
    ...(status !== "ALL" ? { isActive: status } : {}),
  };

  const { data, isLoading } = useGetAllRidersQuery(query);
  const totalPages = data?.meta?.totalPage || 1;

  const [blockRider] = useBlockRiderMutation();
  const [unblockRider] = useUnblockRiderMutation();

  const handleActionClick = (type: TAction, id: string) => {
    setSelectedRiderId(id);
    setActionType(type);
    setOpen(true);
  };

  const handleConfirm = async () => {
    if (!selectedRiderId || !actionType) return;

    try {
      if (actionType === "BLOCK") await blockRider(selectedRiderId).unwrap();
      if (actionType === "UNBLOCK") await unblockRider(selectedRiderId).unwrap();
    } catch (err) {
      console.error(err);
    } finally {
      setOpen(false);
      setSelectedRiderId(null);
      setActionType(null);
    }
  };

  const toggleSort = (field: string) => {
    setSort(prev => (prev === `-${field}` ? field : `-${field}`));
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="sm:max-w-lg w-full">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionType === "BLOCK" ? "Block Rider?" : "Unblock Rider?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === "BLOCK"
                ? "This rider will be blocked and cannot access the platform."
                : "This rider will be unblocked and can access the platform."}
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

      <div className="space-y-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Riders</h1>
          <p className="text-sm text-muted-foreground">View and manage all registered riders</p>
        </div>

        <div className="flex flex-wrap items-start gap-3">
          <div className="relative w-64 flex flex-col gap-1">
            <Input
              placeholder="Search rider name or email..."
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
            value={status}
            onValueChange={(value) => {
              setPage(1);
              setStatus(value);
            }}
          >
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Approval Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value={accountStatus.ACTIVE}>Active</SelectItem>
              <SelectItem value={accountStatus.BLOCKED}>Blocked</SelectItem>
            </SelectContent>
          </Select>

        </div>

        <DataTable columns={getRiderColumns(handleActionClick, toggleSort)} data={data?.data ?? []} />

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