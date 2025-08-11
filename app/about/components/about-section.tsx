import React from 'react';

interface AboutSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function AboutSection({ title, children, className = '', id }: AboutSectionProps) {
  return (
    <section id={id} className={`mb-12 ${className}`}>
      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
        {title}
      </h2>
      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}

export function AboutCard({ 
  children, 
  className = '', 
  onClick 
}: { 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div 
      className={`bg-gray-50 dark:bg-gray-800/30 rounded-lg p-6 border border-gray-200 dark:border-gray-700 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function AboutGrid({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`grid gap-6 md:grid-cols-2 ${className}`}>
      {children}
    </div>
  );
}
