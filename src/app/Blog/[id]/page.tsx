"use client";
import { useParams, useRouter } from "next/navigation";

import { api } from "~/trpc/react";

export default function DetailsPage() {
  const router = useRouter();
  const page = useParams();
  const id = Number(page.id);
  const detailBlog = api.post.getDetailBlog.useQuery({
    id: id,
  });
  const allBlog = api.post.getAllBlogs.useQuery();
  const deleteBlog = api.post.deleteBlog.useMutation({
    onSettled: () => {
      allBlog.refetch();
    },
  });
  const handleDelete = () => {
    if (confirm("Are you sure?")) {
      try {
        deleteBlog.mutate({ id: id });
        alert("削除しました");
        router.push("/");
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="mx-auto mt-10 w-full max-w-2xl rounded-md bg-white p-6 shadow-md">
        <h1 className="mb-4 text-3xl font-bold">{detailBlog.data?.title}</h1>
        <div className="mb-8 text-sm text-gray-500">
          <span>{detailBlog.data?.createdAt.toLocaleDateString()}</span>{" "}
          {/* Created Atが必要ならば、表示 */}
        </div>
        <p className="whitespace-pre-line text-gray-700">
          {detailBlog.data?.description}
        </p>
        <button
          className="mt-4 rounded-md bg-red-500 px-4 py-2 text-white"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </main>
  );
}
