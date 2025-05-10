import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import { validateLocale, generateStaticParams as langParams } from "../../../utils/i18n";
import { getPosts } from "../../../get-posts";

// Import the components for MDX
import Image from "next/image";

// Custom MDX components
const mdxComponents = {
  img: (props: any) => (
    <Image
      {...props}
      alt={props.alt || ""}
      className="my-4 rounded-md overflow-hidden"
      width={700}
      height={400}
    />
  ),
  // Add other custom components as needed
};

// Combined generateStaticParams for both language and post paths
export async function generateStaticParams() {
  const posts = await getPosts();
  const languages = langParams().map(param => param.lang);
  
  const params: { lang: string; slug: string[] }[] = [];
  
  // Create params for each language and post combination
  for (const lang of languages) {
    for (const post of posts) {
      params.push({
        lang,
        slug: ["2025", post.id],
      });
    }
  }
  
  return params;
}

interface MyCustomPostPageProps {
  params: { 
    slug: string[]; 
    lang: string; 
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function PostPage(props: MyCustomPostPageProps) {
  const { params, searchParams } = props;
  const locale = validateLocale(params.lang);
  
  // Get the year and slug from the path
  const [year, slug] = params.slug;
  
  // Check if the content exists in the preferred language
  const contentDir = path.join(process.cwd(), "content");
  const localizedPath = path.join(contentDir, locale, year, `${slug}.mdx`);
  const defaultPath = path.join(contentDir, "en", year, `${slug}.mdx`); // Fallback to English
  
  let filePath;
  let isUsingFallback = false;
  
  // Use localized content if available, otherwise fall back to English
  if (fs.existsSync(localizedPath)) {
    filePath = localizedPath;
  } else if (fs.existsSync(defaultPath)) {
    filePath = defaultPath;
    isUsingFallback = true;
  } else {
    notFound();
  }
  
  // Read and parse the MDX file with frontmatter
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(fileContent);
  
  // Create language-specific text strings
  const viewingInText = {
    en: "Viewing in English",
    tr: "Türkçe olarak görüntüleniyor",
    es: "Viendo en Español"
  };
  
  const fallbackNoticeText = {
    en: "This content is not yet available in English",
    tr: "Bu içerik henüz Türkçe olarak mevcut değil",
    es: "Este contenido aún no está disponible en Español"
  };

  const authorWrittenText = {
    en: "This content has not been written by me yet in English",
    tr: "Bu içerik henüz tarafımdan Türkçe olarak yazılmamıştır",
    es: "Este contenido aún no ha sido escrito por mí en Español"
  };
  
  return (
    <div className="max-w-2xl mx-auto blog-content">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          <time>{data.date}</time> • {data.author}
        </div>
        
        {/* Language indicator */}
        {isUsingFallback ? (
          <div className="language-notice">
            <p className="font-medium mb-0">{fallbackNoticeText[locale]}</p>
            <p className="text-sm mb-0">{authorWrittenText[locale]}</p>
          </div>
        ) : (
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-6 italic">
            {viewingInText[locale]}
          </div>
        )}
      </div>
      
      {/* MDX Content */}
      <article className="prose dark:prose-invert max-w-none">
        <MDXRemote source={content} components={mdxComponents} />
      </article>
    </div>
  );
} 