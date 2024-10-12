import config from "@/config";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { getCookies } from "typescript-cookie";

export const useFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    try {
      const accessToken = getCookies().accessToken;

      const response = await axios.get(
        `${config.NETWORK_CONFIG.API_BASE_URL}/action/list-me`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Chỉ cập nhật nếu dữ liệu mới khác với dữ liệu hiện tại
      if (JSON.stringify(response.data) !== JSON.stringify(files)) {
        setFiles(response.data);
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