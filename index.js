// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  developer;
  skillCategories;
  skills;
  projects;
  currentId;
  constructor() {
    this.skillCategories = /* @__PURE__ */ new Map();
    this.skills = /* @__PURE__ */ new Map();
    this.projects = /* @__PURE__ */ new Map();
    this.currentId = 1;
    this.initializeData();
  }
  initializeData() {
    this.developer = {
      id: 1,
      name: "Asma Attique",
      firstName: "Asma",
      lastName: "Attique",
      title: "Software Engineer",
      tagline: "Building efficient desktop and web applications that solve real problems. Passionate about clean code, scalable systems, and continuous learning.",
      email: "asma.attique.20@gmail.com",
      linkedin: "www.linkedin.com/in/asmaattique20/",
      github: "github.com/asmaattique",
      location: "Lahore, Pakistan",
      yearsExperience: 2,
      bio: "I discovered my passion for software development during my time at UET Lahore, where I studied Computer Engineering. What started with basic code quickly grew into a deep interest in solving complex problems through technology.\n\nSince becoming a Software Engineer, I've worked across the full stack; designing databases, writing optimized SQL queries, developing robust .NET backend services, and building clean front-end interfaces. My experience spans from maintaining enterprise systems to contributing to legacy system migrations that demanded both precision and adaptability.\n\nOver time, I've become more intentional about writing clean, maintainable code and understanding not just how things work, but why. I'm especially drawn to building systems that are scalable, user-friendly, and built to last.\n\nOutside of code, I'm focused on leveling up, whether it's diving into modern frameworks, refining my architecture skills, or stepping outside my comfort zone to take on new challenges.",
      resumeUrl: "/resume.pdf",
      profileImageUrl: "@assets/1614353584301_1750668703673.jpg"
    };
    const frontendCategory = { id: this.currentId++, name: "Frontend Technologies", order: 1 };
    const backendCategory = { id: this.currentId++, name: "Backend Development", order: 2 };
    const databaseCategory = { id: this.currentId++, name: "Database & ORM", order: 3 };
    const toolsCategory = { id: this.currentId++, name: "Tools & Technologies", order: 4 };
    this.skillCategories.set(frontendCategory.id, frontendCategory);
    this.skillCategories.set(backendCategory.id, backendCategory);
    this.skillCategories.set(databaseCategory.id, databaseCategory);
    this.skillCategories.set(toolsCategory.id, toolsCategory);
    const frontendSkills = [
      { id: this.currentId++, name: "WPF", categoryId: frontendCategory.id, order: 1 },
      { id: this.currentId++, name: "WinForms", categoryId: frontendCategory.id, order: 2 },
      { id: this.currentId++, name: "HTML", categoryId: frontendCategory.id, order: 3 },
      { id: this.currentId++, name: "CSS", categoryId: frontendCategory.id, order: 4 },
      { id: this.currentId++, name: "JavaScript", categoryId: frontendCategory.id, order: 5 }
    ];
    const backendSkills = [
      { id: this.currentId++, name: "C#", categoryId: backendCategory.id, order: 1 },
      { id: this.currentId++, name: ".NET Framework", categoryId: backendCategory.id, order: 2 },
      { id: this.currentId++, name: ".NET Core", categoryId: backendCategory.id, order: 3 }
    ];
    const databaseSkills = [
      { id: this.currentId++, name: "SQL Server", categoryId: databaseCategory.id, order: 1 },
      { id: this.currentId++, name: "Entity Framework", categoryId: databaseCategory.id, order: 2 },
      { id: this.currentId++, name: "SQL", categoryId: databaseCategory.id, order: 3 },
      { id: this.currentId++, name: "Database Design", categoryId: databaseCategory.id, order: 4 }
    ];
    const toolsSkills = [
      { id: this.currentId++, name: "Visual Studio", categoryId: toolsCategory.id, order: 1 },
      { id: this.currentId++, name: "SVN", categoryId: toolsCategory.id, order: 2 },
      { id: this.currentId++, name: "Jira", categoryId: toolsCategory.id, order: 3 },
      { id: this.currentId++, name: "SDLC", categoryId: toolsCategory.id, order: 4 }
    ];
    [...frontendSkills, ...backendSkills, ...databaseSkills, ...toolsSkills].forEach((skill) => {
      this.skills.set(skill.id, skill);
    });
    const projectList = [
      {
        id: this.currentId++,
        name: "E-commerce Analytics Platform",
        description: "A comprehensive analytics dashboard for e-commerce businesses featuring real-time sales tracking, customer insights, and automated reporting capabilities.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        liveUrl: "https://demo.example.com",
        githubUrl: "https://github.com/asmaattique/ecommerce-analytics",
        technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
        featured: true,
        order: 1
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
        order: 2
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
        order: 3
      }
    ];
    projectList.forEach((project) => {
      this.projects.set(project.id, project);
    });
  }
  async getDeveloper() {
    return this.developer;
  }
  async createOrUpdateDeveloper(developerData) {
    const developer = {
      id: this.developer?.id || 1,
      ...developerData,
      linkedin: developerData.linkedin || null,
      github: developerData.github || null,
      location: developerData.location || null,
      resumeUrl: developerData.resumeUrl || null,
      profileImageUrl: developerData.profileImageUrl || null
    };
    this.developer = developer;
    return developer;
  }
  async getSkillCategories() {
    return Array.from(this.skillCategories.values()).sort((a, b) => a.order - b.order);
  }
  async createSkillCategory(categoryData) {
    const category = {
      id: this.currentId++,
      ...categoryData,
      order: categoryData.order || 0
    };
    this.skillCategories.set(category.id, category);
    return category;
  }
  async getSkills() {
    return Array.from(this.skills.values()).sort((a, b) => a.order - b.order);
  }
  async getSkillsByCategory(categoryId) {
    return Array.from(this.skills.values()).filter((skill) => skill.categoryId === categoryId).sort((a, b) => a.order - b.order);
  }
  async createSkill(skillData) {
    const skill = {
      id: this.currentId++,
      ...skillData,
      order: skillData.order || 0
    };
    this.skills.set(skill.id, skill);
    return skill;
  }
  async getProjects() {
    return Array.from(this.projects.values()).sort((a, b) => a.order - b.order);
  }
  async getFeaturedProjects() {
    return Array.from(this.projects.values()).filter((project) => project.featured).sort((a, b) => a.order - b.order);
  }
  async createProject(projectData) {
    const project = {
      id: this.currentId++,
      ...projectData,
      order: projectData.order || 0,
      featured: projectData.featured || false,
      imageUrl: projectData.imageUrl || null,
      liveUrl: projectData.liveUrl || null,
      githubUrl: projectData.githubUrl || null
    };
    this.projects.set(project.id, project);
    return project;
  }
};
var storage = new MemStorage();

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/developer", async (req, res) => {
    try {
      const developer = await storage.getDeveloper();
      res.json(developer);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch developer profile" });
    }
  });
  app2.get("/api/skills", async (req, res) => {
    try {
      const categories = await storage.getSkillCategories();
      const skills = await storage.getSkills();
      const categoriesWithSkills = categories.map((category) => ({
        ...category,
        skills: skills.filter((skill) => skill.categoryId === category.id)
      }));
      res.json(categoriesWithSkills);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });
  app2.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getFeaturedProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0"
  }, () => {
    log(`serving on port ${port}`);
  });
})();
