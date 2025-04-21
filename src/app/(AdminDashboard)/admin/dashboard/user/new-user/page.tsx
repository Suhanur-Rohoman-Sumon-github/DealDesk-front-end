"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { ArrowLeft, Save, UploadCloud } from "lucide-react";
import Link from "next/link";

import Image from "next/image";

// User form schema
const formSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  bio: z.string().min(10, "Bio is too short"),
  avatar: z.any().optional(),
});

const NewUser = () => {
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      bio: "",
      avatar: null,
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewAvatar(url);
      form.setValue("avatar", file);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, val]) => {
      if (key === "avatar" && val instanceof File) {
        formData.append("avatar", val);
      } else {
        formData.append(key, val as string);
      }
    });

    // Simulate API call

    alert("User profile created!");

    form.reset();
    setPreviewAvatar(null);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <Button variant="outline" size="sm" asChild>
        <Link href="/users" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Users
        </Link>
      </Button>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
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
                    <Input
                      type="email"
                      placeholder="johndoe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Write about yourself..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormLabel>Profile Picture</FormLabel>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
              <UploadCloud className="w-6 h-6 text-muted-foreground" />
            </div>
            {previewAvatar && (
              <div className="mt-4">
                <Image
                  src={previewAvatar}
                  alt="Profile Preview"
                  width={96}
                  height={96}
                  className="rounded-full object-cover"
                />
              </div>
            )}
          </div>

          <Button type="submit" className="mt-6 flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Profile
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewUser;
