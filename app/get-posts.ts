import postsData from "./posts.json";
import redis from "./redis";
import commaNumber from "comma-number";

export type Post = {
  id: string;
  date: string;
  title: string;
  views: number;
  viewsFormatted: string;
};

// shape of the HSET in redis
type Views = {
  [key: string]: string;
};

export const getPosts = async () => {
  console.log("Fetching all views from Redis");
  const allViews: null | Views = await redis.hgetall("views");
  console.log("Retrieved views:", allViews);
  
  const posts = postsData.posts.map((post): Post => {
    const views = Number(allViews?.[post.id] ?? 0);
    console.log(`Post ${post.id}: ${views} views`);
    return {
      ...post,
      views,
      viewsFormatted: commaNumber(views),
    };
  });
  
  console.log(`Processed ${posts.length} posts`);
  return posts;
};
