
import React, { ReactNode } from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { MainNav } from "./MainNav";
import { Clock } from "lucide-react";
import { SoundMenu } from "./SoundMenu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="bg-harmony-primary text-white">
          <SidebarHeader className="flex items-center justify-between px-4 py-6">
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6" />
              <h2 className="font-bold text-lg">Harmony</h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SoundMenu />
          </SidebarContent>
          <SidebarFooter className="p-4">
            <div className="text-xs text-white/60">
              Harmony Audio Automator v1.0
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-col flex-1">
          <header className="border-b bg-white shadow-sm">
            <div className="flex h-16 items-center px-6">
              <SidebarTrigger>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="mr-4 hover:bg-harmony-light"
                >
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SidebarTrigger>
              <MainNav />
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}
