// app/blogs/page.tsx
import { connectDb } from "@/lib/mongodb";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function BlogsPage() {
  const blogsCollection = await connectDb("blogNext");
  const blogs = await blogsCollection.find().toArray();

  return (
    <div className="p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog: any) => (
        <Card key={blog._id.toString()} className="hover:shadow-lg transition cursor-pointer">
          <CardHeader>
            <CardTitle className="py-1">{blog.title}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              {blog.authorImage && (
                <Image
                  src={blog?.authorImage}
                  alt={blog.authorName || "Author"}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span>{blog.authorName}</span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            {blog.imageUrl && (
              <Image
                src={blog?.imageUrl}
                alt={blog.title}
                width={400}
                height={200}
                className="rounded-md object-cover w-full h-40 mb-3"
              />
            )}

            {/* Detail Button */}
            <Link href={`/blogs/${blog._id.toString()}`}>
              <Button variant="outline" className="w-full cursor-pointer mt-2">
                View Details
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

