"use client";
import React, { useEffect, useState } from "react";
import { getFileByName } from "../../api/ApiSearch";
import { IListMeDataType } from "@/types";
import { useSearchParams } from "next/navigation";
import { PreviewCardGrid } from "@/components/ui/PreviewCard/preview-card";
import { getFileIcon, getFileIconPreview } from "@/utils/common";

export default function Search() {
  const searchparams = useSearchParams();
  const name = searchparams.get("query") || "";
  const [files, setFiles] = useState<IListMeDataType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await getFileByName(name);
        setFiles(response);
      } catch (error) {
        console.error("Error fetching files by name:", error);
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchFiles();
    }
  }, [name]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <main className="flex-1 overflow-auto p-6 max-h-screen">
          <h2 className="text-3xl font-semibold">Search results</h2>
          {files.length > 0 ? (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6`}
            >
              {files.map(
                (
                  file: { Key: string; LastModified: string; url: string },
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
                  return (
                    <PreviewCardGrid
                      key={index}
                      author="Shad"
                      fullTitle={fileName || ""}
                      title={truncatedFileName || ""}
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
            <p>No files found.</p>
          )}
        </main>
      )}
    </div>
  );
}
