import MarkdownEditor from "@/components/MarkdownEditor";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreatePostPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <Link
        href="/blog"
        className="inline-flex items-center text-sm mb-2 no-underline text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
      </Link>

      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
      <MarkdownEditor />
    </div>
  );
}
