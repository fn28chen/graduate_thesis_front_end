"use client";
import { getInfo } from "@/app/api/ApiList";
import { IPreviewFile } from "@/types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

const PreviewPage = () => {
  const [previewFile, setPreviewFile] = useState<IPreviewFile>();
  const searchParams = useSearchParams();
  const fileName = searchParams.get("fileName");
  const getPreviewFile = useQuery(
    ["getFullUrl", fileName],
    () => getInfo(fileName!),
    {
      enabled: !!fileName,
    }
  );

  // Set previewFile
  useEffect(() => {
    if (getPreviewFile.data) {
      setPreviewFile(getPreviewFile.data);
    }
  }, [getPreviewFile.data]);

  const isImage = (fileName: string | null) => {
    if (!fileName) return false;
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
    const fileExtension = fileName.split(".").pop()?.toLowerCase();
    return imageExtensions.includes(fileExtension!);
  };

  return (
    <div>
      <h2 className="font-bold text-2xl">Preview Page</h2>
      {previewFile && (
        <div className="grid grid-cols-12 gap-4 divide-x-2">
          <div className="col-span-6">
            {fileName && isImage(fileName) ? (
              <img
                src={previewFile.url}
                alt={fileName!}
                style={{ width: "80%", height: "100%" }}
              />
            ) : (
              <p>Sorry, this application only supports previewing images</p>
            )}
          </div>
          <div className="col-span-6 pl-4">
            <p>
              <strong>File Name:</strong> {fileName}
            </p>
            <p>
              <strong>Size:</strong>{" "}
              {previewFile.Size >= 1024 * 1024
              ? `${(previewFile.Size / (1024 * 1024)).toFixed(2)} MB`
              : previewFile.Size >= 1024
              ? `${(previewFile.Size / 1024).toFixed(2)} KB`
              : `${previewFile.Size} B`}
            </p>
            <p>
              <strong>Last Modified:</strong> {previewFile.LastModified}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewPage;
