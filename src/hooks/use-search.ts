import { useEffect, useState } from "react";
import { IListMeDataType } from "@/types";
import { getFileByName, getFileByExtension } from "@/app/api/ApiSearch";

export const fetchFilesByName = (name: string) => {
  const [files, setFiles] = useState<IListMeDataType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getFileByName(name)
      .then((response) => {
        setFiles(response);
      })
      .catch((error) => {
        console.error("Error fetching files by name:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  return { files, loading };
};

export const fetchFilesByExtension = (extension: string) => {
  const [files, setFiles] = useState<IListMeDataType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getFileByExtension(extension)
      .then((response) => {
        setFiles(response);
      })
      .catch((error) => {
        console.error("Error fetching files by extension:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [extension]);

  return { files, loading };
};
