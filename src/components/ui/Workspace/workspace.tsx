import React, { useState, useEffect } from "react";
import { getFileIcon, getFileIconPreview } from "@/utils/common";
import { IListMeDataType } from "@/types";
import { ScrollArea } from "../ScrollArea/scroll-area";
import { getListMe } from "@/app/api/ApiList";
import { PreviewCardGrid, PreviewCardList } from "@/components/ui/PreviewCard/preview-card";
import PaginationController from "@/components/ui/PaginationController";
export default function Workspace({ view }: { view: string }) {
  const [fetchedFile, setFetchedFile] = useState<IListMeDataType[]>([]);
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(() => {
    async function fetchData() {
      const result = await getListMe({ page: currentPage, limit: 15 });
      setFetchedFile(result.files);
      setTotalFiles(result.totalFiles);
      console.log("Result", result);
    }
    fetchData();
  }, [currentPage]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div>
      {" "}
      <ScrollArea className="h-[calc(100vh-18rem)]">
        {" "}
        <div
          className={`grid ${
            view === "grid"
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              : "grid-cols-1"
          } gap-6`}
        >
          {" "}
          {fetchedFile.map(
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
              const last_modified = new Date(
                file.LastModified
              ).toLocaleDateString("en-GB");
              return (
                <PreviewCardGrid
                  key={index}
                  author="Shad"
                  fullTitle={fileName || ""}
                  title={truncatedFileName || ""}
                  icon={getFileIcon(fileType)}
                  iconPreview={getFileIconPreview(fileType)}
                  last_modified={last_modified}
                />
              );
            }
          )}{" "}
        </div>{" "}
      </ScrollArea>{" "}
      <div className="items-end justify-end flex">
        {" "}
        <PaginationController
          totalFiles={totalFiles}
          limit={15}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />{" "}
      </div>{" "}
    </div>
  );
}
