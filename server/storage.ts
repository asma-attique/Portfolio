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
      name: "John Smith",
      firstName: "John",
      lastName: "Smith",
      title: "Senior Software Engineer",
      tagline: "Building scalable web applications and cloud solutions that make a difference. Passionate about clean code, modern technologies, and collaborative development.",
      email: "john.smith@email.com",
      linkedin: "linkedin.com/in/johnsmith",
      github: "github.com/johnsmith",
      location: "San Francisco, CA",
      yearsExperience: 5,
      bio: "I discovered my passion for programming during college and have been building software solutions ever since. My journey has taken me from junior developer to technical lead, working with diverse teams and technologies. I specialize in full-stack development with expertise in modern JavaScript frameworks, cloud architecture, and DevOps practices. I'm particularly interested in building scalable solutions that solve real-world problems. When I'm not coding, you'll find me contributing to open-source projects, mentoring junior developers, or exploring the latest developments in AI and machine learning.",
      resumeUrl: "/resume.pdf",
      profileImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
    };

    // Create skill categories
    const frontendCategory: SkillCategory = { id: this.currentId++, name: "Frontend Development", order: 1 };
    const backendCategory: SkillCategory = { id: this.currentId++, name: "Backend Development", order: 2 };
    const cloudCategory: SkillCategory = { id: this.currentId++, name: "Cloud & DevOps", order: 3 };
    
    this.skillCategories.set(frontendCategory.id, frontendCategory);
    this.skillCategories.set(backendCategory.id, backendCategory);
    this.skillCategories.set(cloudCategory.id, cloudCategory);

    // Create skills
    const frontendSkills: Skill[] = [
      { id: this.currentId++, name: "React", categoryId: frontendCategory.id, order: 1 },
      { id: this.currentId++, name: "Vue.js", categoryId: frontendCategory.id, order: 2 },
      { id: this.currentId++, name: "TypeScript", categoryId: frontendCategory.id, order: 3 },
      { id: this.currentId++, name: "Tailwind CSS", categoryId: frontendCategory.id, order: 4 },
    ];

    const backendSkills: Skill[] = [
      { id: this.currentId++, name: "Node.js", categoryId: backendCategory.id, order: 1 },
      { id: this.currentId++, name: "Python", categoryId: backendCategory.id, order: 2 },
      { id: this.currentId++, name: "Express.js", categoryId: backendCategory.id, order: 3 },
      { id: this.currentId++, name: "PostgreSQL", categoryId: backendCategory.id, order: 4 },
      { id: this.currentId++, name: "MongoDB", categoryId: backendCategory.id, order: 5 },
    ];

    const cloudSkills: Skill[] = [
      { id: this.currentId++, name: "AWS", categoryId: cloudCategory.id, order: 1 },
      { id: this.currentId++, name: "Docker", categoryId: cloudCategory.id, order: 2 },
      { id: this.currentId++, name: "Kubernetes", categoryId: cloudCategory.id, order: 3 },
      { id: this.currentId++, name: "CI/CD", categoryId: cloudCategory.id, order: 4 },
    ];

    [...frontendSkills, ...backendSkills, ...cloudSkills].forEach(skill => {
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
        githubUrl: "https://github.com/johnsmith/ecommerce-analytics",
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
        githubUrl: "https://github.com/johnsmith/task-manager",
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
        githubUrl: "https://github.com/johnsmith/weather-api",
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
