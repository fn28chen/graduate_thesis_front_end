"use client";
import { cn } from "@/lib/utils";
import { ContextMenuDemo } from "@/context/menu-context";
import { Avatar, AvatarFallback } from "../avatar";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface IPreviewCardProps {
  author: string;
  title: string;
  icon: React.ReactNode;
  iconPreview: React.ReactNode;
  last_modified: string;
}
export function PreviewCard({
  author,
  title,
  icon,
  iconPreview,
  last_modified,
}: IPreviewCardProps) {
  return (
    <div className="max-w-xs w-full group/card border rounded-lg">
      <ContextMenu>
        <ContextMenuTrigger className="flex items-center justify-center rounded-md border border-dashed text-sm">
          <div
            className={cn(
              "cursor-pointer overflow-hidden relative card h-[200px] rounded-md shadow-xl max-w-sm mx-auto flex flex-col justify-between p-4"
            )}
          >
            <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black dark:group-hover/card:bg-slate-800 opacity-60"></div>
            <div className="flex flex-row items-center space-x-4 z-10">
              <div>{icon}</div>
              <div className="flex flex-col">
                <p className="text-sm text-gray-400 flex-wrap">{title}</p>
              </div>
            </div>
            <div
              className="flex justify-center items-center mt-4"
              style={{ fontSize: "44px" }}
            >
              {iconPreview}
            </div>
            <div className="flex flex-row gap-4">
              <Avatar className="w-8 h-8">
                <AvatarFallback>{author[0]}</AvatarFallback>
              </Avatar>
              <p className="flex items-center justify-center text-sm">
                Last Modified: {last_modified}
              </p>
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset disabled>
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                Save Page As...
                <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>Create Shortcut...</ContextMenuItem>
              <ContextMenuItem>Name Window...</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Developer Tools</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked>
            Show Bookmarks Bar
            <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
