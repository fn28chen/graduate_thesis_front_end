import {
  HardDrive,
  Users,
  Clock,
  Star,
  AlertCircle,
  Trash2,
  Database,
  Home,
} from "lucide-react";

import ICDoc from "@/components/icon/IconFolder/ICDoc";
import ICSheet from "@/components/icon/IconFolder/ICSheet";
import ICImage from "@/components/icon/IconFolder/ICImage";
import ICPDF from "@/components/icon/IconFolder/ICPDF";
import IconPresentation from "@/components/icon/IconFolder/ICPresentation";
import ICVideo from "@/components/icon/IconFolder/ICVideo";
import ICFile from "@/components/icon/IconFolder/ICFile";
import ICDocPreview from "@/components/icon/IconPreview/ICDocPreview";
import ICSheetPreview from "@/components/icon/IconPreview/ICSheetPreview";
import IconPresentationPreview from "@/components/icon/IconPreview/ICPresentationPreview";
import ICFilePreview from "@/components/icon/IconPreview/ICFilePreview";
import ICVideoPreview from "@/components/icon/IconPreview/ICVideoPreview";
import ICPDFPreview from "@/components/icon/IconPreview/ICPDFPreview";
import ICImagePreview from "@/components/icon/IconPreview/ICImagePreview";

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
  const className = `${iconColor}`;
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
      return <ICImage width={28} height={28} className={className} />;
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

export function getFileIconPreview(extension: string) {
  switch (extension) {
    case "doc":
    case "docx":
      return <ICDocPreview width={20} height={20} />;
    case "xls":
    case "xlsx":
      return <ICSheetPreview width={20} height={20} />;
    case "ppt":
    case "pptx":
      return <IconPresentationPreview width={20} height={20} />;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "bmp":
      return <ICImagePreview width={28} height={28} />;
    case "pdf":
      return <ICPDFPreview width={20} height={20} />;
    case "mp4":
    case "avi":
    case "mov":
    case "wmv":
      return <ICVideoPreview width={20} height={20} />;
    default:
      return <ICFilePreview width={20} height={20} />;
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

export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log("Token payload", payload);
    const expiry = payload.exp;
    const now = Math.floor(Date.now() / 1000);
    return now > expiry;
  } catch (error) {
    console.error("Failed to parse token", error);
    return true;
  }
}
