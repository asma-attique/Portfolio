import { 
  developers, 
  skillCategories, 
  skills, 
  projects,
  type Developer, 
  type InsertDeveloper,
  type SkillCategory,
  type InsertSkillCategory,
  type Skill,
  type InsertSkill,
  type Project,
  type InsertProject
} from "@shared/schema";

export interface IStorage {
  // Developer methods
  getDeveloper(): Promise<Developer | undefined>;
  createOrUpdateDeveloper(developer: InsertDeveloper): Promise<Developer>;
  
  // Skill category methods
  getSkillCategories(): Promise<SkillCategory[]>;
  createSkillCategory(category: InsertSkillCategory): Promise<SkillCategory>;
  
  // Skill methods
  getSkills(): Promise<Skill[]>;
  getSkillsByCategory(categoryId: number): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  
  // Project methods
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  

}

export class MemStorage implements IStorage {
  private developer: Developer | undefined;
  private skillCategories: Map<number, SkillCategory>;
  private skills: Map<number, Skill>;
  private projects: Map<number, Project>;

  private currentId: number;

  constructor() {
    this.skillCategories = new Map();
    this.skills = new Map();
    this.projects = new Map();

    this.currentId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Create developer profile
    this.developer = {
      id: 1,
      name: "Asma Attique",
      firstName: "Asma",
      lastName: "Attique",
      title: "Software Engineer",
      tagline: "Building efficient desktop and web applications that solve real problems. Passionate about clean code, scalable systems, and continuous learning.",
      email: "asma.attique@email.com",
      linkedin: "linkedin.com/in/asmaattique",
      github: "github.com/asmaattique",
      location: "Lahore, Pakistan",
      yearsExperience: 2,
      bio: "I discovered my passion for software development during my time at UET Lahore, where I studied Computer Engineering. What started with basic code quickly grew into a deep interest in solving complex problems through technology.\n\nSince becoming a Software Engineer, I've worked across the full stack; designing databases, writing optimized SQL queries, developing robust .NET backend services, and building clean front-end interfaces. My experience spans from maintaining enterprise systems to contributing to legacy system migrations that demanded both precision and adaptability.\n\nOver time, I've become more intentional about writing clean, maintainable code and understanding not just how things work, but why. I'm especially drawn to building systems that are scalable, user-friendly, and built to last.\n\nOutside of code, I'm focused on leveling up, whether it's diving into modern frameworks, refining my architecture skills, or stepping outside my comfort zone to take on new challenges.",
      resumeUrl: "/resume.pdf",
      profileImageUrl: "@assets/1614353584301_1750668703673.jpg"
    };

    // Create skill categories
    const frontendCategory: SkillCategory = { id: this.currentId++, name: "Frontend Technologies", order: 1 };
    const backendCategory: SkillCategory = { id: this.currentId++, name: "Backend Development", order: 2 };
    const databaseCategory: SkillCategory = { id: this.currentId++, name: "Database & ORM", order: 3 };
    const toolsCategory: SkillCategory = { id: this.currentId++, name: "Tools & Technologies", order: 4 };
    
    this.skillCategories.set(frontendCategory.id, frontendCategory);
    this.skillCategories.set(backendCategory.id, backendCategory);
    this.skillCategories.set(databaseCategory.id, databaseCategory);
    this.skillCategories.set(toolsCategory.id, toolsCategory);

    // Create skills
    const frontendSkills: Skill[] = [
      { id: this.currentId++, name: "WPF", categoryId: frontendCategory.id, order: 1 },
      { id: this.currentId++, name: "WinForms", categoryId: frontendCategory.id, order: 2 },
      { id: this.currentId++, name: "HTML", categoryId: frontendCategory.id, order: 3 },
      { id: this.currentId++, name: "CSS", categoryId: frontendCategory.id, order: 4 },
      { id: this.currentId++, name: "JavaScript", categoryId: frontendCategory.id, order: 5 },
    ];

    const backendSkills: Skill[] = [
      { id: this.currentId++, name: "C#", categoryId: backendCategory.id, order: 1 },
      { id: this.currentId++, name: ".NET Framework", categoryId: backendCategory.id, order: 2 },
      { id: this.currentId++, name: ".NET Core", categoryId: backendCategory.id, order: 3 },

    ];

    const databaseSkills: Skill[] = [
      { id: this.currentId++, name: "SQL Server", categoryId: databaseCategory.id, order: 1 },
      { id: this.currentId++, name: "Entity Framework", categoryId: databaseCategory.id, order: 2 },
      { id: this.currentId++, name: "SQL", categoryId: databaseCategory.id, order: 3 },
      { id: this.currentId++, name: "Database Design", categoryId: databaseCategory.id, order: 4 },
    ];

    const toolsSkills: Skill[] = [
      { id: this.currentId++, name: "Visual Studio", categoryId: toolsCategory.id, order: 1 },
      { id: this.currentId++, name: "SVN", categoryId: toolsCategory.id, order: 2 },
      { id: this.currentId++, name: "Jira", categoryId: toolsCategory.id, order: 3 },
      { id: this.currentId++, name: "SDLC", categoryId: toolsCategory.id, order: 4 },
    ];

    [...frontendSkills, ...backendSkills, ...databaseSkills, ...toolsSkills].forEach(skill => {
      this.skills.set(skill.id, skill);
    });

    // Create projects
    const projectList: Project[] = [
      {
        id: this.currentId++,
        name: "E-commerce Analytics Platform",
        description: "A comprehensive analytics dashboard for e-commerce businesses featuring real-time sales tracking, customer insights, and automated reporting capabilities.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        liveUrl: "https://demo.example.com",
        githubUrl: "https://github.com/asmaattique/ecommerce-analytics",
        technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
        featured: true,
        order: 1,
      },
      {
        id: this.currentId++,
        name: "Task Management App",
        description: "A collaborative task management application with real-time updates, team workspaces, and advanced project tracking features.",
        imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        liveUrl: "https://taskapp.example.com",
        githubUrl: "https://github.com/asmaattique/task-manager",
        technologies: ["Vue.js", "Express", "MongoDB", "Socket.io"],
        featured: true,
        order: 2,
      },
      {
        id: this.currentId++,
        name: "Weather Forecast API",
        description: "A comprehensive weather API service providing accurate forecasts, historical data, and location-based weather insights for developers.",
        imageUrl: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        liveUrl: "https://weather-api.example.com",
        githubUrl: "https://github.com/asmaattique/weather-api",
        technologies: ["Python", "FastAPI", "Docker", "Redis"],
        featured: true,
        order: 3,
      },
    ];

    projectList.forEach(project => {
      this.projects.set(project.id, project);
    });
  }

  async getDeveloper(): Promise<Developer | undefined> {
    return this.developer;
  }

  async createOrUpdateDeveloper(developerData: InsertDeveloper): Promise<Developer> {
    const developer: Developer = {
      id: this.developer?.id || 1,
      ...developerData,
      linkedin: developerData.linkedin || null,
      github: developerData.github || null,
      location: developerData.location || null,
      resumeUrl: developerData.resumeUrl || null,
      profileImageUrl: developerData.profileImageUrl || null,
    };
    this.developer = developer;
    return developer;
  }

  async getSkillCategories(): Promise<SkillCategory[]> {
    return Array.from(this.skillCategories.values()).sort((a, b) => a.order - b.order);
  }

  async createSkillCategory(categoryData: InsertSkillCategory): Promise<SkillCategory> {
    const category: SkillCategory = {
      id: this.currentId++,
      ...categoryData,
      order: categoryData.order || 0,
    };
    this.skillCategories.set(category.id, category);
    return category;
  }

  async getSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values()).sort((a, b) => a.order - b.order);
  }

  async getSkillsByCategory(categoryId: number): Promise<Skill[]> {
    return Array.from(this.skills.values())
      .filter(skill => skill.categoryId === categoryId)
      .sort((a, b) => a.order - b.order);
  }

  async createSkill(skillData: InsertSkill): Promise<Skill> {
    const skill: Skill = {
      id: this.currentId++,
      ...skillData,
      order: skillData.order || 0,
    };
    this.skills.set(skill.id, skill);
    return skill;
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => a.order - b.order);
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.featured)
      .sort((a, b) => a.order - b.order);
  }

  async createProject(projectData: InsertProject): Promise<Project> {
    const project: Project = {
      id: this.currentId++,
      ...projectData,
      order: projectData.order || 0,
      featured: projectData.featured || false,
      imageUrl: projectData.imageUrl || null,
      liveUrl: projectData.liveUrl || null,
      githubUrl: projectData.githubUrl || null,
    };
    this.projects.set(project.id, project);
    return project;
  }


}

export const storage = new MemStorage();
