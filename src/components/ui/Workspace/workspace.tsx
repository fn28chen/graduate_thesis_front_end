import React, { useState, useEffect } from "react";
import { ScrollArea } from "../ScrollArea/scroll-area";
import { IListMeDataType } from "@/types";
import { getListMe } from "@/app/api/ApiList";
import { PreviewCard } from "../PreviewCard/preview-card";
import { getFileIcon, getFileIconPreview } from "@/utils/common";

export default function Workspace({ view }: { view: string }) {
  const [fetchedFile, setFetchedFile] = useState<IListMeDataType[]>([]);
  useEffect(() => {
    async function fetchData() {
      const result = await getListMe({ page: 1, limit: 50 });
      setFetchedFile(result.files);
      console.log("Result", result);
    }
    fetchData();
  }, []);
  return (
    <ScrollArea className="h-[calc(100vh-12rem)]">
      <div
        className={`grid ${
          view === "grid"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            : "grid-cols-1"
        } gap-6`}
      >
        {fetchedFile.map(
          (file: { Key: string; LastModified: string }, index: number) => {
            const fileName = file.Key.split("/").pop();
            const truncatedFileName =
              fileName && fileName.length > 12
                ? fileName.slice(0, 12) + "..."
                : fileName || "";
            const extensionFilename = fileName ? fileName.split(".").pop() : "";
            const fileType = extensionFilename?.toLowerCase() || "";
            const last_modified = new Date(
              file.LastModified
            ).toLocaleDateString("en-GB");
            return (
              <PreviewCard
                key={index}
                author="Shad"
                title={truncatedFileName || ""}
                icon={getFileIcon(fileType)}
                iconPreview={getFileIconPreview(fileType)}
                last_modified={last_modified}
              />
            );
          }
        )}
      </div>
    </ScrollArea>
  );
}
