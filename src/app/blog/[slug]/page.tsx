import { getPostData } from "@/lib/blog";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // Highlight theme
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-16 max-w-4xl prose prose-neutral dark:prose-invert">
      <div className="flex items-center mb-12 justify-between">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm no-underline text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
        </Link>
        <Link
          href={`/blog/${post.slug}/edit`}
          className="text-sm text-primary hover:underline no-underline font-medium"
        >
          Edit Post
        </Link>
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight mb-2">
        {post.title}
      </h1>
      <div className="flex items-center justify-between mb-8">
        <p className="text-sm text-muted-foreground m-0">
          {new Date(post.date).toLocaleDateString()}
        </p>
      </div>

      <div className="markdown-content [&>pre]:p-0!">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
