"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/Button/button";
import { cn } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getMe } from "../api/ApiUser";

interface IUser {
  id: number;
  username: string;
  email: string;
  avatarUrl?: string;
  createdAt?: string;
}

function Profile() {
  const [userProfile, setUserProfile] = useState<IUser>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMe();
        setUserProfile(response);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser().catch((error) => console.error("Error in fetchUser:", error));
  }, []);

  console.log(userProfile);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[400px] sm:max-w-[600px] lg:max-w-[800px] mx-auto">
      <Link
        href="/"
        className={cn(buttonVariants({ variant: "outline" }), "self-start")}
      >
        <ArrowLeft className="w-6 h-6" />
      </Link>
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <h1 className="text-2xl">Profile</h1>
        <Avatar className="w-24 h-24">
          <AvatarImage
            src={userProfile?.avatarUrl}
            alt={userProfile?.username}
          />
          <AvatarFallback delayMs={200} className="text-3xl">
            {userProfile?.username[0]}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold">{userProfile?.username}</h1>
      </div>
      <div className="mt-5 w-full max-w-4xl">
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
