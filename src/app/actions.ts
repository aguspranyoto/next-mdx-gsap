"use server";

import { savePost } from "@/lib/blog";
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
