"use client";
import React from "react";
import { Input } from "@/components/ui/Input/input";
import { Button } from "@/components/ui/Button/button";
import { HelpCircle, Menu, Search, Settings } from "lucide-react";

export default function NavBar() {
  return (
    <header className="bg-white border-b p-6 flex items-center justify-between">
      <div className="flex items-center w-full max-w-2xl">
        <Input
          type="text"
          placeholder="Search in Drive"
          className="mr-4 text-lg"
        />
        <Button size="icon" variant="ghost" className="h-12 w-12">
          <Search className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex items-center space-x-4">
        <Button size="icon" variant="ghost" className="h-12 w-12">
          <HelpCircle className="h-6 w-6" />
        </Button>
        <Button size="icon" variant="ghost" className="h-12 w-12">
          <Settings className="h-6 w-6" />
        </Button>
        <Button size="icon" variant="ghost" className="h-12 w-12">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
}
