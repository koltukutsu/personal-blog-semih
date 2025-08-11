import { AboutSection, AboutCard, AboutGrid } from "./about-section";

interface Achievement {
  title: string;
  description: string;
}

interface AchievementsSectionProps {
  title: string;
  items: Achievement[];
}

export function AchievementsSection({ title, items }: AchievementsSectionProps) {
  return (
    <AboutSection title={title} id="achievements-section">
      <AboutGrid>
        {items.map((achievement, index) => (
          <AboutCard key={index}>
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {achievement.title}
              </h3>
              
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {achievement.description}
              </p>
            </div>
          </AboutCard>
        ))}
      </AboutGrid>
    </AboutSection>
  );
}
