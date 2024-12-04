"use client";
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
import { getCookies } from "typescript-cookie";
import { useRouter } from "next/navigation";

export default function Workspace({ view }: { view: string }) {
  const [fetchedFile, setFetchedFile] = useState<IListMeDataType[]>([]);
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {

    // 1. Check accessToken and refreshToken in cookies, if expired/not available, redirect to login
    const accessToken = getCookies().accessToken;
    const refreshToken = getCookies().refreshToken;

    if (!accessToken || !refreshToken) {
      router.push("/login");
      return;
    }

    // 2. Fetch Data
    async function fetchData() {
      const result = await getListMe({ page: currentPage, limit: 15 });
      setFetchedFile(result.files);
      console.log(result.files.owner);
      setTotalFiles(result.totalFiles);
    }
    fetchData().catch((error) => console.error(error));
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {fetchedFile.length === 0 ? (
        <div>No files found</div>
      ) : (
        <>
          <ScrollArea
            className={`${
              view === "grid"
                ? "h-[calc(100vh-18rem)]"
                : "h-[calc(100vh-25rem)]"
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
                    file: {
                      Key: string;
                      LastModified: string;
                      owner: IOwner;
                      url: string;
                    },
                    index: number
                  ) => {
                    const fileName = file.Key.split("/").pop();
                    const truncatedFileName =
                      fileName && fileName.length > 12
                        ? fileName.slice(0, 12) + "..."
                        : (fileName ?? "");
                    const extensionFilename = fileName
                      ? fileName.split(".").pop()
                      : "";
                    const fileType = extensionFilename?.toLowerCase() ?? "";
                    const last_modified = new Date(
                      file.LastModified
                    ).toLocaleDateString("en-GB");
                    const author = file.owner?.DisplayName || "Unknown";
                    console.log(author);
                    return (
                      <PreviewCardGrid
                        key={index}
                        author={author}
                        fullTitle={fileName ?? ""}
                        title={truncatedFileName ?? ""}
                        icon={getFileIcon(fileType)}
                        iconPreview={getFileIconPreview(fileType)}
                        last_modified={last_modified}
                        url={file.url}
                      />
                    );
                  }
                )}
              </div>
            ) : (
              <Table className="w-screen">
                <TableHeader className="w-full">
                  <TableRow className="w-screen">
                    <TableHead className="w-1/2">File Name</TableHead>
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
                    const truncatedFileName =
                      fileName && fileName.length > 12
                        ? fileName.slice(0, 12) + "..."
                        : (fileName ?? "");
                    const extensionFilename = fileName
                      ? fileName.split(".").pop()
                      : "";
                    const fileType = extensionFilename?.toLowerCase() ?? "";
                    const last_modified = new Date(
                      file.LastModified
                    ).toLocaleDateString("en-GB");
                    const size = file.Size;
                    const author = file.owner?.DisplayName || "Unknown";
                    return (
                      <ContextRightClick key={index} fileName={fileName ?? ""}>
                        <TableBody className="w-full">
                          <TableRow className="w-screen">
                            <TableCell className="w-1/2">
                              {truncatedFileName}
                            </TableCell>
                            <TableCell className="w-1/6">{fileType}</TableCell>
                            <TableCell className="w-1/6">
                              {(size / 1024 / 1024).toFixed(2) + " MB"}
                            </TableCell>
                            <TableCell className="w-1/6">{author}</TableCell>
                            <TableCell className="w-1/6">
                              {last_modified}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </ContextRightClick>
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
        </>
      )}
    </div>
  );
}
