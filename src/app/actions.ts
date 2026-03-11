"use server";

import { savePost, updatePost } from "@/lib/blog";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function createPostAction(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

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
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

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
