"use client";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

export default function Login() {
  const { setUser } = useContext(UserContext);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  
  // 0. Check pathname
  console.log("Pathname: ", pathname);
  const formSchema = loginSchema;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful", data);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);

        toast({
          title: "Login successfully!",
          description: "You're login successfully!",
          duration: 1000,
        });
      } else {
        const errorData = await response.json();
        console.error("Login failed", errorData);

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
