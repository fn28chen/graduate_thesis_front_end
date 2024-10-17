"use client";
import React, { useRef } from "react";
import { Button } from "@/components/ui/Button/button";
import { Grid, List } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { getFileIcon } from "@/utils/common";
import { getFiles } from "@/hooks/use-files";
import { PreviewCard } from "@/components/ui/PreviewCard/preview-card";

export default function Main() {
  const [view, setView] = React.useState<"grid" | "list">("grid");
  const files = getFiles();
  console.log(files);

  return (
    <main className="flex-1 overflow-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-row gap-4">
          <div className="">
            <h2 className="text-3xl font-semibold">Welcome to Drive</h2>
            <p className="text-gray-500">
              {files.files.length} files found in your drive 🎉
            </p>
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
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div
          className={`grid ${
            view === "grid"
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              : "grid-cols-1"
          } gap-6`}
        >
          {files.files.map(
            (file: { Key: string; LastModified: string }, index: number) => {
              const fileName = file.Key.split("/").pop();
              const truncatedFileName =
                fileName && fileName.length > 12
                  ? fileName.slice(0, 12) + "..."
                  : fileName || "";
              const extensionFilename = fileName
                ? fileName.split(".").pop()
                : "";
              const fileType = extensionFilename?.toLowerCase() || "";
                const last_modified = new Date(file.LastModified).toLocaleDateString("en-GB");
              return (
                <PreviewCard
                  key={index}
                  author="Shad"
                  title={truncatedFileName || ""}
                  icon={getFileIcon(fileType)}
                  last_modified={last_modified}
                />
              );
            }
          )}
        </div>
      </ScrollArea>
    </main>
  );
}
