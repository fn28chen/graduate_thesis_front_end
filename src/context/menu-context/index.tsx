import { deleteFile, getDownloadPresignedUrl, moveToTrash } from "@/app/api/ApiList";
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
import { useRouter } from "next/navigation";

interface IContextRightClickProps {
  fileName: string;
  children: React.ReactNode;
}

export function ContextRightClick({
  fileName,
  children,
}: IContextRightClickProps) {
  const router = useRouter();

  const handleDownload = async () => {
    try {
      const response = await getDownloadPresignedUrl(fileName);
      router.push(response);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleMoveToTrash = async () => {
    try {
      const response = await moveToTrash(fileName);
      router.push(response);
    } catch (error) {
      console.error("Error when move to trash: ", error);
    }
  }

  const handleDelete = async () => {
    try {
      const response = await deleteFile(fileName);
      router.push(response);
    } catch (error) {
      console.error("Error when delete file: ", error);
    }
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-full w-full items-center justify-center rounded-md">
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset onClick={handleDownload}>
          Download
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset onClick={handleMoveToTrash}>Move To Trash</ContextMenuItem>
        <ContextMenuItem inset onClick={handleDelete}>Delete Immediately</ContextMenuItem>
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
