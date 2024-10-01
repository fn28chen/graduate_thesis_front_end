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
  Plus,
  Grid,
  List,
} from "lucide-react";

export function getFileIconColor(type: string) {
  switch (type) {
    case "doc":
      return "bg-blue-100 text-blue-600";
    case "sheet":
      return "bg-green-100 text-green-600";
    case "slide":
      return "bg-yellow-100 text-yellow-600";
    case "image":
      return "bg-purple-100 text-purple-600";
    case "pdf":
      return "bg-red-100 text-red-600";
    case "video":
      return "bg-pink-100 text-pink-600";
    default:
      return "bg-gray-100 text-gray-600";
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

export const files = [
  { name: "Document 1", type: "doc" },
  { name: "Spreadsheet 1", type: "sheet" },
  { name: "Presentation 1", type: "slide" },
  { name: "Image 1", type: "image" },
  { name: "PDF 1", type: "pdf" },
  { name: "Video 1", type: "video" },
  { name: "Document 2", type: "doc" },
  { name: "Spreadsheet 2", type: "sheet" },
  { name: "Presentation 2", type: "slide" },
  { name: "Image 2", type: "image" },
  { name: "PDF 2", type: "pdf" },
  { name: "Video 2", type: "video" },
];

export function getFileIcon(type: string) {
  switch (type) {
    case "doc":
      return <ChevronRight className="h-8 w-8" />;
    case "sheet":
      return <ChevronRight className="h-8 w-8" />;
    case "slide":
      return <ChevronRight className="h-8 w-8" />;
    case "image":
      return <ChevronRight className="h-8 w-8" />;
    case "pdf":
      return <ChevronRight className="h-8 w-8" />;
    case "video":
      return <ChevronRight className="h-8 w-8" />;
    default:
      return <ChevronRight className="h-8 w-8" />;
  }
}
