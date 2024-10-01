"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button/button";
import { ScrollArea } from "@/components/ui/ScrollArea/scroll-area";

import NavBar from "@/components/layout/NavBar";
import Sidebar from "@/components/layout/Sidebar";
import { files, getFileIcon, getFileIconColor } from "@/utils/common";
import { Grid, List } from "lucide-react";

export default function CloudDrive() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <NavBar />

        {/* Main content */}
        <main className="flex-1 overflow-auto p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold">Welcome to Drive</h2>
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
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div
              className={`grid ${
                view === "grid"
                  ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
                  : "grid-cols-1"
              } gap-6`}
            >
              {files.map((file, index) => (
                <div
                  key={index}
                  className={`bg-white p-6 rounded-lg shadow-md ${
                    view === "list" ? "flex items-center" : ""
                  }`}
                >
                  <div
                    className={`${getFileIconColor(file.type)} rounded-lg p-4 ${
                      view === "list" ? "mr-6" : "mb-4"
                    }`}
                  >
                    {getFileIcon(file.type)}
                  </div>
                  <p className="text-lg font-medium truncate">{file.name}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}
