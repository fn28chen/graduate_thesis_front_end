"use client";
import React, { useEffect } from "react";
import { getTrashFolder } from "@/app/api/ApiList";
import {
  PreviewCardGrid,
  PreviewCardList,
} from "@/components/ui/PreviewCard/preview-card";
import { IOwner } from "@/types";
import { getFileIcon, getFileIconPreview } from "@/utils/common";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function TrashPage() {
  const [trashData, setTrashData] = React.useState<any>(null);

  useEffect(() => {
    async function fetchTrashData() {
      const response = await getTrashFolder();
      setTrashData(response);
    }
    fetchTrashData();
  }, []);
  return (
    <div>
      <h1>Trash</h1>
      {trashData && (
        <ScrollArea className={`h-[calc(100vh-25rem)]`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {trashData.files.map(
              (
                file: { Key: string; LastModified: string; owner: IOwner },
                index: number
              ) => {
                const fileName = file.Key.split("/").pop();
                const truncatedFileName =
                  fileName && fileName.length > 12
                    ? fileName.slice(0, 12) + "..."
                    : fileName || "";
                const extensionFilename = fileName
                  ? fileName.split(".").pop()
                  : "";
                const fileType = extensionFilename?.toLowerCase() || "";
                const last_modified = new Date(
                  file.LastModified
                ).toLocaleDateString("en-GB");
                const author = file.owner?.DisplayName || "Unknown";
                return (
                  <PreviewCardGrid
                    key={index}
                    author={author}
                    fullTitle={fileName || ""}
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
      )}
    </div>
  );
}
