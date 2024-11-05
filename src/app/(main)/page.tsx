"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/Button/button";
import { Grid, List } from "lucide-react";
import { getListMe } from "../api/ApiList";
import Workspace from "@/components/ui/Workspace/workspace";
import { DropdownTypeFilter } from "@/components/ui/DropdownTypeFilter/dropdown-type-filter";
import { getCookies, setCookie } from "typescript-cookie";
import { useRouter } from "next/navigation";
import config from "@/config";

export default function Main() {
  const [view, setView] = React.useState<"grid" | "list">("grid");
  const [fetchedFile, setFetchedFile] = React.useState<{
    files: { Key: string; LastModified: string }[];
  }>({ files: [] });

  const accessToken = getCookies().accessToken;
  const refreshToken = getCookies().refreshToken;

  const router = useRouter();

  useEffect(() => {
    if (!accessToken || !refreshToken) {
      router.push(config.PATHNAME.LOGIN);
      return;
    }

    async function fetchData() {
      const result = await getListMe({ page: 1, limit: 15 });
      setFetchedFile(result);
    }

    fetchData();
  }, [accessToken, refreshToken, router]);

  return (
    <main className="flex-1 overflow-auto p-6 max-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-row gap-4">
          <div className="">
            <h2 className="text-3xl font-semibold">Welcome to Drive</h2>
            <p className="text-gray-500">
              {fetchedFile.files.length} files found in your drive 🎉
            </p>
          </div>
          <div className="flex items-center justify-center">
            <DropdownTypeFilter />
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant={view === "grid" ? "default" : "outline"}
            onClick={() => setView("grid")}
          >
            <Grid className="h-5 w-5 mr-2" /> Grid
          </Button>
          <Button
            size="sm"
            variant={view === "list" ? "default" : "outline"}
            onClick={() => setView("list")}
          >
            <List className="h-5 w-5 mr-2" /> List
          </Button>
        </div>
      </div>
      <Workspace view={view} />
    </main>
  );
}
