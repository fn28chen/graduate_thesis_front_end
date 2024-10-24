import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getCookies } from "typescript-cookie";

interface IContextRightClickProps {
  fileName: string;
  children: React.ReactNode;
}

export function ContextRightClick({
  fileName,
  children,
}: IContextRightClickProps) {
  const accessToken = getCookies().accessToken;
  const router = useRouter();

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/action/download-presigned/${fileName}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = response.data;
      router.push(data);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-full w-full items-center justify-center rounded-md border border-dashed text-sm">
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset onClick={handleDownload}>
          Download
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset>Delete</ContextMenuItem>
        <ContextMenuItem inset>Copy</ContextMenuItem>
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
  );
}
