import axios from "axios";
import { useEffect, useState } from "react";
import config from "@/config";
import { getCookies } from "typescript-cookie";

import {
  ChevronRight,
  Home,
  HardDrive,
  Users,
  Clock,
  Star,
  AlertCircle,
  Trash2,
  Database,
  FileText,
  FileSpreadsheet,
  FileImage,
  FileVideo,
  File,
  FilePieChartIcon,
} from "lucide-react";
import { IconFileTypePdf } from "@tabler/icons-react";

export function getFileIconColor(extension: string) {
  switch (extension) {
    case "doc":
    case "docx":
      return "text-blue-600";
    case "xls":
    case "xlsx":
      return "text-green-600";
    case "ppt":
    case "pptx":
      return "text-yellow-600";
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "bmp":
      return "text-purple-600";
    case "pdf":
      return "text-red-600";
    case "mp4":
    case "avi":
    case "mov":
    case "wmv":
      return "text-pink-600";
    default:
      return "text-gray-600";
  }
}

export function getFileIcon(extension: string) {
  switch (extension) {
    case "doc":
    case "docx":
      return <FileText className="h-8 w-8" />;
    case "xls":
    case "xlsx":
      return <FileSpreadsheet className="h-8 w-8" />;
    case "ppt":
    case "pptx":
      return <FilePieChartIcon className="h-8 w-8" />;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "bmp":
      return <FileImage className="h-8 w-8" />;
    case "pdf":
      return <IconFileTypePdf className="h-8 w-8" />;
    case "mp4":
    case "avi":
    case "mov":
    case "wmv":
      return <FileVideo className="h-8 w-8" />;
    default:
      return <File className="h-8 w-8" />;
  }
}

export const sidebarItems = [
  { icon: Home, label: "Home" },
  { icon: HardDrive, label: "My Drive" },
  { icon: Users, label: "Computers" },
  { icon: Users, label: "Shared with me" },
  { icon: Clock, label: "Recent" },
  { icon: Star, label: "Starred" },
  { icon: AlertCircle, label: "Spam" },
  { icon: Trash2, label: "Trash" },
  { icon: Database, label: "Storage" },
];
