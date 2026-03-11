import MarkdownEditor from "@/components/MarkdownEditor";
import { getPostData } from "@/lib/blog";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <Link
        href={`/blog/${slug}`}
        className="inline-flex items-center text-sm mb-2 no-underline text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Post
      </Link>

      <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
      <MarkdownEditor
        isEdit={true}
        slug={post.slug}
        initialTitle={post.title}
        initialContent={post.content}
        date={post.date}
      />
    </div>
  );
}
