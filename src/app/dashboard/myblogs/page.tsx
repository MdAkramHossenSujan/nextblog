import { connectDb } from '@/lib/mongodb';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from 'next/link';

export default async function MyBlogs() {
  const blogsCollection = await connectDb("blogNext");
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return <div className="text-center py-10">Please login to view your blogs.</div>;
  }

  const blogs = await blogsCollection.find({ userId: user.id }).toArray();
console.log(blogs)
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog: any) => (
        <Card key={blog._id} className="shadow-md hover:shadow-lg transition">
          <CardHeader>
            <CardTitle className="mb-1">{blog.title}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              {blog.authorImage && (
                <Image
                  src={blog.authorImage}
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
                src={blog.imageUrl}
                alt={blog.title}
                width={400}
                height={200}
                className="rounded-md object-cover w-full h-40"
              />
            )}
            <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
              {blog.content}
            </p>
            <Link href={`/blogs/${blog._id}`}>Details</Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

