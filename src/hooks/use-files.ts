import { useEffect, useState, useCallback } from "react";
import { IListMeDataType } from "@/types";
import { getListMe } from "@/app/api/ApiList";

export function useGetFiles(page: number, limit: number) {
  const [files, setFiles] = useState<IListMeDataType[]>([]);
  const [fetchedFile, setFetchedFile] = useState<{ files: { Key: string; LastModified: string }[] }>({ files: [] });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const result = await getListMe({ page: 1, limit: 50 });
      setFetchedFile(result);
    }
    fetchData();
  }, [page, limit, files]);

  return { files, fetchedFile, loading };
}