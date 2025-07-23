import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail } from "@/components/ui/sidebar"
import { Users, MessageSquare, CreditCard, BarChart3, Settings, LogOut, Home } from "lucide-react"

export function ManagerSidebar({ children }) {
  const pathname = usePathname()
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar variant="inset" className="border-r">
          <SidebarHeader className="border-b">
            <div className="flex items-center gap-2 px-4 py-3">
              <Home className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-lg">Manager</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/manager/dashboard"}>
                  <Link href="/manager/dashboard">
                    <Users className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/manager/residents"}>
                  <Link href="/manager/residents">
                    <Users className="h-4 w-4" />
                    <span>Residents</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/manager/complaints"}>
                  <Link href="/manager/complaints">
                    <MessageSquare className="h-4 w-4" />
                    <span>Complaints</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/manager/payments"}>
                  <Link href="/manager/payments">
                    <CreditCard className="h-4 w-4" />
                    <span>Payments</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/manager/analytics"}>
                  <Link href="/manager/analytics">
                    <BarChart3 className="h-4 w-4" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/settings"}>
                  <Link href="/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/auth/login">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter />
          <SidebarRail />
        </Sidebar>
        <div className="flex-1">{children}</div>
      </div>
    </SidebarProvider>
  )
} 