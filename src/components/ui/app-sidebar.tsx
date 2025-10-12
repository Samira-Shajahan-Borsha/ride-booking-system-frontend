import * as React from "react"
import { NavMain } from "@/components/ui/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router"
import Logo from "@/assets/icons/Logo"
import { useUserInfoQuery } from "@/redux/features/auth/auth.Api"
import { getSidebarItems } from "@/utils/generateSidebarItems"
import type { TRole } from "@/types"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { data: userData } = useUserInfoQuery(null);

  console.log(userData)

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/">
              <Logo />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={getSidebarItems(userData?.data?.role as TRole)} />
      </SidebarContent>
    </Sidebar>
  )
}
