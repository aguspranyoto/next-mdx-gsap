import { getSortedPostsData } from "@/lib/blog";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlogListClient from "./BlogListClient";

export default function BlogList() {
  const posts = getSortedPostsData();

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl selection:bg-primary/20">
      <div className="flex justify-between items-center mb-12">
        <div>
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground no-underline transition-colors mb-3"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </div>
        <Link
          href="/blog/create"
          className="group inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-300 hover:scale-105"
        >
          New Post
        </Link>
      </div>

      <BlogListClient posts={posts} />
    </div>
  );
}
