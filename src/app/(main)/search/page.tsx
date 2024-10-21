"use client";
import React, { useEffect, useState } from "react";
import { getFileByName } from "../../api/ApiSearch";
import { IListMeDataType } from "@/types";
import { useSearchParams } from "next/navigation";
import { fetchFilesByName } from "@/hooks/use-search";

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
      // Only fetch if name is not empty
      fetchFiles();
    }
  }, [name]); // Dependency array to avoid infinite loop

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2 className="text-3xl font-semibold">Search results</h2>
          {files.length > 0 ? (
            <ul>
              {files.map((file) => (
                <li key={file.ETag}>{file.Key}</li> // Assuming each file has an id and name
              ))}
            </ul>
          ) : (
            <p>No files found.</p>
          )}
        </div>
      )}
    </div>
  );
}
