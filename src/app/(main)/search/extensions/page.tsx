"use client";
import { getFileByExtension } from "@/app/api/ApiSearch";
import { PreviewCardGrid } from "@/components/ui/PreviewCard/preview-card";
import { IListMeDataType } from "@/types";
import { getFileIcon, getFileIconPreview } from "@/utils/common";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SearchByExtension() {
  const searchParams = useSearchParams().get("query");
  const [fetchedFile, setFetchedFile] = useState<IListMeDataType[]>([]);
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState<string | null>(null); // State for error handling
  let extensions: string[] = [];

  const fetchData = async (query: string) => {
    try {
      switch (query) {
        case "img":
          extensions = ["png", "jpg", "gif", "bmp", "jpeg"];
          break;
        case "txt":
          extensions = ["txt"];
          break;
        case "aud":
          extensions = ["mp3"];
          break;
        case "mp4":
          extensions = ["mp4", "avi", "mov", "wmv"];
          break;
        case "doc":
          extensions = ["doc", "docx", "xls", "xlsx", "ppt", "pptx"];
          break;
        default:
          extensions = []; // Ensure extensions is initialized to an empty array
          break;
      }
      let response: IListMeDataType[] = [];
      for (const ext of extensions) {
        const res = await getFileByExtension(ext);
        response = response.concat(res);
      }
      setFetchedFile(response);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data"); // Set error message
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  useEffect(() => {
    if (searchParams) {
      void fetchData(searchParams);
    }
  }, [searchParams]);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6`}
    >
      {fetchedFile.map(
        (
          file: { Key: string; LastModified: string; url: string },
          index: number
        ) => {
          const fileName = file.Key.split("/").pop();
            const truncatedFileName =
            fileName && fileName.length > 12
              ? fileName.slice(0, 12) + "..."
              : fileName ?? "";
          const extensionFilename = fileName ? fileName.split(".").pop() : "";
            const fileType = extensionFilename?.toLowerCase() ?? "";
          const last_modified = new Date(file.LastModified).toLocaleDateString(
            "en-GB"
          );
            return (
            <PreviewCardGrid
              key={index}
              author="Shad"
              fullTitle={fileName ?? ""}
              title={truncatedFileName ?? ""}
              icon={getFileIcon(fileType)}
              iconPreview={getFileIconPreview(fileType)}
              last_modified={last_modified}
              url={file.url}
            />
            );
        }
      )}{" "}
    </div>
  );
}
