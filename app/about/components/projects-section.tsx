"use client";
import { useState } from "react";
import { AboutSection, AboutCard, AboutGrid } from "./about-section";

interface Project {
  name: string;
  description: string;
  technologies: string[];
  role: string;
  status: string;
  website?: string;
  github?: string | string[];
  images?: string[];
  detailedDescription?: string;
  achievements?: string[];
}

interface ProjectsSectionProps {
  title: string;
  projects: Project[];
}

export function ProjectsSection({ title, projects }: ProjectsSectionProps) {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const toggleProject = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  // Check if any project has images to determine grid layout
  const hasImages = projects.some(project => project.images && project.images.length > 0);

  return (
    <AboutSection title={title} id="projects-section">
      <div className={hasImages ? "space-y-6" : "grid gap-6 md:grid-cols-2"}>
        {projects.map((project, index) => (
          <AboutCard 
            key={index}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              hasImages && expandedProject === index ? 'expanded-card' : ''
            }`}
            onClick={() => toggleProject(index)}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {project.name}
                </h3>
                <span className="text-xs text-gray-400">
                  {expandedProject === index ? '−' : '+'}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {project.role}
              </p>

              {/* Links */}
              {(project.website || project.github) && (
                <div className="flex flex-wrap gap-2">
                  {project.website && (
                    <a 
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Website
                    </a>
                  )}
                  {project.github && (
                    <>
                      {Array.isArray(project.github) ? (
                        project.github.map((githubUrl, index) => (
                          <a 
                            key={index}
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            GitHub {index + 1}
                          </a>
                        ))
                      ) : (
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          GitHub
                        </a>
                      )}
                    </>
                  )}
                </div>
              )}
              
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {project.description}
              </p>

              {/* Project Image */}
              {project.images && project.images.length > 0 && (
                <div className="mt-4">
                  <img
                    src={project.images[0]}
                    alt={project.name}
                    className="w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                  />
                </div>
              )}

              {/* Expanded Details */}
              {expandedProject === index && (
                <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {/* Image Gallery for Expanded Cards */}
                  {project.images && project.images.length > 1 && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                        Project Gallery:
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {project.images.slice(1).map((image, imageIndex) => (
                          <img
                            key={imageIndex}
                            src={image}
                            alt={`${project.name} ${imageIndex + 2}`}
                            className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700 hover:opacity-80 transition-opacity"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {project.detailedDescription && (
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      {project.detailedDescription}
                    </p>
                  )}
                  
                  {project.achievements && project.achievements.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-2">
                        Key Achievements:
                      </h4>
                      <ul className="space-y-1">
                        {project.achievements.map((achievement, achievementIndex) => (
                          <li 
                            key={achievementIndex}
                            className="text-xs text-gray-600 dark:text-gray-400 pl-4 relative before:content-['•'] before:absolute before:left-0"
                          >
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </AboutCard>
        ))}
      </div>
    </AboutSection>
  );
}
