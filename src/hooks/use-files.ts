import config from "@/config";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { getCookies } from "typescript-cookie";

export const useFiles = () => {
  const [files, setFiles] = useState([]);

  const fetchFiles = useCallback(async () => {
    try {
      const accessToken = getCookies().accessToken;
      // console.log("Access Token:", accessToken);

      const response = await axios.get(
        `${config.NETWORK_CONFIG.API_BASE_URL}/action/list-me`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return { files, fetchFiles };
};
