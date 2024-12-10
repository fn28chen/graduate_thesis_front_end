"use client";

import * as React from "react";
import {
  BookOpen,
  Command,
  Frame,
  HardDrive,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  Trash,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import config from "@/config";
import { ModalProvider } from "./ui/Modal/modal";
import { useQuery } from "react-query";
import { getListMe, getTotalSize } from "@/app/api/ApiList";

const data = {
  navMain: [
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Trash",
      url: "/trash",
      icon: Trash,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // fetch total storage of user
  const { data: totalStorage } = useQuery("totalStorage", () => getTotalSize());
  const fixedTotalStorage = totalStorage ? (totalStorage / 1024 / 1024 / 1024).toFixed(1) : "0.0";
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={config.PATHNAME.HOME}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-lg leading-tight">
                  <span className="truncate font-semibold">Cloud Drive</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ModalProvider>
          <NavMain items={data.navMain} />
        </ModalProvider>
        <div className="flex flex-row items-center justify-start p-2 gap-2">
          <HardDrive className="size-4" />
          
            <span className="text-base">
            {parseFloat(fixedTotalStorage) < 0.1
              ? `${(totalStorage / 1024 / 1024).toFixed(1)} MB`
              : `${fixedTotalStorage} GB`} of 50GB
            </span>
        </div>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  );
}
