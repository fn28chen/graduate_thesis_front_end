"use client";
import { AppSidebar } from "@/components/app-sidebar";
import NavBar from "@/components/layout/NavBar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full">
      <AppSidebar />
      <div className="flex flex-col flex-1 overflow-hidden border-l-2">
        <NavBar />
        {children}
      </div>
    </div>
  );
}
