"use client";
import { cn } from "@/lib/utils";
import { ContextRightClick } from "@/context/menu-context";
import { Avatar, AvatarFallback } from "../avatar";
import Image from "next/image";

interface IPreviewCardProps {
  author?: string;
  fullTitle?: string;
  title?: string;
  icon?: React.ReactNode;
  iconPreview?: React.ReactNode;
  last_modified?: string;
  url?: string;
}
export function PreviewCardGrid({
  author,
  fullTitle,
  title,
  icon,
  iconPreview,
  last_modified,
  url,
}: IPreviewCardProps) {
  return (
    <div className="max-w-xs w-full group/card border rounded-lg ">
      <ContextRightClick fileName={fullTitle!}>
        <div
          className={cn(
            `cursor-pointer overflow-hidden relative card h-[200px] rounded-md shadow-xl max-w-sm flex flex-col justify-between p-4 w-full`
          )}
        >
          <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black dark:group-hover/card:bg-slate-800 opacity-60"></div>
          <div className="flex flex-row items-center space-x-4">
            <div>{icon}</div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-400 flex-wrap">{title}</p>
            </div>
          </div>
          <div
            className="flex justify-center items-center mt-4 overflow-hidden opacity-50"
            style={{ width: "200px", height: "150px" }}
          >
            <div
              className="flex justify-center items-center mt-4 overflow-hidden opacity-50"
              style={{ width: "75%", height: "75%" }}
            >
              {url && /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url) ? (
                <Image src={url} alt="image" layout="fill" objectFit="cover" />
              ) : (
                iconPreview
              )}
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <Avatar className="w-8 h-8">
              <AvatarFallback>{author![0]}</AvatarFallback>
            </Avatar>
            <p className="flex items-center justify-center text-sm">
              Last Modified: {last_modified}
            </p>
          </div>
        </div>
      </ContextRightClick>
    </div>
  );
}

export function PreviewCardList({
  author,
  title,
  icon,
  iconPreview,
  last_modified,
}: IPreviewCardProps) {
  return (
    <div className="w-full group/card border rounded-lg">
      <ContextRightClick fileName={title!}>
        <div
          className={cn(
            "cursor-pointer overflow-hidden relative card h-[120px] rounded-md shadow-xl flex items-center px-4"
          )}
        >
          <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-slate-800 opacity-60"></div>
          <div className="flex flex-row items-center space-x-4 z-10">
            <div>{icon}</div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-300 font-medium">{title}</p>
              <p className="text-xs text-gray-400">{last_modified}</p>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4 z-10">
            <p className="text-sm text-gray-400">{author}</p>
            {iconPreview}
          </div>
        </div>
      </ContextRightClick>
    </div>
  );
}
