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
import config from "@/config";
import { useQuery } from "react-query";

export default function Workspace({ view }: { view: string }) {
  const [fetchedFile, setFetchedFile] = useState<IListMeDataType[]>([]);
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();
  const getFolderMe = useQuery(
    ["listMe", currentPage],
    () => getListMe({ page: currentPage, limit: 15 }),
    { keepPreviousData: true }
  );

  // Set fetchedFile and totalFiles
  useEffect(() => {
    if (getFolderMe.data) {
      setFetchedFile(getFolderMe.data.files);
      setTotalFiles(getFolderMe.data.totalFiles);
    }
  }, [getFolderMe.data]);

  useEffect(() => {
    // 1. Check accessToken and refreshToken in cookies, if expired/not available, redirect to login
    const accessToken = getCookies().accessToken;
    const refreshToken = getCookies().refreshToken;

    if (!accessToken || !refreshToken) {
      router.push(config.PATHNAME.LOGIN);
      return;
    }
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
            className={`h-[calc(100vh-16rem)]
            `}
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
              <Table className="w-full">
                <TableHeader className="relative">
                  <TableRow className="">
                    <TableHead className="">
                      <div className="grid grid-cols-12 gap-4 sticky top-0 z-10">
                        <div className="col-span-6">File Name</div>
                        <div className="col-span-1">File Type</div>
                        <div className="col-span-1">Size</div>
                        <div className="col-span-2">Author</div>
                        <div className="col-span-2">Upload Date</div>
                      </div>
                    </TableHead>
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
                    const fileType = extensionFilename?.toLowerCase() ?? "";
                    const last_modified = new Date(
                      file.LastModified
                    ).toLocaleDateString("en-GB");
                    const size = file.Size;
                    const author = file.owner?.DisplayName || "Unknown";
                    return (
                      <ContextRightClick key={index} fileName={fileName ?? ""}>
                        <TableRow className="w-full">
                          <TableCell className="w-full grid grid-cols-12 gap-4">
                            <div className="col-span-6">{fileName}</div>
                            <div className="col-span-1">{fileType}</div>
                            <div className="col-span-1">
                              {(size / 1024 / 1024).toFixed(2) + " MB"}
                            </div>
                            <div className="col-span-2">{author}</div>
                            <div className="col-span-2">{last_modified}</div>
                          </TableCell>
                        </TableRow>
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
