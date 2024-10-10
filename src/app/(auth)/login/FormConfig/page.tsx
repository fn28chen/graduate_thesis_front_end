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
import { useContext } from "react";
import { UserContext } from "@/context/user-context";
import { useToast } from "@/hooks/use-toast";
import { loginSchema } from "@/components/ui/FormConfig/Schema";
import { getCookie, setCookie } from 'typescript-cookie'

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  // 0. Check pathname
  // console.log("Pathname: ", pathname);
  const formSchema = loginSchema;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
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
        setCookie("accessToken", accessToken, { expires: 1 });
        setCookie("refreshToken", refreshToken, { expires: 1 });

        // Update user context
        setUser(data);
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
