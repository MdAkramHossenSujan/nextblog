"use client";

import handleSubmission from "@/app/utils/actions";
import uploadImage from "@/components/shared/uplaodImage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function AddBlog() {
  const [contentImage, setContentImage] = useState<string>("");
  const [authorImage, setAuthorImage] = useState<string>("");
const router=useRouter()
  const handleUploadContentImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.[0]) return;
    const url = await uploadImage(e.target.files[0]);
    setContentImage(url);
  };

  const handleUploadAuthorImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.[0]) return;
    const url = await uploadImage(e.target.files[0]);
    setAuthorImage(url);
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);

  // append uploaded images from state
  if (contentImage) formData.set("imageUrl", contentImage);
  if (authorImage) formData.set("authorImage", authorImage);

  try {
    await handleSubmission(formData); // await server action
    toast.success("Blog added successfully!"); // toast after success
    form.reset();
    setContentImage("");
    setAuthorImage("");
    router.push("/dashboard");
  } catch (err: unknown) {
    if (err instanceof Error) toast.error(err.message);
    else toast.error("Failed to add blog.");
    console.error(err);
  }
};


  return (
    <div className="flex justify-center py-10">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Add Your Blog</CardTitle>
          <CardDescription>Create a new blog post and share it.</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                required
                id="title"
                name="title"
                type="text"
                placeholder="Title of the blog"
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                required
                id="content"
                name="content"
                placeholder="Write the content here..."
              />
            </div>

            {/* Blog Image */}
            <div className="space-y-2">
              <Label htmlFor="blogImage">Blog Image</Label>
              <Input
                id="blogImage"
                name="imageUrl"
                type="file"
                accept="image/*"
                onChange={handleUploadContentImage}
              />
            </div>

            {/* Author Name */}
            <div className="space-y-2">
              <Label htmlFor="authorName">Author Name</Label>
              <Input
                required
                id="authorName"
                name="authorName"
                type="text"
                placeholder="Name of the author"
              />
            </div>

            {/* Author Image */}
            <div className="space-y-2">
              <Label htmlFor="authorImage">Author Image</Label>
              <Input
                id="authorImage"
                name="authorImage"
                type="file"
                accept="image/*"
                onChange={handleUploadAuthorImage}
              />
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

