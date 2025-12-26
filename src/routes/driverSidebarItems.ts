import Earnings from "@/pages/driver/Earnings";
import IncomingRequests from "@/pages/driver/IncomingRequests";
import RideManagement from "@/pages/driver/RideManagement";
import RideHistory from "@/pages/RideHistory";
import type { ISidebarItems } from "@/types";

export const driverSidebarItems: ISidebarItems[] = [
    {
        title: "Earnings",
        url: "/driver/earnings",
        Component: Earnings,
    },
    {
        title: "Incoming Requests",
        url: "/driver/incoming-requests",
        Component: IncomingRequests,
    },
    {
        title: "Ride Management",
        url: "/driver/ride-management",
        Component: RideManagement,
    },
    {
        title: "Ride History",
        url: "/driver/ride-history",
        Component: RideHistory,
    },
];
