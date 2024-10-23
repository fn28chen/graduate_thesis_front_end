"use client";
import React from "react";
import { Button } from "@/components/ui/Button/button";
import { Grid, List } from "lucide-react";
import Workspace from "@/components/ui/Workspace/workspace";

export default function Main() {
  const [view, setView] = React.useState<"grid" | "list">("grid");

  return (
    <main className="flex-1 overflow-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-row gap-4">
          <div className="">
            <h2 className="text-3xl font-semibold">Welcome to Drive</h2>
          </div>
          <div className="flex items-center justify-center">
            Dropdown Type Filter
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant={view === "grid" ? "default" : "outline"}
            onClick={() => setView("grid")}
          >
            <Grid className="h-5 w-5 mr-2" /> Grid
          </Button>
          <Button
            size="sm"
            variant={view === "list" ? "default" : "outline"}
            onClick={() => setView("list")}
          >
            <List className="h-5 w-5 mr-2" /> List
          </Button>
        </div>
      </div>
      <Workspace view={view} />
    </main>
  );
}
