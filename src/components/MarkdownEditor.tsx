"use client";
import { useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { createPostAction } from "@/app/actions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function CreatePostForm() {
  const [content, setContent] = useState("**Hello world!!!**");
  const [title, setTitle] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      const result = await createPostAction(formData);
      if (result.success) {
        router.push(`/blog/${result.slug}`);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto py-8">
      <div className="space-y-2">
        <label className="text-sm font-medium">Post Title</label>
        <Input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="My Awesome Post"
        />
      </div>

      <div data-color-mode="light" className="space-y-2">
        <label className="text-sm font-medium">Content</label>
        <MDEditor value={content} onChange={(val) => setContent(val || "")} />
      </div>

      <Button disabled={isPending} type="submit">
        {isPending ? "Saving..." : "Publish Post"}
      </Button>
    </form>
  );
}
