import Analytics from "@/pages/admin/Analytics";
import Drivers from "@/pages/admin/Drivers";
import Riders from "@/pages/admin/Riders";
import RideHistory from "@/pages/RideHistory";
import type { ISidebarItems } from "@/types";

export const adminSidebarItems: ISidebarItems[] = [
    {
        title: "Analytics",
        url: "/admin/analytics",
        Component: Analytics,
    },
    {
        title: "Ride History",
        url: "/admin/ride-history",
        Component: RideHistory,
    },
    {
        title: "Drivers",
        url: "/admin/drivers",
        Component: Drivers,
    },
    {
        title: "Riders",
        url: "/admin/riders",
        Component: Riders,
    },
];
