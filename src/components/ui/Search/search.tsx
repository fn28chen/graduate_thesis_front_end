import React from "react";
import { Input } from "@/components/ui/Input/input";
import { Button } from "@/components/ui/Button/button";
import { Search } from "lucide-react";

function SearchFile() {
  return (
    <div className="flex items-center w-full max-w-2xl">
      <Input
        type="text"
        placeholder="Search in Drive"
        className="mr-4 text-lg"
      />
      <Button size="icon" variant="ghost" className="h-12 w-12 rounded-full">
        <Search className="h-6 w-6" />
      </Button>
    </div>
  );
}

export default SearchFile;
