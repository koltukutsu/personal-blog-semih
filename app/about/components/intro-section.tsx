import Image from "next/image";
import { AboutSection } from "./about-section";

interface IntroSectionProps {
  title: string;
  description: string;
  additionalInfo: string;
  personalNote: string;
}

export function IntroSection({ title, description, additionalInfo, personalNote }: IntroSectionProps) {
  return (
    <AboutSection title={title} id="about-section">
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <Image
          src="/images/photo.jpeg"
          alt="Mehmet Semih Babacan"
          className="rounded-full bg-gray-100 self-center md:self-start shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
          unoptimized
          width={160}
          height={160}
          priority
        />
        
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p className="text-base leading-relaxed">
            {description}
          </p>
          
          <p className="text-base leading-relaxed">
            {additionalInfo}
          </p>
          
          <p className="text-base leading-relaxed font-medium text-gray-900 dark:text-gray-100">
            {personalNote}
          </p>
        </div>
      </div>
    </AboutSection>
  );
}
