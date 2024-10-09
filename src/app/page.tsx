"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout";
import { UserContext } from "@/context/user-context";
import Config from "@/config";

export default function Home() {
  const router = useRouter();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      router.push(Config.PATHNAME.LOGIN);
    }
  }, [router]);

  return <Layout />;
}
