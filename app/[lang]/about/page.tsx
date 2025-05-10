import Image from "next/image";
import { getDictionary, validateLocale, generateStaticParams } from "../../utils/i18n";

export { generateStaticParams };

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
  const locale = validateLocale(lang);
  
  return {
    title: 'Mehmet Semih Babacan',
    description: 'Visionary tech entrepreneur and co-founder of Solace',
    openGraph: {
      title: 'Mehmet Semih Babacan',
      description: 'Visionary tech entrepreneur and co-founder of Solace',
      images: [{ url: '/about/opengraph-image' }]
    }
  };
}

export default async function AboutPage({ params: { lang } }: { params: { lang: string } }) {
  const locale = validateLocale(lang);
  const dictionary = await getDictionary(locale);
  const { about } = dictionary;

  return (
    <>
      <h1>{about.title}</h1>

      <a href="https://twitter.com/semihbabacan" target="_blank">
        <Image
          src="/images/photo.jpeg"
          alt="Mehmet Semih Babacan"
          className="rounded-full bg-gray-100 block mt-2 mb-5 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale hover:grayscale-0"
          unoptimized
          width={160}
          height={160}
          priority
        />
      </a>

      <p>I'm a visionary tech entrepreneur from Turkey, currently serving as the co-founder of Solace. My passion lies in creating technology that genuinely understands and adapts to human needs.</p>

      <h2>{about.education}</h2>

      <p>{about.education_text}</p>

      <ul>
        <li>{about.education_item1}</li>
      </ul>

      <h2>{about.connect}</h2>

      <p>{about.connect_text}</p>

      <ul>
        <li><strong>GitHub</strong>: <a href="https://github.com/koltukutsu" target="_blank">koltukutsu</a></li>
        <li><strong>LinkedIn</strong>: <a href="https://linkedin.com/in/semihbabacan" target="_blank">Mehmet Semih Babacan</a></li>
        <li><strong>Twitter</strong>: <a href="https://twitter.com/semihbabacan" target="_blank">@semihbabacan</a></li>
      </ul>

      <p>{about.connect_footer}</p>
    </>
  );
} 