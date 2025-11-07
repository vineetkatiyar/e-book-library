// src/components/layout/Sidebar.tsx
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { BookOpen, Library } from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const location = useLocation();
  const adminInfo = {
    name: "Admin User",
    email: "admin@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    role: "Administrator",
  };

  const navigation = [
    {
      name: "Book List",
      href: "/",
      icon: BookOpen,
      current: location.pathname === "/",
    },
  ];

  return (
    <div
      className={cn("h-full bg-sidebar border-r border-sidebar-border", "w-64")}
    >
      <ShadcnSidebar className="h-full border-0">
        <SidebarHeader className="border-b border-sidebar-border">
          <div className="flex items-center gap-2 px-4 py-2">
            <Library className="h-6 w-6" />
            <span className="text-lg font-bold">BOOK'S LIBRARY</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {navigation.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild isActive={item.current}>
                  <Link to={item.href}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/profile" className="flex items-center gap-3">
                  <img
                    src={adminInfo.avatar}
                    alt="Admin"
                    className="h-8 w-8 rounded-full"
                  />
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-sm font-medium truncate">
                      {adminInfo.name}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {adminInfo.role}
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </ShadcnSidebar>
    </div>
  );
};

export default Sidebar;
