"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/Button/button";
import { cn } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import { ArrowLeft, CloudUploadIcon } from "lucide-react";
import Box from "@mui/material/Box";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { profile, updateAvatar } from "../api/ApiUser";
import Modal from "@mui/material/Modal";
import { Button, styled, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface IUser {
  user: {
    username: string;
    email: string;
    avatarUrl?: string;
    createdAt?: string;
  };
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#000000",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Profile() {
  const [userProfile, setUserProfile] = React.useState<IUser["user"] | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const data = new FormData();
    data.append("file", files[0]);

    try {
      await updateAvatar(data);
      handleClose();
      router.refresh();
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  }

  useEffect(() => {
    async function fetchProfile() {
      try {
        const userProfile = await profile();
        setUserProfile(userProfile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }

    fetchProfile().catch(console.error);
  }, [userProfile?.username]);

  return (
    <div className="flex flex-col items-center justify-center">
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
          <AvatarImage
            src={userProfile?.avatarUrl}
          />
          <AvatarFallback delayMs={200} className="text-3xl">
            {userProfile?.username[0]}
          </AvatarFallback>
        </Avatar>

        <div>
          <Button onClick={handleOpen} variant="contained" color="primary">
            Update Avatar
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Choose a file to upload
              </Typography>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload files
                <VisuallyHiddenInput
                  type="file"
                  onChange={uploadAvatar}
                  multiple
                />
              </Button>
            </Box>
          </Modal>
        </div>
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
