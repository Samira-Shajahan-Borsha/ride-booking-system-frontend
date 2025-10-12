import Analytics from "@/pages/admin/Analytics";
import Drivers from "@/pages/admin/Drivers";
import Riders from "@/pages/admin/Riders";
import Rides from "@/pages/admin/Rides";
import type { ISidebarItems } from "@/types";

export const adminSidebarItems: ISidebarItems[] = [
    {
        title: "Analytics",
        url: "/admin/analytics",
        Component: Analytics,
    },
    {
        title: "Rides",
        url: "/admin/rides",
        Component: Rides,
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
