import config from "@/config";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { getCookies } from "typescript-cookie";
import { IListMeDataType } from "@/types";
import apiRequest from "@/app/api/Fetcher";
import { getListMe } from "@/app/api/ApiList";

export const useFiles = () => {
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