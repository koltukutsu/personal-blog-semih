"use client";
import { useState, useEffect } from "react";

interface Section {
  id: string;
  title: string;
}

interface SectionNavigationProps {
  sections: Section[];
}

export function SectionNavigation({ sections }: SectionNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -70% 0%",
        threshold: 0.1,
      }
    );

    // Observe all section elements
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block fixed right-8 top-1/2 transform -translate-y-1/2 z-10">
        <div className="bg-gray-50 dark:bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`
                  block w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200
                  ${
                    activeSection === section.id
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100"
                  }
                `}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-gray-50 dark:bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 p-2">
          <div className="flex space-x-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`
                  px-2 py-1 rounded-md text-xs transition-all duration-200 whitespace-nowrap
                  ${
                    activeSection === section.id
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100"
                  }
                `}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
