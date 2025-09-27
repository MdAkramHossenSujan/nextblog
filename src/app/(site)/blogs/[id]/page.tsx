import { connectDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface Props {
  params: { id: string };
}

export default async function BlogPage({ params }: Props) {
  const blogsCollection = await connectDb("blogNext");

  const blog = await blogsCollection.findOne({ _id: new ObjectId(params.id) });

  if (!blog) {
    return <div className="text-center py-10">Blog not found</div>;
  }

  return (
    <Card className="max-w-3xl mx-auto my-10">
      <CardHeader>
        <CardTitle className="text-center text-3xl">{blog.title}</CardTitle>
        <CardDescription className="flex justify-center items-center mx-auto flex-col">
          {blog.authorImage && (
            <Image
              src={blog.authorImage}
              alt={blog.authorName || "Author"}
              width={48}
              height={48}
              className="rounded-full inline-block mr-2"
            />
          )}
          <span className="text-center my-1 text-2xl">{blog.authorName}</span>
          <p>Created At: {new Date(blog?.createdAt).toLocaleString()}</p>

        </CardDescription>
      </CardHeader>
      <CardContent>
        {blog.imageUrl && (
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            width={600}
            height={300}
            className="rounded-md object-cover w-full h-[600px] mb-4"
          />
        )}
        <p>{blog.content}</p>
      </CardContent>
    </Card>
  );
}
