import React from 'react';
import { SectionNavigation } from './section-navigation';

interface AboutLayoutProps {
  children: React.ReactNode;
}

const sections = [
  { id: "about-section", title: "About" },
  { id: "projects-section", title: "Featured Projects" },
  { id: "experience-section", title: "Experience" },
  { id: "education-section", title: "Education" },
  { id: "achievements-section", title: "Achievements" },
];

export function AboutLayout({ children }: AboutLayoutProps) {
  return (
    <div className="relative">
      {children}
      <SectionNavigation sections={sections} />
    </div>
  );
}
