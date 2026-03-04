import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

export type Post = {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
};

export function getSortedPostsData(): Omit<Post, "content">[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    // Extract the first image from markdown content using regex
    const imageMatch = matterResult.content.match(/!\[.*?\]\((.*?)\)/);
    const coverImage = imageMatch ? imageMatch[1] : undefined;

    // Create a plain text excerpt (strip images, simple markdown and URLs)
    const cleaned = matterResult.content
      .replace(/!\[.*?\]\([^\)]+\)/g, "") // remove image markdown
      .replace(/<img[^>]*>/g, "") // remove HTML img tags
      .replace(/#+\s/g, "")
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
      .replace(/[*_~`>]/g, "")
      .replace(/https?:\/\/\S+/g, "") // remove bare URLs
      .trim();
    const rawContent = cleaned;
    const excerpt =
      rawContent.length > 150 ? rawContent.slice(0, 150) + "..." : rawContent;

    return {
      slug,
      title: matterResult.data.title || slug,
      date: matterResult.data.date || new Date().toISOString(),
      excerpt,
      coverImage,
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostData(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  return {
    slug,
    title: matterResult.data.title || slug,
    date: matterResult.data.date || new Date().toISOString(),
    content: matterResult.content,
  };
}

export function savePost(data: Omit<Post, "slug">) {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }

  const slug = data.title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  const fileContents = matter.stringify(data.content, {
    title: data.title,
    date: data.date,
  });

  fs.writeFileSync(fullPath, fileContents);
  return slug;
}

export function updatePost(slug: string, data: Omit<Post, "slug">) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  const fileContents = matter.stringify(data.content, {
    title: data.title,
    date: data.date,
  });

  fs.writeFileSync(fullPath, fileContents);
  return slug;
}
