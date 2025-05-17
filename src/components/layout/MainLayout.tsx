
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { UserIcon, HistoryIcon, MessageSquareIcon, FileTextIcon } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const adminMenuItems = [
    { 
      icon: <UserIcon className="h-5 w-5" />, 
      label: "Dashboard", 
      path: "/admin" 
    },
    { 
      icon: <FileTextIcon className="h-5 w-5" />, 
      label: "Sessions", 
      path: "/admin/sessions" 
    },
    { 
      icon: <MessageSquareIcon className="h-5 w-5" />, 
      label: "Messages", 
      path: "/admin/messages" 
    },
    { 
      icon: <HistoryIcon className="h-5 w-5" />, 
      label: "Audit Logs", 
      path: "/admin/audit" 
    },
  ];

  const mentorMenuItems = [
    { 
      icon: <UserIcon className="h-5 w-5" />, 
      label: "Dashboard", 
      path: "/mentor" 
    },
    { 
      icon: <FileTextIcon className="h-5 w-5" />, 
      label: "Sessions", 
      path: "/mentor/sessions" 
    },
    { 
      icon: <MessageSquareIcon className="h-5 w-5" />, 
      label: "Messages", 
      path: "/mentor/messages" 
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="px-6 py-5">
              <h2 className="text-xl font-semibold text-white">
                PayoutEd
              </h2>
              <p className="text-sm text-gray-300 mt-1">
                Payout Automation System
              </p>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>
                {currentUser?.role === "admin" ? "Admin Panel" : "Mentor Panel"}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {(currentUser?.role === "admin" ? adminMenuItems : mentorMenuItems).map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton asChild>
                        <a 
                          href={item.path}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(item.path);
                          }}
                          className="flex items-center gap-3"
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="px-6 py-4">
              {currentUser && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center overflow-hidden">
                      {currentUser ? (
                        <img src="" alt="image" />
                      ) : (
                        <UserIcon className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{currentUser.name}</p>
                      <p className="text-xs text-gray-300">{currentUser.email}</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" onClick={logout}>
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          <div className="container py-6 max-w-7xl">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
