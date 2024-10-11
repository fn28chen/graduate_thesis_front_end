import {
  Home,
  HardDrive,
  Users,
  Clock,
  Star,
  AlertCircle,
  Trash2,
  Database,
} from "lucide-react";
import { IconFileTypePdf } from "@tabler/icons-react";

import ICDoc from "@/components/icon/IconFolder/ICDoc";
import ICSheet from "@/components/icon/IconFolder/ICSheet";
import ICImage from "@/components/icon/IconFolder/ICImage";
import ICPDF from "@/components/icon/IconFolder/ICPDF";
import IconPresentation from "@/components/icon/IconFolder/ICPresentation";
import ICVideo from "@/components/icon/IconFolder/ICVideo";
import ICFile from "@/components/icon/IconFolder/ICFile";

export function getFileIconColor(extension: string) {
  switch (extension) {
    case "doc":
    case "docx":
      return "text-blue-400";
    case "xls":
    case "xlsx":
      return "text-green-400";
    case "ppt":
    case "pptx":
      return `text-yellow-400`;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "bmp":
      return `text-purple-400`;
    case "pdf":
      return "text-red-400";
    case "mp4":
    case "avi":
    case "mov":
    case "wmv":
      return "text-pink-400";
    default:
      return "text-gray-400";
  }
}

export function getFileIcon(extension: string) {
  const iconColor = getFileIconColor(extension);
  // console.log(iconColor);
  const className = `${iconColor}`; // 20px is equivalent to 5 in Tailwind CSS
  switch (extension) {
    case "doc":
    case "docx":
      return <ICDoc width={20} height={20} className={className} />;
    case "xls":
    case "xlsx":
      return <ICSheet width={20} height={20} className={className} />;
    case "ppt":
    case "pptx":
      return <IconPresentation width={20} height={20} className={className} />;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "bmp":
      return <ICImage width={20} height={20} className={className} />;
    case "pdf":
      return <ICPDF width={20} height={20} className={className} />;
    case "mp4":
    case "avi":
    case "mov":
    case "wmv":
      return <ICVideo width={20} height={20} className={className} />;
    default:
      return <ICFile width={20} height={20} className={className} />;
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
