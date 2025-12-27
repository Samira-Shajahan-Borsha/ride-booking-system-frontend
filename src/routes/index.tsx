import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About"
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Features from "@/pages/Features";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { generateRoutes } from "@/utils/generateRoutes";
import { riderSidebarItems } from "./riderSidebarItems";
import { driverSidebarItems } from "./driverSidebarItems";
import Unauthorized from "@/pages/Unauthorized";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import AccountStatus from "@/pages/AccountStatus";
import RideDetails from "@/pages/RideDetails";
import type { ComponentType } from "react";
import ChangePassword from "@/pages/ChangePassoword";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: Home,
                index: true
            },
            {
                Component: Features,
                path: 'features'
            },
            {
                Component: About,
                path: 'about-us'
            },
            {
                Component: Contact,
                path: 'contact'
            },
            {
                Component: FAQ,
                path: 'faq'
            },
            {
                Component: Login,
                path: '/login'
            },
            {
                Component: Register,
                path: '/register'
            },
            {
                Component: Unauthorized,
                path: '/unauthorized'
            },
            {
                Component: AccountStatus,
                path: '/account-status'
            },
            {
                Component: withAuth(ChangePassword),
                path: "/",
                children: [
                    {
                        path: "change-password",
                        Component: ChangePassword,
                    },
                ],
            }
        ]
    },
    {
        Component: withAuth(DashboardLayout),
        path: "/",
        children: [
            {
                path: "rides/:rideId",
                Component: RideDetails,
            },
        ],
    },
    {
        Component: withAuth(DashboardLayout, role.superAdmin as TRole),
        path: "/admin",
        children: [
            {
                index: true,
                element: <Navigate to="/admin/analytics" />
            },
            ...generateRoutes(adminSidebarItems)
        ]
    },
    {
        Component: withAuth(DashboardLayout, role.rider as TRole),
        path: "/rider",
        children: [
            {
                index: true,
                element: <Navigate to="/rider/live-ride-tracking" />
            },
            ...generateRoutes(riderSidebarItems)
        ]
    },
    {
        Component: withAuth(DashboardLayout, role.driver as TRole),
        path: "/driver",
        children: [
            {
                index: true,
                element: <Navigate to="/driver/earnings" />
            },
            ...generateRoutes(driverSidebarItems)
        ]
    }
]);
