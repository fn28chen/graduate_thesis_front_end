"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { getCookies } from "typescript-cookie";
import { useRouter } from "next/navigation";

const typeFilter = [
  { label: "All", value: "" },
  { label: "Text", value: "text" },
  { label: "Image", value: "png" },
  { label: "Audio", value: "audio" },
  { label: "Video", value: "video" },
  { label: "Document", value: "document" },
];

export function DropdownTypeFilter() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const accessToken = getCookies().accessToken;
  const router = useRouter();
  const fetchData = async (query: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/search/extension?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // Handle the response data as needed
      console.log(response.data);
      router.push(`/search/extensions?query=${query}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? typeFilter.find((type) => type.value === value)?.label
            : "Select Type..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No file found.</CommandEmpty>
            <CommandGroup>
              {typeFilter.map((type) => (
                <CommandItem
                  key={type.value}
                  value={type.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);

                    // Call fetchData if "Image" is selected
                    if (currentValue === "png") {
                      fetchData("png");
                    }
                    // Add more conditions for different types if necessary
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === type.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {type.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
