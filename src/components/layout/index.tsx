"use client"
import { useState } from "react";
import { Button } from "@/components/ui/Button/button";
import { Input } from "@/components/ui/Input/input";
import { ScrollArea } from "@/components/ui/ScrollArea/scroll-area";
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
  Search,
  HelpCircle,
  Settings,
  Menu,
  Grid,
  List,
} from "lucide-react";

export default function CloudDrive() {
  const [view, setView] = useState<"grid" | "list">("grid");

  const sidebarItems = [
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

  const files = [
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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="flex flex-col w-64 bg-white p-6 border-r">
        <div className="flex items-center mb-8">
          <HardDrive className="h-8 w-8 text-blue-500 mr-3" />
          <h1 className="text-2xl font-semibold">Cloud Drive</h1>
        </div>
        <Button className="mb-6 text-lg">
          <Plus className="mr-2 h-5 w-5" /> New
        </Button>
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

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <header className="bg-white border-b p-6 flex items-center justify-between">
          <div className="flex items-center w-full max-w-2xl">
            <Input
              type="text"
              placeholder="Search in Drive"
              className="mr-4 text-lg"
            />
            <Button size="icon" variant="ghost" className="h-12 w-12">
              <Search className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Button size="icon" variant="ghost" className="h-12 w-12">
              <HelpCircle className="h-6 w-6" />
            </Button>
            <Button size="icon" variant="ghost" className="h-12 w-12">
              <Settings className="h-6 w-6" />
            </Button>
            <Button size="icon" variant="ghost" className="h-12 w-12">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold">Welcome to Drive</h2>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant={view === "grid" ? "default" : "outline"}
                onClick={() => setView("grid")}
              >
                <Grid className="h-5 w-5 mr-2" /> Grid
              </Button>
              <Button
                size="sm"
                variant={view === "list" ? "default" : "outline"}
                onClick={() => setView("list")}
              >
                <List className="h-5 w-5 mr-2" /> List
              </Button>
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div
              className={`grid ${
                view === "grid"
                  ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
                  : "grid-cols-1"
              } gap-6`}
            >
              {files.map((file, index) => (
                <div
                  key={index}
                  className={`bg-white p-6 rounded-lg shadow-md ${
                    view === "list" ? "flex items-center" : ""
                  }`}
                >
                  <div
                    className={`${getFileIconColor(file.type)} rounded-lg p-4 ${
                      view === "list" ? "mr-6" : "mb-4"
                    }`}
                  >
                    {getFileIcon(file.type)}
                  </div>
                  <p className="text-lg font-medium truncate">{file.name}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}

function getFileIconColor(type: string) {
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

function getFileIcon(type: string) {
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
