// Script to test the i18n file paths
const fs = require('fs');
const path = require('path');

// Define paths
const contentDir = path.join(process.cwd(), 'content');
const languages = ['en', 'tr', 'es'];
const posts = [
  'future-of-innovation',
  'founder-psychology',
  'understanding-environments',
  'resilient-innovation',
  'authentic-personal-branding'
];
const year = '2025';

console.log('Testing multilingual blog file paths:');
console.log('====================================');
console.log('Content directory:', contentDir);
console.log('Languages:', languages.join(', '));
console.log('Posts:', posts.join(', '));
console.log('Year:', year);
console.log('====================================\n');

// Check if all posts exist in all languages
for (const lang of languages) {
  console.log(`LANGUAGE: ${lang.toUpperCase()}`);
  console.log('----------------------------');
  
  for (const postId of posts) {
    const filePath = path.join(contentDir, lang, year, `${postId}.mdx`);
    
    if (fs.existsSync(filePath)) {
      // Read the file and extract the title
      const content = fs.readFileSync(filePath, 'utf8');
      const titleMatch = content.match(/title: "(.+?)"/);
      const title = titleMatch ? titleMatch[1] : 'Title not found';
      
      console.log(`✅ ${postId}: File exists`);
      console.log(`   Title: ${title}`);
    } else {
      console.log(`❌ ${postId}: File NOT found at ${filePath}`);
    }
    console.log('');
  }
  console.log('');
}

// Verify URL structure
console.log('URL structure examples:');
console.log('====================================');
const examplePost = posts[0];
for (const lang of languages) {
  console.log(`/${lang}/2025/${examplePost} - View posts in ${lang.toUpperCase()}`);
}

console.log('\nURL structure for all posts in English:');
for (const postId of posts) {
  console.log(`/en/2025/${postId}`);
}

console.log('\nFallback logic:');
console.log('- If a post is missing in a specific language, the English version will be displayed');
console.log('- A notice will be shown that the content is only available in English');

console.log('\nLanguage switcher:');
console.log('- Will maintain the same post when switching between languages');
console.log('- Available in the header on all pages'); 