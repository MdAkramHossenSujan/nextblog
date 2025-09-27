"use server";

import { connectDb } from "@/lib/mongodb";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";


export default async function handleSubmission(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  const blog = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    imageUrl: formData.get("imageUrl") as string,
    authorName: formData.get("authorName") as string,
    authorImage: formData.get("authorImage") as string,
    userId: user.id,
    createdAt: new Date(),
  };

  try {
   const collection = await connectDb("blogNext");
    await collection.insertOne(blog);
    return { success: true };
  } catch (error) {
    console.error("MongoDB insert error:", error);
    throw new Error("Failed to save blog.");
  }
}

