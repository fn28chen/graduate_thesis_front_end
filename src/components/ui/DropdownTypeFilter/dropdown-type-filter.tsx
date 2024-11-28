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
import { useRouter } from "next/navigation";
import { getFileByExtension } from "@/app/api/ApiSearch";

const typeFilter = [
  { label: "All", value: "" },
  { label: "Text", value: "txt" },
  { label: "Image", value: "img" },
  { label: "Audio", value: "aud" },
  { label: "Video", value: "mp4" },
  { label: "Document", value: "doc" },
];


export function DropdownTypeFilter() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const router = useRouter();
  const lastResult = React.useRef<any>(null);

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
                  onSelect={async (currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);

                    // Call fetchData based on the selected type
                    let extensions: any[] = [];
                    switch (currentValue) {
                      case "img":
                        extensions = ["png", "jpg", "gif", "bmp", "jpeg"];
                        break;
                      case "txt":
                        extensions = ["txt"];
                        break;
                      case "aud":
                        extensions = ["mp3"];
                        break;
                      case "mp4":
                        extensions = ["mp4", "avi", "mov", "wmv"];
                        break;
                      case "doc":
                        extensions = [
                          "doc",
                          "docx",
                          "xls",
                          "xlsx",
                          "ppt",
                          "pptx",
                        ];
                        break;
                      default:
                        extensions = []; // Ensure extensions is initialized to an empty array
                        break;
                    }

                    if (extensions.length > 0) {
                      try {
                        router.push(`/search/extensions?query=${currentValue}`);
                      } catch (error) {
                        console.error("Error fetching data:", error);
                      }
                    }
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
