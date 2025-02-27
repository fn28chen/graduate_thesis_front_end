"use client";
import { DropdownTypeFilter } from "@/components/ui/DropdownTypeFilter/dropdown-type-filter";
import { useSearchParams } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchParams = useSearchParams().get("query");
  return (
    <main className="flex-1 overflow-auto p-6 max-h-screen">
      <div className="flex h-screen">
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex flex-row gap-4">
            <div className="">
              <h2 className="text-3xl font-semibold">Welcome to Drive</h2>
              <h2>Search Results:</h2>{" "}
            </div>
            <div className="flex items-center justify-center">
              <DropdownTypeFilter currentValue={searchParams!} />
            </div>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}
