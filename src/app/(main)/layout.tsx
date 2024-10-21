"use client";
import NavBar from "@/components/layout/NavBar";
import Sidebar from "@/components/layout/Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <NavBar />
        {children}
      </div>
    </div>
  );
}
