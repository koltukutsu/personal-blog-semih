import { getDictionary, validateLocale, generateStaticParams } from "../../utils/i18n";

export { generateStaticParams };

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
  const locale = validateLocale(lang);
  
  return {
    title: 'Introduction - Mehmet Semih Babacan',
    description: 'Why I write a blog in the age of AI',
  };
}

export default async function IntroductionPage({ params: { lang } }: { params: { lang: string } }) {
  const locale = validateLocale(lang);
  const dictionary = await getDictionary(locale);
  const { introduction } = dictionary;

  return (
    <>
      <h1>Introduction</h1>

      <p>{introduction.paragraph1}</p>
      
      <p>{introduction.paragraph2}</p>
      
      <p>{introduction.paragraph3}</p>
      
      <p>{introduction.paragraph4}</p>
      
      <ol>
        <li>{introduction.focus_area1}</li>
        <li>{introduction.focus_area2}</li>
        <li>{introduction.focus_area3}</li>
      </ol>
    </>
  );
} 