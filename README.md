# meal_dash

# FoodHub - Food Delivery Platform

## Overview

FoodHub is a modern full-stack food delivery application built with React and Express. The platform allows users to browse restaurants, search for food items, add items to cart, place orders, and interact with an AI-powered chatbot for food recommendations. The application features a clean, responsive design with real-time cart management and comprehensive search functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **UI Library**: Radix UI components with shadcn/ui for consistent, accessible design system
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **State Management**: React Context API for cart state management and TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation for type-safe form handling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules for type safety and modern syntax
- **Data Layer**: In-memory storage implementation with interface-based design for easy database migration
- **API Design**: RESTful endpoints with consistent error handling and request/response patterns
- **Development**: Hot reload with Vite integration for seamless full-stack development

### Database Schema Design
- **ORM**: Drizzle ORM with PostgreSQL dialect configured for future database integration
- **Schema**: Well-defined tables for restaurants, menu items, orders, and chat messages
- **Validation**: Zod schemas for runtime type validation and data integrity
- **Migration**: Drizzle Kit for database schema management and migrations

### Authentication & Session Management
- **Session Storage**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **User Management**: Basic user identification system for order tracking and chat sessions

### AI Integration
- **Provider**: OpenAI GPT-4o for intelligent food recommendations and chat responses
- **Features**: Context-aware recommendations based on available restaurants and menu items
- **Chat System**: Persistent chat sessions with message history and AI-powered assistance

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database driver
- **drizzle-orm**: Type-safe ORM for database operations
- **express**: Web application framework for Node.js
- **react**: Frontend UI library
- **@tanstack/react-query**: Server state management and caching

### UI & Styling
- **@radix-ui/react-***: Comprehensive suite of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Utility for creating component variants
- **lucide-react**: Icon library for consistent iconography

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Static type checking
- **tsx**: TypeScript execution environment
- **esbuild**: Fast JavaScript bundler for production builds

### AI & External Services
- **openai**: Official OpenAI API client for GPT integration
- **nanoid**: Unique ID generation for sessions and entities

### Form Handling & Validation
- **react-hook-form**: Performant form library with minimal re-renders
- **@hookform/resolvers**: Validation resolver for Zod integration
- **zod**: TypeScript-first schema validation

### Additional Utilities
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional className utility
- **cmdk**: Command palette component for search functionality
