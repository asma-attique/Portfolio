import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { Developer, SkillCategory, Skill } from "@shared/schema";

interface SkillCategoryWithSkills extends SkillCategory {
  skills: Skill[];
}

export function AboutSection() {
  const { data: developer, isLoading: developerLoading } = useQuery<Developer>({
    queryKey: ["/api/developer"]
  });

  const { data: skillCategories, isLoading: skillsLoading } = useQuery<SkillCategoryWithSkills[]>({
    queryKey: ["/api/skills"]
  });

  if (developerLoading || skillsLoading) {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-gray-200 rounded w-64 mx-auto"></div>
              <div className="h-6 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-48"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-48"></div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-32"></div>
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold section-title mb-4">About Me</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto font-light">
            Software engineer with {developer?.yearsExperience}+ years of experience building 
            robust applications and solving complex software challenges.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold section-title mb-6">My Journey</h3>
            <div className="space-y-4 text-neutral-600 leading-relaxed font-light">
              {developer?.bio.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            {/* Resume Download */}
            <div className="mt-8">
              <Button asChild className="bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <a href={developer?.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold section-title mb-6">Technical Skills</h3>
            
            {/* Skills Categories */}
            <div className="space-y-6">
              {skillCategories?.map((category) => (
                <div key={category.id}>
                  <h4 className="text-lg font-semibold text-neutral-700 mb-3">{category.name}</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span 
                        key={skill.id}
                        className="tech-tag bg-neutral-50 text-neutral-700 px-3 py-2 text-sm font-medium cursor-default"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
