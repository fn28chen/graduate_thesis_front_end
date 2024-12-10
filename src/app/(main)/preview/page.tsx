"use client";
import { getInfo } from "@/app/api/ApiList";
import { IListMeDataType, IPreviewFile } from "@/types";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

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

  console.log(getPreviewFile.data);

  return (
    <div>
      <h2>Preview Page</h2>
      {previewFile && (
        <div className="grid grid-cols-12 gap-4 divide-x-2">
          <div className="col-span-6">
            <img
              src={previewFile.url}
              alt={fileName!}
              style={{ width: "80%", height: "100%" }}
            />
          </div>
          <div className="col-span-6 pl-4">
            <p>
              <strong>File Name:</strong> {fileName}
            </p>
            <p>
              <strong>Size:</strong> {previewFile.Size}
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
