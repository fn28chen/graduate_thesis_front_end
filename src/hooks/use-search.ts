import { useEffect, useState } from "react";
import { IListMeDataType } from "@/types";
import { getFileByName, getFileByExtension } from "@/app/api/ApiSearch";

export const fetchFilesByName = async (name: string) => {
  const [files, setFiles] = useState<IListMeDataType[]>([]);
  const [loading, setLoading] = useState(false);
  setLoading(true);
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await getFileByName(name);
        setFiles(response);
      } catch (error) {
        console.error("Error fetching files by name:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, [name]);
  return { files, loading };
};

export const fetchFilesByExtension = async (extension: string) => {
  const [files, setFiles] = useState<IListMeDataType[]>([]);
  const [loading, setLoading] = useState(false);
  setLoading(true);
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await getFileByExtension(extension);
        setFiles(response);
      } catch (error) {
        console.error("Error fetching files by extension:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, [extension]);
  return { files, loading };
};
