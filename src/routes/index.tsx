import App from "@/App";
import About from "@/pages/About";
import FAQ from "@/pages/FAQ";
import Features from "@/pages/Features";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
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
]);
