"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button/button";
import { Grid, List } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { files, getFileIcon, getFileIconColor } from "@/utils/common";

export default function Main() {
  const [view, setView] = React.useState<"grid" | "list">("grid");

  return (
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
  );
}
