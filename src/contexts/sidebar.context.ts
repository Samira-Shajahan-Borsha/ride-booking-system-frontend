import type { SidebarContextProps } from "@/components/ui/sidebar";
import React from "react";

export const SidebarContext = React.createContext<SidebarContextProps | null>(null);
