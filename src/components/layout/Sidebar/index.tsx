"use client";
import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "typescript-cookie";
import { sidebarItems } from "@/utils/common";
import { Button } from "@/components/ui/Button/button";
import { FileUpload } from "@/components/ui/FileUpload/file-upload";
import { HardDrive } from "lucide-react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/Modal/modal";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUploadFile } from "@/app/api/ApiList";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  uploadFile: z.instanceof(File, {
    message: "Please upload a file",
  }),
});

export default function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

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
      console.log("Upload file:", uploadFile);
      const formData = new FormData();
      formData.append("file", uploadFile);

      // 2. Send request to upload file
      const response = await createUploadFile(formData);
      console.log("Response: ", response);
      console.log("Upload successful:", response);
      toast({ description: "Upload complete!" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Upload failed:", error);
      toast({ description: "Upload failed!" });
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <aside className="flex flex-col w-64 p-6 border-r">
      <div className="flex items-center mb-8">
        <HardDrive className="h-8 w-8 text-blue-500 mr-3" />
        <h1 className="text-2xl font-semibold">Cloud Drive</h1>
      </div>
      <Modal>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Upload new file
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
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
                <Button
                  className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28"
                  type="submit"
                  disabled={isLoading}
                >
                  Upload
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </ModalBody>
      </Modal>
      <nav className="space-y-2">
        {sidebarItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start text-lg py-3"
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Button>
        ))}
      </nav>
      <div className="mt-auto text-base text-gray-500">
        <p>7.5 GB of 15 GB used</p>
        <Button variant="link" className="p-0 h-auto text-base">
          Get more storage
        </Button>
      </div>
    </aside>
  );
}
