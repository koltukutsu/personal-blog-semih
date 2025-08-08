import { Posts } from "../posts";
import { getPosts } from "../get-posts";

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getPosts();
  return <Posts posts={posts} />;
}

