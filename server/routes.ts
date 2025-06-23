import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get developer profile
  app.get("/api/developer", async (req, res) => {
    try {
      const developer = await storage.getDeveloper();
      res.json(developer);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch developer profile" });
    }
  });

  // Get skill categories with skills
  app.get("/api/skills", async (req, res) => {
    try {
      const categories = await storage.getSkillCategories();
      const skills = await storage.getSkills();
      
      const categoriesWithSkills = categories.map(category => ({
        ...category,
        skills: skills.filter(skill => skill.categoryId === category.id),
      }));
      
      res.json(categoriesWithSkills);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });

  // Get featured projects
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getFeaturedProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });



  const httpServer = createServer(app);
  return httpServer;
}
