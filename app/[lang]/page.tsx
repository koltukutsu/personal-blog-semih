import { Posts } from "../posts";
import { getLocalizedPosts } from "../posts-localized";
import { validateLocale, generateStaticParams, getDictionary } from "../utils/i18n";

export const revalidate = 60;

export { generateStaticParams };

export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const locale = validateLocale(lang);
  const posts = await getLocalizedPosts(locale);
  const dictionary = await getDictionary(locale);
  
  return <Posts posts={posts} dictionary={dictionary} />;
} 