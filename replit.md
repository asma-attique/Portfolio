# Portfolio Application - Replit.md

## Overview

This is a modern full-stack portfolio application built for showcasing developer profiles, skills, and projects. The application follows a clean architecture with a React frontend and Express.js backend, designed to display professional developer portfolios with dynamic data management.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Framework**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API with JSON responses
- **Development**: tsx for TypeScript execution in development
- **Production**: esbuild for bundling server code

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured via Neon serverless)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Environment-based database URL configuration

## Key Components

### Data Models
- **Developer Profile**: Core profile information including name, title, bio, contact details
- **Skill Categories**: Organized skill groupings with ordering support
- **Skills**: Individual skills linked to categories
- **Projects**: Portfolio projects with metadata, technologies, and links

### API Endpoints
- `GET /api/developer` - Retrieve developer profile information
- `GET /api/skills` - Fetch skill categories with associated skills
- `GET /api/projects` - Get featured projects for portfolio display

### Storage Layer
- **Interface**: IStorage interface for data access abstraction
- **Implementation**: MemStorage class for in-memory development storage
- **Future**: Designed to support database implementations via Drizzle ORM

### UI Components
- **Navigation**: Fixed navigation with smooth scrolling and active section detection
- **Hero Section**: Profile showcase with image and call-to-action buttons
- **About Section**: Skills display with loading states and responsive design
- **Projects Section**: Featured projects grid with external links
- **Footer**: Contact information and social media links

## Data Flow

1. **Client Request**: React components trigger API calls via TanStack Query
2. **API Layer**: Express routes handle requests and call storage layer
3. **Data Storage**: Storage interface abstracts data access (currently in-memory)
4. **Response**: JSON data returned to client with error handling
5. **UI Update**: React Query manages caching and UI state updates

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless driver
- **@tanstack/react-query**: Server state management
- **drizzle-orm**: Type-safe ORM for database operations
- **@radix-ui/***: Headless UI component library
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **vite**: Frontend build tool and dev server
- **drizzle-kit**: Database schema management
- **tsx**: TypeScript execution for development
- **esbuild**: Server code bundling for production

### UI Enhancement
- **class-variance-authority**: Component variant management
- **clsx**: Conditional className utility
- **cmdk**: Command palette component
- **date-fns**: Date manipulation utilities

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Node.js 20 and PostgreSQL 16 modules
- **Dev Server**: Vite dev server on port 5000 with HMR
- **Database**: Environment variable-based PostgreSQL connection
- **Hot Reload**: Full-stack development with automatic restarts

### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Deployment**: Autoscale deployment target on Replit
- **Database**: Production PostgreSQL via environment configuration

### Configuration
- **Environment**: NODE_ENV-based environment detection
- **Build Process**: Parallel frontend and backend builds
- **Static Assets**: Served from Express in production
- **Database Migrations**: Drizzle Kit push command for schema updates

## Recent Changes

- June 24, 2025: Restructured project to move index.html and index.css to main portfolio folder
- June 24, 2025: Updated footer with real LinkedIn, email, and Lahore address
- June 24, 2025: Initial setup with professional .NET developer portfolio

## User Preferences

Preferred communication style: Simple, everyday language.