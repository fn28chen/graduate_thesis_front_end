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
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/user-context";
import { useToast } from "@/hooks/use-toast";
import { loginSchema } from "@/components/ui/FormConfig/Schema";
import { getCookies, setCookie } from "typescript-cookie";
import { isTokenExpired } from "@/utils/common";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const router = useRouter();
  const { toast } = useToast();
  const formSchema = loginSchema;

  // 1. Check access token and refresh token in cookies expired or not.
  useEffect(() => {
    const accessToken = getCookies().accessToken;
    const refreshToken = getCookies().refreshToken;

    // Check if tokens are available and not expired
    if (accessToken && refreshToken) {
      // Here you would need to implement a function to check token expiry
      if (isTokenExpired(accessToken) || isTokenExpired(refreshToken)) {
        router.push("/login");
        return;
      }

      // Check user info in local storage
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser)!);
        router.push("/"); // Already logged in
      }
    } else {
      router.push("/login"); // Redirect to login if no tokens
    }
  }, [router, setUser]);

  // 2. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 3. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        `${Config.NETWORK_CONFIG.API_BASE_URL}/auth/login`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        const { accessToken, refreshToken, ...userData } = response.data;

        // Store user data and tokens
        localStorage.setItem("user", JSON.stringify(userData));
        setCookie("accessToken", accessToken, { expires: 1 });
        setCookie("refreshToken", refreshToken, { expires: 1 });

        // Update user context
        setUser(userData);

        toast({
          title: "Login successfully!",
          description: "You're logged in successfully!",
          duration: 1000,
        });

        router.push("/");
      } else {
        console.error("Login failed", response.data);
        toast({
          title: "Login failed!",
          description: "Invalid credentials.",
          duration: 1000,
        });
      }
    } catch (error) {
      console.error("An error occurred while logging in", error);
      toast({
        title: "Login failed!",
        description: "An error occurred. Please try again.",
        duration: 1000,
      });
    }
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
                    placeholder="Enter your email"
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
                    placeholder="Enter your password"
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-4">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
