"use client";
import React from "react";
import { Button } from "@/components/ui/Button/button";
import { Grid, List } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { getFileIcon, getFileIconColor } from "@/utils/common";
import { useFiles } from "@/hooks/use-files";
import { PreviewCard } from "@/components/ui/PreviewCard/preview-card";

export default function Main() {
  const [view, setView] = React.useState<"grid" | "list">("grid");
  const files = useFiles();

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
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              : "grid-cols-1"
          } gap-6`}
        >
          {files.files.map((file: { Key: string }, index: number) => {
            const fileName = file.Key.split("/").pop();
            const truncatedFileName = fileName && fileName.length > 12 ? fileName.slice(0, 12) + "..." : fileName || "";
            const extensionFilename = fileName ? fileName.split(".").pop() : "";
            const fileType = extensionFilename?.toLowerCase() || "";
            console.log("File type " + index, fileType);
            console.log("File Icon ", getFileIcon(fileType));
            return (
              <PreviewCard
                key={index}
                author="Shad"
                title={truncatedFileName || ""}
                icon={getFileIcon(fileType)}
              />
            );
          })}
        </div>
      </ScrollArea>
    </main>
  );
}
