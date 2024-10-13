import { useEffect, useState, useCallback } from "react";
import { IListMeDataType } from "@/types";
import { getListMe, createUploadFile } from "@/app/api/ApiList";

export const getFiles = () => {
  const [files, setFiles] = useState<IListMeDataType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getListMe();

      // Chỉ cập nhật nếu dữ liệu mới khác với dữ liệu hiện tại
      if (JSON.stringify(response) !== JSON.stringify(files)) {
        setFiles(response);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setLoading(false);
    }
  }, [files]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return { files, fetchFiles, loading };
};
