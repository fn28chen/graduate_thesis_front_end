"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
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
      <h1 className="text-2xl">Profile</h1>
      <div className="flex flex-col items-center justify-center w-full">
        <Avatar>
          <AvatarImage src={userProfile?.avatar} alt={userProfile?.username} />
          <AvatarFallback>{userProfile?.username[0]}</AvatarFallback>
        </Avatar>
        <h1>{userProfile?.username}</h1>
      </div>
      <div className="mt-5">
        <p>Email: {userProfile?.email}</p>
        <p>Created At: {userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString('en-GB') : ''}</p>
      </div>
    </div>
  );
}

export default Profile;
