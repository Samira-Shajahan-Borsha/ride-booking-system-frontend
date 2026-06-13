/* eslint-disable @typescript-eslint/no-explicit-any */
import Badge from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { accountStatus } from "@/constants/accountStatus";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ChevronsUpDown } from "lucide-react";

export const status = {
    [accountStatus.ACTIVE]:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
    [accountStatus.BLOCKED]:
        "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

export const getRiderColumns = (onActionClick: (type: "BLOCK" | "UNBLOCK", id: string) => void, toggleSort: (field: string) => void): ColumnDef<any>[] => [
    {
        accessorKey: "name",
        header: () => (
            <div
                className="flex items-center gap-1 cursor-pointer select-none"
                onClick={() => toggleSort("name")}
            >
                Name <ChevronsUpDown className="w-4 h-4 text-gray-400" />
            </div>
        ),
        cell: ({ row }) => <p className="font-medium">{row.original.name}</p>,
    },
    {
        accessorKey: "email",
        header: () => (
            <div
                className="flex items-center gap-1 cursor-pointer select-none"
                onClick={() => toggleSort("email")}
            >
                Email <ChevronsUpDown className="w-4 h-4 text-gray-400" />
            </div>
        ),
        cell: ({ row }) => <p className="text-sm text-muted-foreground">{row.original.email}</p>,
    },
    {
        accessorKey: "createdAt",
        header: () => (
            <div
                className="flex items-center gap-1 cursor-pointer select-none"
                onClick={() => toggleSort("createdAt")}
            >
                Join Date <ChevronsUpDown className="w-4 h-4 text-gray-400" />
            </div>
        ),
        cell: ({ row }) => format(new Date(row.original.createdAt), "PP"),
    },
    {
        id: "status",
        header: "Status",
        cell: ({ row }) => (
            <Badge
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${status[row.original.isActive]}`}
            >
                {row.original.isActive}
            </Badge>
        ),
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const { isActive, _id } = row.original;
            return (
                <Button
                    size="sm"
                    variant={isActive === "ACTIVE" ? "destructive" : "default"}
                    onClick={() => onActionClick(isActive === "ACTIVE" ? "BLOCK" : "UNBLOCK", _id)}
                    className="h-7 px-2 text-xs"
                >
                    {isActive === "ACTIVE" ? "Block" : "Unblock"}
                </Button>
            );
        },
    },
];
