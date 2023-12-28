import Link from "next/link";
import { api } from "~/trpc/server";

export default async function Home() {
  const c = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  // const hello = await api.post.hello.query({ text: "from client" });
  // console.log(hello.greeting);
  const allBlogs = await api.post.getAllBlogs.query();
  // console.log(allBlogs.data);
  return (
    <main className="min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container mx-auto px-4">
        <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">T3</span> App Blog
        </h1>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {allBlogs.map((blog) => (
            <Link key={blog.id} href={`/Blog/${blog.id}`}>
              <div className="rounded-xl bg-white/10 p-6 duration-500 hover:bg-black/50">
                <h3 className="mb-4 text-2xl font-bold">{blog.title}</h3>
                <div className="mb-4 text-lg">{blog.description}</div>
                <span className="text-base text-gray-400">
                  {blog.createdAt.toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/PostBlog"
            className="rounded-md bg-orange-500 px-6 py-3 font-medium hover:bg-orange-600 duration-300"
          >
            投稿する
          </Link>
        </div>
      </div>
    </main>
  );
}
