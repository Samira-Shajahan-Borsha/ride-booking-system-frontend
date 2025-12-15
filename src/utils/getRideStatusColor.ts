import { rideStatus } from "@/constants/rideStatus";
import type { RideStatus } from "@/types/ride.type";

export const getStatusColor = (status: RideStatus) => {
    switch (status) {
        case rideStatus.REQUESTED:
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
        case rideStatus.ACCEPTED:
            return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
        case rideStatus.PICKED_UP:
            return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
        case rideStatus.IN_TRANSIT:
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
        case rideStatus.COMPLETED:
            return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300";
        case rideStatus.CANCELED:
            return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
};
