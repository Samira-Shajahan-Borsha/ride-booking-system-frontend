/* eslint-disable @typescript-eslint/no-explicit-any */
import Badge from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { APPROVAL_STATUS } from "@/constants/approvalStatus";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ChevronsUpDown } from "lucide-react";

export const approvalStatusColor = {
    [APPROVAL_STATUS.APPROVED]:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
    [APPROVAL_STATUS.PENDING]:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    [APPROVAL_STATUS.SUSPEND]:
        "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

export const getDriverColumns = (onActionClick: (type: "APPROVE" | "SUSPEND", id: string) => void, toggleSort: () => void): ColumnDef<any>[] => [
    {
        accessorKey: "user.name",
        header: "Name",
        cell: ({ row }) => <p className="font-medium">{row.original.user.name}</p>,
    },
    {
        accessorKey: "user.email",
        header: "Email",
        cell: ({ row }) => <p className="text-sm text-muted-foreground">{row.original.user.email}</p>,
    },
    {
        accessorKey: "vehicle",
        header: "Vehicle",
        cell: ({ row }) => (
            <p className="text-sm text-muted-foreground">{row.original.vehicle ?? "N/A"}</p>
        ),
    },
    {
        accessorKey: "approvalStatus",
        header: "Approval Status",
        cell: ({ row }) => (
            <Badge
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${approvalStatusColor[row.original.approvalStatus]}`}
            >
                {row.original.approvalStatus}
            </Badge>
        ),
    },
    {
        accessorKey: "createdAt",
        header: () => (
            <div
                className="flex items-center gap-1 cursor-pointer select-none"
                onClick={toggleSort}
            >
                <span>Join Date</span>
                <ChevronsUpDown className="w-4 h-4 ml-1 text-gray-400" />
            </div>
        ),
        cell: ({ row }) => format(new Date(row.original.createdAt), "PP"),
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {

            const driver = row.original;
            const { approvalStatus, _id } = driver;

            return (
                <div className="flex gap-2">
                    {approvalStatus === APPROVAL_STATUS.PENDING && (
                        <>
                            <Button
                                onClick={() => onActionClick("APPROVE", _id)}
                                size="sm"
                            >
                                Approve
                            </Button>
                            <Button
                                onClick={() => onActionClick("SUSPEND", _id)}
                                size="sm"
                                variant="destructive"
                            >
                                Suspend
                            </Button>
                        </>
                    )}

                    {approvalStatus === APPROVAL_STATUS.SUSPEND && (
                        <Button
                            onClick={() => onActionClick("APPROVE", _id)}
                            size="sm"
                        >
                            Approve
                        </Button>
                    )}

                    {approvalStatus === APPROVAL_STATUS.APPROVED && (
                        <Button
                            onClick={() => onActionClick("SUSPEND", _id)}
                            size="sm"
                            variant="destructive"
                        >
                            Suspend
                        </Button>
                    )}
                </div>
            );
        },
    }
];
