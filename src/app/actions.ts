"use server";

import { savePost, updatePost } from "@/lib/blog";
import { revalidatePath } from "next/cache";

export async function createPostAction(formData: FormData) {
  const title = formData.get("title")?.toString() || "Untitled";
  const content = formData.get("content")?.toString() || "";

  const slug = savePost({
    title,
    content,
    date: new Date().toISOString(),
  });

  revalidatePath("/blog");
  return { success: true, slug };
}

export async function editPostAction(formData: FormData) {
  const slug = formData.get("slug")?.toString() || "";
  const title = formData.get("title")?.toString() || "Untitled";
  const content = formData.get("content")?.toString() || "";
  const date = formData.get("date")?.toString() || new Date().toISOString();

  if (!slug) {
    return { success: false, error: "Slug is required" };
  }

  updatePost(slug, {
    title,
    content,
    date,
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  return { success: true, slug };
}
