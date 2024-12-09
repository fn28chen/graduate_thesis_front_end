"use client";

import { type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalProvider,
  ModalTrigger,
  useModal,
} from "@/components/ui/Modal/modal";
import { FileUpload } from "./ui/FileUpload/file-upload";
import { Button } from "./ui/button";
import { createUploadFile } from "@/app/api/ApiList";
import { toast } from "@/hooks/use-toast";
import { getCookie } from "typescript-cookie";
import { formSchema } from "./ui/FormConfig/Schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";

interface NavMainProps {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}

export function NavMain({ items }: NavMainProps) {
  const { open, setOpen } = useModal();
  const queryClient = useQueryClient();

  const mutation = useMutation(createUploadFile, {
    onSuccess: () => {
      queryClient.invalidateQueries("listMe");
      toast({ description: "Upload complete!" });
    },
    onError: (error) => {
      console.error("Upload failed:", error);
      toast({ description: "Upload failed!" });
    },
  });

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uploadFile: undefined,
    },
  });

  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      files.forEach((file) => {
        form.setValue("uploadFile", file);
      });
    }
  };

  const handleUpload = async (data: z.infer<typeof formSchema>) => {
    const { uploadFile } = data;
    // 0. get Access Token
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      throw new Error("No access token found");
    }

    try {
      // 1. Create a FormData object to handle file uploads
      const formData = new FormData();
      formData.append("file", uploadFile);

      // 2. Use mutation to upload file
      mutation.mutate(formData);
    } catch (error) {
      console.error("Upload failed:", error);
      toast({ description: "Upload failed!" });
    }
  };

  const isLoading = form.formState.isSubmitting;
  return (
    <SidebarGroup>
      <SidebarMenu>
        <ModalProvider>
          <Modal>
            <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
              <span className="group-hover/modal-btn:translate-x-60 text-center transition duration-600">
                Upload new file
              </span>
              <div className="-translate-x-60 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-600 text-white z-20">
                📂
              </div>
            </ModalTrigger>
            <ModalBody>
              <ModalContent>
                <form onSubmit={form.handleSubmit(handleUpload)}>
                  <FileUpload onChange={handleFileUpload} />
                  <ModalFooter className="gap-4">
                    <Button
                      className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28"
                      type="button"
                      onClick={() => form.reset()}
                    >
                      Cancel
                    </Button>
                    <ModalTrigger>
                      <Button
                        className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28"
                        type="submit"
                        disabled={isLoading}
                        onClick={() => setOpen(false)}
                      >
                        Upload
                      </Button>
                    </ModalTrigger>
                  </ModalFooter>
                </form>
              </ModalContent>
            </ModalBody>
          </Modal>
        </ModalProvider>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.items?.length ? (
                <>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
