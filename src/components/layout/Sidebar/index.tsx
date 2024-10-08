"use client";
import React, { useState } from "react";
import { HardDrive, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button/button";
import { sidebarItems } from "@/utils/common";

export default function Sidebar() {
  
  return (
    <aside className="flex flex-col w-64 p-6 border-r">
      <div className="flex items-center mb-8">
        <HardDrive className="h-8 w-8 text-blue-500 mr-3" />
        <h1 className="text-2xl font-semibold">Cloud Drive</h1>
      </div>
      <Button className="mb-6 text-lg">
        <Plus className="mr-2 h-5 w-5" /> New
      </Button>
      <nav className="space-y-2">
        {sidebarItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start text-lg py-3"
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Button>
        ))}
      </nav>
      <div className="mt-auto text-base text-gray-500">
        <p>7.5 GB of 15 GB used</p>
        <Button variant="link" className="p-0 h-auto text-base">
          Get more storage
        </Button>
      </div>
    </aside>
  );
}
