/* eslint-disable @typescript-eslint/no-explicit-any */
import Badge from "@/components/ui/badge";
import { getStatusColor } from "@/utils/getRideStatusColor";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ChevronsUpDown, Eye } from "lucide-react";

const adminColumns: ColumnDef<any>[] = [
    {
        accessorKey: "rider.name",
        header: "Rider",
        cell: ({ row }) => row.original.rider?.name ?? "—",
    },
    {
        accessorKey: "driver.name",
        header: "Driver",
        cell: ({ row }) => row.original.driver?.user?.name ?? "—",
    },
];

export const getRideColumns = (toggleSort: () => void, isAdmin: boolean = false, navigate): ColumnDef<any>[] => [
    {
        accessorKey: "pickUp.address",
        header: "Pickup",
    },
    {
        accessorKey: "destination.address",
        header: "Destination",
    },
    {
        accessorKey: "fare",
        header: "Fare (Tk)",
        cell: ({ row }) => `${row.original.fare} Tk`,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <Badge
                variant="outline"
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(
                    row.original.status
                )}`}
            >
                {row.original.status}
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
                <span>Date</span>
                <ChevronsUpDown className="w-4 h-4 ml-1 text-gray-400" />
            </div>
        ),
        cell: ({ row }) => format(new Date(row.original.createdAt), "PP"),
    },
    ...(isAdmin ? adminColumns : []),
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => (
            <Eye
                className="w-5 h-5 cursor-pointer text-muted-foreground hover:text-primary"
                onClick={() =>
                    navigate(`/rides/${row.original._id}`)
                }
            />
        ),
    },
];
