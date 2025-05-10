import "./globals.css";

import { Inter } from "next/font/google";
import { themeEffect } from "./theme-effect";
import { Analytics } from "./analytics";
import { Header } from "./header";
import { Footer } from "./footer";
import { doge } from "./doge";
import { getDictionary, validateLocale } from "./utils/i18n";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Mehmet Semih Babacan's blog",
//   description:
//     "Mehmet Semih Babacan is a visionary tech entrepreneur, co-founder of Solace, and the creator of 'Anlayan Ev' (Understanding Home) - an AI-driven smart home solution.",
//   openGraph: {
//     title: "Mehmet Semih Babacan's blog",
//     description:
//       "Mehmet Semih Babacan is a visionary tech entrepreneur, co-founder of Solace, and the creator of 'Anlayan Ev' (Understanding Home) - an AI-driven smart home solution.",
//     url: "https://semihbabacan.com",
//     siteName: "Mehmet Semih Babacan's blog",
//     images: ["/opengraph-image"],
//   },
//   twitter: {
//     card: "summary_large_image",
//     site: "@semihbabacan",
//     creator: "@semihbabacan",
//   },
//   metadataBase: new URL("https://semihbabacan.com"),
// };

export const viewport = {
  themeColor: "transparent",
};

// Set the supported languages for the application
export const languages = ['en', 'tr', 'es'];
export const defaultLanguage = 'en';

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const lang = validateLocale(params?.lang);
  const dictionary = await getDictionary(lang);
  
  return (
    <html
      lang={lang}
      className={`${inter.className} antialiased`}
      suppressHydrationWarning={true}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect.toString()})();(${doge.toString()})();`,
          }}
        />
      </head>

      <body className="dark:text-gray-100 max-w-2xl m-auto">
        <main className="p-6 pt-3 md:pt-6 min-h-screen">
          <Header dictionary={dictionary} lang={lang} />
          {children}
        </main>

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
