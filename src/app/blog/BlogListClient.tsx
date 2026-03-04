"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { gsap } from "gsap";
import { Post } from "@/lib/blog";

export default function BlogListClient({
  posts,
}: {
  posts: Omit<Post, "content">[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".blog-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  if (posts.length === 0) {
    return <p className="text-muted-foreground">No posts found. Create one!</p>;
  }

  const [highlightPost, ...otherPosts] = posts;

  return (
    <div ref={containerRef} className="space-y-12">
      {/* Highlight Post */}
      {highlightPost && (
        <div className="blog-card group relative overflow-hidden rounded-3xl bg-card border shadow-sm hover:shadow-xl transition-all duration-500">
          <Link href={`/blog/${highlightPost.slug}`}>
            <div className="flex flex-col md:flex-row h-full w-full">
              <div className="p-8 md:p-12 flex flex-col justify-center flex-1">
                <span className="inline-flex items-center text-xs font-medium tracking-wider uppercase text-primary mb-4">
                  Latest Post
                </span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors duration-300">
                  {highlightPost.title}
                </h2>
                <div className="flex items-center text-sm text-muted-foreground mb-6">
                  <Calendar className="mr-2 h-4 w-4" />
                  {new Date(highlightPost.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                {highlightPost.excerpt && (
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8 line-clamp-3">
                    {highlightPost.excerpt}
                  </p>
                )}
                <div className="mt-auto flex items-center font-semibold text-primary">
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              <div className="hidden md:block w-1/3 bg-muted group-hover:bg-primary/5 transition-colors duration-500 relative overflow-hidden">
                {highlightPost.coverImage ? (
                  <img
                    src={highlightPost.coverImage}
                    alt={highlightPost.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Grid of Other Posts */}
      {otherPosts.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card block group h-full"
            >
              <div className="h-full flex flex-col justify-between rounded-2xl bg-card border p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div>
                  <div className="flex items-center text-xs text-muted-foreground mb-3">
                    <Calendar className="mr-1.5 h-3.5 w-3.5" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                  )}
                </div>
                <div className="flex items-center text-sm font-medium text-primary mt-4 opacity-80 group-hover:opacity-100">
                  Read more
                  <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
