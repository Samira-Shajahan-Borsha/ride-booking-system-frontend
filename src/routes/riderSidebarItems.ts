import LiveRideTracking from "@/pages/rider/LiveRideTracking";
import RideDetails from "@/pages/rider/RideDetails";
import RideHistory from "@/pages/rider/RideHistory";
import RideRequestForm from "@/pages/rider/RideRequestForm";
import type { ISidebarItems } from "@/types";

export const riderSidebarItems: ISidebarItems[] = [
    {
        title: "Live Ride Tracking",
        url: "/rider/live-ride-tracking",
        Component: LiveRideTracking,
    },
    {
        title: "Ride Request",
        url: "/rider/request-ride",
        Component: RideRequestForm,
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
