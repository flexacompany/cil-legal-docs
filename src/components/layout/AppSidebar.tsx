import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Library,
  Settings,
  Users,
  Search,
  Plus
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/docfacil-logo.png";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Meus Documentos", url: "/dashboard/documents", icon: FileText },
  { title: "Templates", url: "/dashboard/templates", icon: Library },
  { title: "Colaboração", url: "/dashboard/collaboration", icon: Users },
];

const quickActions = [
  { title: "Novo Documento", url: "/dashboard/documents/new", icon: Plus },
  { title: "Buscar", url: "/dashboard/search", icon: Search },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" : "hover:bg-muted/50";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"}>
      <SidebarHeader className={`p-4 ${collapsed ? "px-2" : ""}`}>
        <div className="flex items-center gap-2">
          <img 
            src={logoImage} 
            alt="DocFácil" 
            className="h-8 w-8 flex-shrink-0"
          />
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg text-foreground">DocFácil</h2>
              <p className="text-xs text-muted-foreground">Plataforma Jurídica</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Quick Actions */}
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Ações Rápidas</SidebarGroupLabel>}
          <SidebarGroupContent>
            <div className={`grid gap-2 ${collapsed ? "px-2" : ""}`}>
              {quickActions.map((item) => (
                <Button
                  key={item.title}
                  variant="professional"
                  size={collapsed ? "sm" : "default"}
                  className={`${collapsed ? "h-10 w-10" : "justify-start"}`}
                  asChild
                >
                  <NavLink to={item.url}>
                    <item.icon className="h-4 w-4" />
                    {!collapsed && <span className="ml-2">{item.title}</span>}
                  </NavLink>
                </Button>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Navigation */}
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Navegação</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/dashboard/settings" 
                    className={getNavCls}
                  >
                    <Settings className="h-4 w-4" />
                    {!collapsed && <span>Configurações</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}