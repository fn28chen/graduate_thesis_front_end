"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import Config from "@/config";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/user-context";
import { useToast } from "@/hooks/use-toast";
import { loginSchema } from "@/components/ui/FormConfig/Schema";
import { getCookies, setCookie } from 'typescript-cookie'

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // 0. Check pathname
  // console.log("Pathname: ", pathname);
  const formSchema = loginSchema;

  // 1. Check access token and refresh token in cookies expired or not. If expired, redirect to login page.
  // 2. Check user information in local storage and access token, refresh token in cookies. If local storage has user and cookies have access token and refresh token, then user is already logged in; otherwise, redirect to login page.
  // useEffect(() => {
  //   const accessToken = getCookies().accessToken;
  //   const refreshToken = getCookies().refreshToken;
  //   setUser(JSON.parse(localStorage.getItem("user") || "{}"));
  //   // console.log("Access Token:", accessToken);
  //   // console.log("Refresh Token:", refreshToken);
  //   // console.log(user);

  //   if (user && accessToken && refreshToken) {
  //     router.push("/");
  //   }

  // }, [router, setUser]);

  // 3. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 4. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post(
        `${Config.NETWORK_CONFIG.API_BASE_URL}` + "/auth/login",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        const data = response.data;
        // console.log("Login successful", data);

        // Store part of user data in localStorage
        const { accessToken, refreshToken, ...userData } = data;
        localStorage.setItem("user", JSON.stringify(userData));

        // Store accessToken and refreshToken in cookies
        // Set cookies to expire in 1 day
        setCookie("accessToken", accessToken, { expires: 1 });
        setCookie("refreshToken", refreshToken, { expires: 1 });

        // Update user context
        setUser(data.user);
        // console.log(user);

        toast({
          title: "Login successfully!",
          description: "You're login successfully!",
          duration: 1000,
        });
      } else {
        console.error("Login failed", response.data);

        toast({
          title: "Login failed!",
          description: "Login failed!",
          duration: 1000,
        });
      }
    } catch (error) {
      console.error("An error occurred while logging in", error);
      toast({
        title: "Login failed!",
        description: "Login failed!",
        duration: 1000,
      });
    }
  }

  const handleSubmit = () => {
    router.push("/");
  };

  return (
    <section className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="shadcn"
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="shadcn"
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-4">
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
