"use client";
import { useState, useTransition, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { createPostAction, editPostAction } from "@/app/actions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
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
  const [images, setImages] = useState<{ url: string; name?: string }[]>([]);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    // preload gallery images
    async function loadImages() {
      try {
        const res = await fetch("/api/images");
        if (!res.ok) return;
        const data = await res.json();
        setImages(data.images || []);
      } catch (e) {}
    }
    loadImages();
  }, []);

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

  async function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement> | null,
  ) {
    const file = e?.target?.files?.[0];
    if (!file) return;

    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: form });
    if (!res.ok) return;
    const data = await res.json();
    if (data?.url) {
      insertImage(data.url);
      // refresh gallery list
      const list = await fetch("/api/images");
      if (list.ok) {
        const d = await list.json();
        setImages(d.images || []);
      }
    }
  }

  function insertImage(url: string) {
    setContent((prev) => `${prev}\n![](${url})\n`);
    setGalleryOpen(false);
  }

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
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Content</label>
          <div className="flex items-center space-x-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e)}
              className="hidden"
            />
            <Button
              size="sm"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload Image
            </Button>
            <Button
              size="sm"
              type="button"
              onClick={() => setGalleryOpen((s) => !s)}
            >
              {galleryOpen ? "Close Gallery" : "Open Gallery"}
            </Button>
          </div>
        </div>
        <MDEditor value={content} onChange={(val) => setContent(val || "")} />

        <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
          <DialogContent className="w-full max-w-4xl!">
            <DialogHeader>
              <DialogTitle>Image Gallery</DialogTitle>
            </DialogHeader>

            <div className="mt-2 p-1">
              <div className="grid grid-cols-3 gap-2">
                {images.length === 0 && (
                  <div className="col-span-3 text-sm text-muted-foreground">
                    No images
                  </div>
                )}
                {images.map((img) => (
                  <div key={img.url} className="flex flex-col items-center">
                    <img
                      src={img.url}
                      alt={img.name || "img"}
                      className="w-full h-24 object-cover rounded"
                    />
                    <div className="mt-1 w-full flex justify-between">
                      <span className="text-xs truncate">{img.name}</span>
                      <Button size="sm" onClick={() => insertImage(img.url)}>
                        Insert
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Button disabled={isPending} type="submit" className="cursor-pointer">
        {isPending ? "Saving..." : isEdit ? "Update Post" : "Publish Post"}
      </Button>
    </form>
  );
}
