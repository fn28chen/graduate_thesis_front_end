"use client";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import Image from "next/image";
import { ContextMenu } from "@/context/menu-context";
import { Avatar, AvatarFallback } from "../avatar";

interface IPreviewCardProps {
  author: string;
  title: string;
  icon: React.ReactNode;
  last_modified: string;
}
export function PreviewCard({
  author,
  title,
  icon,
  last_modified,
}: IPreviewCardProps) {
  const outerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="max-w-xs w-full group/card border rounded-lg" ref={outerRef}>
      <ContextMenu outerRef={outerRef} />
      <div
        className={cn(
          "cursor-pointer overflow-hidden relative card h-[200px] rounded-md shadow-xl max-w-sm mx-auto flex flex-col justify-between p-4"
        )}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black dark:group-hover/card:bg-slate-800 opacity-60"></div>
        <div className="flex flex-row items-center space-x-4 z-10">
          <div>{icon}</div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-400 flex-wrap">{title}</p>
          </div>
        </div>
        <div className="flex justify-center items-center mt-4" style={{ fontSize: '44px' }}>
          {icon}
        </div>
        <div className="flex flex-row gap-4">
          <Avatar className="w-8 h-8">
            <AvatarFallback>{author[0]}</AvatarFallback>
          </Avatar>
          <p className="flex items-center justify-center text-sm">Last Modified: {last_modified}</p>
        </div>
      </div>
    </div>
  );
}
