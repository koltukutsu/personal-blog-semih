import { getLocalizedPosts } from "../../posts-localized";
import { validateLocale } from "../../utils/i18n";
import { PostHeader } from "./post-header";

export const revalidate = 60;

export default async function Layout({ 
  children,
  params: { lang }
}: { 
  children: React.ReactNode;
  params: { lang: string };
}) {
  const locale = validateLocale(lang);
  const posts = await getLocalizedPosts(locale);

  return (
    <article className="text-gray-800 dark:text-gray-300 mb-10 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
      <PostHeader posts={posts} lang={lang} />
      <div className="mt-8">
        {children}
      </div>
    </article>
  );
} 