import React, { useState, useEffect } from "react";
import { getFileIcon, getFileIconPreview } from "@/utils/common";
import { IListMeDataType, IOwner } from "@/types";
import { ScrollArea } from "../ScrollArea/scroll-area";
import { getListMe } from "@/app/api/ApiList";
import { PreviewCardGrid } from "@/components/ui/PreviewCard/preview-card";
import PaginationController from "@/components/ui/PaginationController";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ContextRightClick } from "@/context/menu-context";

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
      <ScrollArea
        className={`${
          view === "grid" ? "h-[calc(100vh-18rem)]" : "h-[calc(100vh-30rem)]"
        }`}
      >
        {view === "grid" ? (
          <div
            className={`grid ${
              view === "grid"
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                : "grid-cols-1"
            } gap-6`}
          >
            {fetchedFile.map(
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
        ) : (
          <Table className="w-screen">
            <TableHeader className="w-full">
              <TableRow className="w-screen">
                <TableHead className="w-[300px]">File Name</TableHead>
                <TableHead className="w-[300px]">Type</TableHead>
                <TableHead className="w-[100px]">Size</TableHead>
                <TableHead className="w-[300px]">Author</TableHead>
                <TableHead className="w-[300px]">Last Modified</TableHead>
              </TableRow>
            </TableHeader>
            {fetchedFile.map(
              (
                file: {
                  Key: string;
                  LastModified: string;
                  Size: number;
                  owner: IOwner;
                },
                index: number
              ) => {
                const fileName = file.Key.split("/").pop();
                const extensionFilename = fileName
                  ? fileName.split(".").pop()
                  : "";
                const fileType = extensionFilename?.toLowerCase() || "";
                const last_modified = new Date(
                  file.LastModified
                ).toLocaleDateString("en-GB");
                const size = file.Size;
                const author = file.owner?.DisplayName || "Unknown";
                return (
                  <TableBody className="w-full">
                    <TableRow className="w-screen">
                      <ContextRightClick fileName={fileName || ""}>
                        <TableCell className="w-[300px]">{fileName}</TableCell>
                      </ContextRightClick>
                      <TableCell className="w-[100px]">{fileType}</TableCell>
                      <TableCell className="w-[100px]">
                        {(size / 1024 / 1024).toFixed(2) + " MB"}
                      </TableCell>
                      <TableCell className="w-[300px]">{author}</TableCell>
                      <TableCell className="w-[300px]">
                        {last_modified}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                );
              }
            )}
          </Table>
        )}
      </ScrollArea>
      <div className="items-end justify-end flex">
        <PaginationController
          totalFiles={totalFiles}
          limit={15}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
