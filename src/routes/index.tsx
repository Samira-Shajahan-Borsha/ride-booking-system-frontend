import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Analytics from "@/pages/admin/Analytics";
import Rides from "@/pages/admin/Rides";
import Users from "@/pages/admin/Users";
import Contact from "@/pages/Contact";
import Earnings from "@/pages/driver/Earnings";
import Requests from "@/pages/driver/Requests";
import FAQ from "@/pages/FAQ";
import Features from "@/pages/Features";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import RequestRide from "@/pages/rider/RequestRide";
import { createBrowserRouter } from "react-router";

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
            {
                Component: Analytics,
                path: 'analytics'
            },
            {
                Component: Users,
                path: 'users'
            },
            {
                Component: Rides,
                path: 'rides'
            }
        ]
    },
    {
        Component: DashboardLayout,
        path: "/rider",
        children: [
            {
                Component: RequestRide,
                path: 'request-ride'
            }
        ]
    },
    {
        Component: DashboardLayout,
        path: "/driver",
        children: [
            {
                Component: Earnings,
                path: 'earnings'
            },
            {
                Component: Requests,
                path: 'requests'
            }
        ]
    }
]);
