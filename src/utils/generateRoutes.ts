import type { ISidebarItems } from "@/types";

export const generateRoutes = (sidebarItems: ISidebarItems[]) => {
    return sidebarItems?.map((sidebarItems) => {
        return {
            Component: sidebarItems.Component,
            path: sidebarItems.url,
        };
    });
};
