import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Analytics from "@/pages/admin/Analytics";
import Rides from "@/pages/admin/Rides";
import Contact from "@/pages/Contact";
import Earnings from "@/pages/driver/Earnings";
import Requests from "@/pages/driver/IncomingRequests";
import FAQ from "@/pages/FAQ";
import Features from "@/pages/Features";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { generateRoutes } from "@/utils/generateRoutes";
import { riderSidebarItems } from "./riderSidebarItems";
import { driverSidebarItems } from "./driverSidebarItems";

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
        ]
    },
    {
        Component: DashboardLayout,
        path: "/admin",
        children: [
            ...generateRoutes(adminSidebarItems)
        ]
    },
    {
        Component: DashboardLayout,
        path: "/rider",
        children: [
            ...generateRoutes(riderSidebarItems)
        ]
    },
    {
        Component: DashboardLayout,
        path: "/driver",
        children: [
            ...generateRoutes(driverSidebarItems)
        ]
    }
]);
