"use client";
import { useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { createPostAction, editPostAction } from "@/app/actions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface MarkdownEditorProps {
  initialTitle?: string;
  initialContent?: string;
  isEdit?: boolean;
  slug?: string;
  date?: string;
}

export default function CreatePostForm({
  initialTitle = "",
  initialContent = "**Hello world!!!**",
  isEdit = false,
  slug = "",
  date = "",
}: MarkdownEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [title, setTitle] = useState(initialTitle);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      if (isEdit) {
        formData.append("slug", slug);
        formData.append("date", date);
        const result = await editPostAction(formData);
        if (result.success) {
          router.push(`/blog/${result.slug}`);
        }
      } else {
        const result = await createPostAction(formData);
        if (result.success) {
          router.push(`/blog/${result.slug}`);
        }
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
        {isPending ? "Saving..." : isEdit ? "Update Post" : "Publish Post"}
      </Button>
    </form>
  );
}
