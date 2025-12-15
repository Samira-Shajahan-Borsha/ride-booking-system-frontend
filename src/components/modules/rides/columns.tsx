/* eslint-disable @typescript-eslint/no-explicit-any */
import Badge from "@/components/ui/badge";
import { getStatusColor } from "@/utils/getRideStatusColor";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const rideColumns: ColumnDef<any>[] = [
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
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(row.original.status)}`}
            >
                {row.original.status}
            </Badge>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) =>
            format(new Date(row.original.createdAt), "PP"),
    },
];
