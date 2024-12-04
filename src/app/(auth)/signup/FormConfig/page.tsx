"use client";

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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/components/ui/FormConfig/Schema";
import axios from "axios";
import Config from "@/config";

export default function Register() {
  const router = useRouter();

  // 0. Check pathname
  // console.log(pathname);
  const formSchema = registerSchema;
  // console.log("Pathname: ", pathname);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async ({
    username,
    email,
    password,
  }: z.infer<typeof formSchema>) => {
    const userData = {
      username,
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${Config.NETWORK_CONFIG.API_BASE_URL}` + "/auth/signup",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 201) {
        throw new Error("An error occurred while registering");
      }

      // Navigate to the login page after successful registration
      router.push(Config.PATHNAME.LOGIN);
    } catch (error) {
      console.error("An error occurred:", error);
    }
    // console.log(userData);
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <section className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
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
                  <Input type="password" placeholder="shadcn" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your confirm password"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full p-6" disabled={isLoading}>
            {!isLoading ? "Create Account" : "Waiting..."}
          </Button>
        </form>
      </Form>
    </section>
  );
}
