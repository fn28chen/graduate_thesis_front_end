import {
  deleteFile,
  getDownloadPresignedUrl,
  moveToTrash,
  restoreFile,
} from "@/app/api/ApiList";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import config from "@/config";
import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";

interface IContextRightClickProps {
  fileName: string;
  children: React.ReactNode;
}

export function ContextRightClick({
  fileName,
  children,
}: IContextRightClickProps) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const handleDownload = async () => {
    try {
      const response = await getDownloadPresignedUrl(fileName);
      router.push(response);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleShowFullUrl = useMutation(
    async (fileName: string) => {
      const response = await getDownloadPresignedUrl(fileName);
      return response;
    },
    {
      onError: (error) => {
        console.error("Error showing full URL:", error);
      },
    }
  )

  const handleMoveToTrash = useMutation(
    async (fileId: string) => {
      const response = await moveToTrash(fileId);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("listMe");
      },
      onError: (error) => {
        console.error("Error moving file to trash:", error);
      },
    }
  );

  const handleDelete = useMutation(
    async (fileId: string) => {
      const response = await deleteFile(fileId);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("trashFolder");
      },
      onError: (error) => {
        console.error("Error deleting file:", error);
      }
    }
  );

  const handleRestore = useMutation(
    async (fileId: string) => {
      const response = await restoreFile(fileId);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("trashFolder");
      },
      onError: (error) => {
        console.error("Error restoring file:", error);
      }
    }
  );

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
        {pathname !== config.PATHNAME.TRASH && (
          <ContextMenuItem inset onClick={() => handleMoveToTrash.mutate(fileName)}>
            Move To Trash
          </ContextMenuItem>
        )}
        {pathname === config.PATHNAME.TRASH && (
          <ContextMenuItem inset onClick={() => handleDelete.mutate(fileName)}>
            Delete Immediately
          </ContextMenuItem>
        )}
        {pathname === config.PATHNAME.TRASH && (
          <ContextMenuItem inset onClick={() => handleRestore.mutate(fileName)}>
            Restore
          </ContextMenuItem>
        )}
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>
          Show Bookmarks Bar
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem onClick={() => handleShowFullUrl}>Show Full URLs</ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
