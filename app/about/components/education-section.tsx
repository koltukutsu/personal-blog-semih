import { AboutSection, AboutCard } from "./about-section";

interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
  gpa?: string;
  highlights: string[];
}

interface Research {
  title: string;
  publication: string;
  publicationUrl?: string;
}

interface EducationSectionProps {
  title: string;
  degrees: Education[];
  research?: Research;
}

export function EducationSection({ title, degrees, research }: EducationSectionProps) {
  return (
    <AboutSection title={title} id="education-section">
      <div className="space-y-6">
        {degrees.map((education, index) => (
          <AboutCard key={index}>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {education.degree}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {education.institution}
                  </p>
                  {education.gpa && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      GPA: {education.gpa}
                    </p>
                  )}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 sm:text-right">
                  <p>{education.period}</p>
                  <p>{education.location}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {education.highlights.map((highlight, highlightIndex) => (
                  <span 
                    key={highlightIndex}
                    className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </AboutCard>
        ))}
        
        {research && (
          <AboutCard>
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {research.title}
              </h3>
              {research.publicationUrl ? (
                <a 
                  href={research.publicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors italic block"
                >
                  "{research.publication}"
                </a>
              ) : (
                <p className="text-gray-700 dark:text-gray-300 italic">
                  "{research.publication}"
                </p>
              )}
            </div>
          </AboutCard>
        )}
      </div>
    </AboutSection>
  );
}
