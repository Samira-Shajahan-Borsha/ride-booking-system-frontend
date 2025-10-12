import RequestRide from "@/pages/rider/RequestRide";
import RideDetails from "@/pages/rider/RideDetails";
import RideHistory from "@/pages/rider/RideHistory";
import type { ISidebarItems } from "@/types";

export const riderSidebarItems: ISidebarItems[] = [
    {
        title: "Request Ride",
        url: "/rider/request-ride",
        Component: RequestRide,
    },
    {
        title: "Ride Details",
        url: "/rider/ride-details",
        Component: RideDetails,
    },
    {
        title: "Ride History",
        url: "/rider/ride-history",
        Component: RideHistory,
    },
];
