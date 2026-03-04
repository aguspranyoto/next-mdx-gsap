import { getSortedPostsData } from "@/lib/blog";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function BlogList() {
  const posts = getSortedPostsData();

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Blog Posts</h1>
        <Link
          href="/blog/create"
          className="text-sm font-semibold text-primary hover:underline"
        >
          Create Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts found. Create one!</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>
                    {new Date(post.date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
