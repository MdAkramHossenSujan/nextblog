// app/blogs/page.tsx
import { connectDb } from "@/lib/mongodb";
import Image from "next/image";
export default async function Home() {
  const blogsCollection = await connectDb("blogNext");
  const blogs = await blogsCollection.find().toArray();
  console.log(blogs)
  return (
    <>
     <div className="p-6 space-y-6">
      <h1>Blogs</h1>
      {blogs.map((blog) => (
        <div key={blog._id.toString()} className="border p-4 rounded shadow">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            width={600}
            height={400}
            className="w-full h-60 object-cover rounded"
          />
          <h2 className="text-xl font-bold mt-2">{blog.title}</h2>
          <p>{blog.content}</p>
          <div className="flex items-center mt-2">
            <Image
              src={blog.authorImage}
              alt={blog.authorName}
               width={600}
            height={400}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span>{blog.authorName}</span>
          </div>
          <small className="text-gray-500">
            Created at: {new Date(blog.createdAt).toLocaleDateString()}
          </small>
        </div>
      ))}
    </div>
    </>
  );
}