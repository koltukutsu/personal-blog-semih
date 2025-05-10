import fs from 'fs';
import path from 'path';
import { getPosts, Post } from "./get-posts";

export interface LocalizedPost extends Post {
  lang: string;
  isTranslated: boolean;
}

/**
 * Gets posts with localization information
 * @param locale The target locale
 * @returns Array of posts with language information
 */
export async function getLocalizedPosts(locale: string): Promise<LocalizedPost[]> {
  const posts = await getPosts();
  const year = "2025"; // Hardcoded year as per requirements
  const contentDir = path.join(process.cwd(), "content");
  
  return posts.map(post => {
    const localizedPath = path.join(contentDir, locale, year, `${post.id}.mdx`);
    const isTranslated = fs.existsSync(localizedPath);
    
    // Create localized post with translation status
    return {
      ...post,
      lang: locale,
      isTranslated,
      // If there's a translated version, update the title based on content
      ...(isTranslated && {
        title: getLocalizedTitle(localizedPath, post.title)
      })
    };
  });
}

/**
 * Extract the localized title from an MDX file
 */
function getLocalizedTitle(filePath: string, defaultTitle: string): string {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const titleMatch = content.match(/title:\s*["'](.+?)["']/);
    
    if (titleMatch && titleMatch[1]) {
      return titleMatch[1];
    }
  } catch (error) {
    console.error(`Error reading localized title: ${error}`);
  }
  
  return defaultTitle;
} 