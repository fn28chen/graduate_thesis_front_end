"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/Button/button";
import { cn } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

interface IUser {
  user: {
    username: string;
    email: string;
    avatar?: string;
    createdAt?: string;
  };
}
function Profile() {
  const storageUser = localStorage.getItem("user");
  const user: IUser | null = storageUser ? JSON.parse(storageUser) : null;
  const userProfile = user?.user;

  if (!user) {
    return null;
  }

  return (
    <div className="m-10">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <ArrowLeft className="w-6 h-6" />
      </Link>
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <h1 className="text-2xl">Profile</h1>
        <Avatar className="w-24 h-24">
          <AvatarImage src={userProfile?.avatar} alt={userProfile?.username} />
          <AvatarFallback delayMs={200} className="text-3xl">
            {userProfile?.username[0]}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold">{userProfile?.username}</h1>
      </div>
      <div className="mt-5">
        <p>Email: {userProfile?.email}</p>
        <p>
          Created At:{" "}
          {userProfile?.createdAt
            ? new Date(userProfile.createdAt).toLocaleDateString("en-GB")
            : ""}
        </p>
      </div>
    </div>
  );
}

export default Profile;
