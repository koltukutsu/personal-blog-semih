"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Suspense } from "react";
import useSWR from "swr";
import type { Post } from "./get-posts";
import type { LocalizedPost } from "./posts-localized";
import React from "react";

type SortSetting = ["date" | "views", "desc" | "asc"];

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function Posts({ posts: initialPosts, dictionary }: { posts: Post[] | LocalizedPost[], dictionary?: any }) {
  const [sort, setSort] = useState<SortSetting>(["date", "desc"]);
  
  // Get dictionary translation for post list
  const tableLabels = {
    date: dictionary?.post_list?.date || "date",
    title: dictionary?.post_list?.title || "title",
    views: dictionary?.post_list?.views || "views",
    noContent: dictionary?.post_list?.noContent || "No content available"
  };

  // Determine if we're using localized posts
  const isUsingLocalizedPosts = initialPosts.length > 0 && 'lang' in initialPosts[0];
  
  // Only use SWR for non-localized posts to maintain language-specific posts
  const { data: posts } = useSWR(
    isUsingLocalizedPosts ? null : "/api/posts", 
    fetcher, 
    {
      fallbackData: initialPosts,
      refreshInterval: isUsingLocalizedPosts ? 0 : 5000,
    }
  );

  function sortDate() {
    setSort(sort => [
      "date",
      sort[0] !== "date" || sort[1] === "asc" ? "desc" : "asc",
    ]);
  }

  function sortViews() {
    setSort(sort => [
      "views",
      sort[0] !== "views" || sort[1] === "asc" ? "desc" : "asc",
    ]);
  }

  return (
    <Suspense fallback={null}>
      <main className="max-w-2xl mx-auto mb-10 text-sm">
        <header className="flex sticky z-10 top-0 px-4 py-2 w-full items-center text-xs font-mono bg-white dark:bg-black">
          <button
            onClick={sortDate}
            className={`
              h-9
              ${
                sort[0] === "date" && sort[1] !== "desc"
                  ? "text-gray-700 dark:text-gray-400"
                  : ""
              }`}
          >
            {tableLabels.date}
            {sort[0] === "date" && sort[1] === "asc" && "↑"}
          </button>
          <span className="grow pl-2">{tableLabels.title}</span>
          <button
            onClick={sortViews}
            className={`
                  h-9
                  pl-4
                  ${
                    sort[0] === "views"
                      ? "text-gray-700 dark:text-gray-400"
                      : ""
                  }
                `}
          >
            {tableLabels.views}
            {sort[0] === "views" ? (sort[1] === "asc" ? "↑" : "↓") : ""}
          </button>
        </header>

        {posts.length > 0 ? (
          <List posts={posts} sort={sort} />
        ) : (
          <div className="py-10 text-center text-gray-500 dark:text-gray-400 font-mono">
            {tableLabels.noContent}
          </div>
        )}
      </main>
    </Suspense>
  );
}

function List({ posts, sort }) {
  // sort can be ["date", "desc"] or ["views", "desc"] for example
  const sortedPosts = useMemo(() => {
    const [sortKey, sortDirection] = sort;
    return [...posts].sort((a, b) => {
      if (sortKey === "date") {
        return sortDirection === "desc"
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return sortDirection === "desc" ? b.views - a.views : a.views - b.views;
      }
    });
  }, [posts, sort]);

  return (
    <ul>
      {sortedPosts.map((post, i: number) => {
        const year = getYear(post.date);
        const firstOfYear =
          !sortedPosts[i - 1] || getYear(sortedPosts[i - 1].date) !== year;
        const lastOfYear =
          !sortedPosts[i + 1] || getYear(sortedPosts[i + 1].date) !== year;

        // Determine the language path prefix
        const langPrefix = 'lang' in post ? `/${post.lang}` : '';

        return (
          <li key={post.id}>
            <Link href={`${langPrefix}/2025/${post.id}`}>
              <span
                className={`flex transition-[background-color] hover:bg-gray-100 dark:hover:bg-[#242424] active:bg-gray-200 dark:active:bg-[#222] border-y border-gray-200 dark:border-[#313131]
                ${!firstOfYear ? "border-t-0" : ""}
                ${lastOfYear ? "border-b-0" : ""}
              `}
              >
                <span
                  className={`py-3 flex grow items-center ${
                    !firstOfYear ? "ml-14" : ""
                  }`}
                >
                  {firstOfYear && (
                    <span className="w-14 inline-block self-start shrink-0 text-gray-500 dark:text-gray-500">
                      {year}
                    </span>
                  )}

                  <span className="grow text-black dark:text-gray-100">{post.title}</span>

                  <span className="text-gray-500 dark:text-gray-500 text-xs">
                    {post.viewsFormatted}
                  </span>
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function getYear(date: string) {
  return new Date(date).getFullYear();
}
