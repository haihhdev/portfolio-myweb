# 🚀 Portfolio Website - Full Stack Developer Portfolio

A modern, responsive portfolio website showcasing professional experience, projects, and skills. Built with a microservices architecture for scalability and maintainability.

## 🏗️ Architecture Overview

### Frontend

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth interactions
- **UI Components**: Custom components with shadcn/ui inspiration
- **State Management**: React hooks with localStorage persistence
- **Deployment**: Vercel

### Backend (Microservices)

- **User Project Service** (Port 5000) - User profiles and project management
- **About Service** (Port 5001) - About section and skills management
- **Resume Service** (Port 5002) - Resume and experience management
- **Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Deployment**: Render.com

### Database

- **Primary**: MongoDB Atlas (Cloud)
- **Local**: MongoDB Community Edition

## 🛠️ Local Development Setup

### Prerequisites

- **Node.js**: Version 18 or higher
- **MongoDB**: Community Edition or MongoDB Atlas
- **Git**: For version control
- **Docker**: Optional, for containerized development

### Quick Start

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/portfolio-myweb.git
cd portfolio-myweb
```

2. **Install dependencies**

```bash
# Frontend
cd front-end
npm install

# Backend services
cd ../back_end/user-project-service
npm install

cd ../about-service
npm install

cd ../resume-service
npm install
```

3. **Environment Setup**

```bash
# Create .env files for each service
# See .env.example files in each service directory
```

### 🚀 Starting the Services

#### Backend Services

1. **User Project Service** (Port 5000)

```bash
cd back_end/user-project-service
npm run dev
# Service will be available at http://localhost:5000
```

2. **About Service** (Port 5001)

```bash
cd back_end/about-service
npm run dev
# Service will be available at http://localhost:5001
```

3. **Resume Service** (Port 5002)

```bash
cd back_end/resume-service
npm run dev
# Service will be available at http://localhost:5002
```

#### Frontend Development

```bash
cd front-end
npm run dev
# Frontend will be available at http://localhost:3000
```

## 🔌 API Documentation

### User Project Service (Port 5000)

#### User Management

- `GET /api/users` - Get user profile information
- `POST /api/users` - Create new user profile
- `PUT /api/users` - Update user profile
- `DELETE /api/users/:id` - Delete user profile

#### Project Management

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### About Service (Port 5001)

#### About Section

- `GET /api/about` - Get about section content
- `POST /api/about` - Create about section
- `PUT /api/about` - Update about section
- `DELETE /api/about/:id` - Delete about section

### Resume Service (Port 5002)

#### Resume Management

- `GET /api/resume` - Get resume content
- `POST /api/resume` - Create resume
- `PUT /api/resume` - Update resume
- `DELETE /api/resume/:id` - Delete resume
- `GET /api/resume/export` - Export resume as PDF

## ✨ Features

### 🎨 User Experience

- ✅ **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- ✅ **Dark/Light Mode** - Toggle between themes with system preference detection
- ✅ **Smooth Animations** - Framer Motion powered transitions and micro-interactions
- ✅ **Modern UI/UX** - Clean, professional design with Tailwind CSS

### 🛠️ Content Management

- ✅ **Admin Panel** - Settings page for easy content management
- ✅ **Real-time Updates** - Instant content updates without page refresh
- ✅ **Image Upload** - Drag & drop image upload for projects
- ✅ **Rich Text Editor** - WYSIWYG editor for content creation
- ✅ **Toast Notifications** - User feedback for all actions

### 📄 Portfolio Features

- ✅ **Dynamic Projects** - Add, edit, delete projects with technologies
- ✅ **About Section** - Customizable biography and skills
- ✅ **Resume Builder** - Professional resume with experience and education
- ✅ **PDF Export** - Download resume as PDF
- ✅ **Contact Form** - Functional contact form with validation

### 🚀 Technical Features

- ✅ **SEO Optimized** - Meta tags, structured data, and performance
- ✅ **Microservices Architecture** - Scalable and maintainable backend
- ✅ **Docker Support** - Containerized development and deployment
- ✅ **Vercel Deployment** - Frontend deployed on Vercel
- ✅ **Render Deployment** - Backend services deployed on Render
- ✅ **MongoDB Atlas** - Cloud database with automatic backups

## 📁 Project Structure

```
portfolio-myweb/
├── front-end/                 # Next.js frontend application
│   ├── app/                  # App Router pages
│   ├── components/           # React components
│   ├── lib/                  # Utility functions
│   └── public/               # Static assets
├── back_end/                 # Microservices backend
│   ├── user-project-service/ # User & project management
│   ├── about-service/        # About section management
│   └── resume-service/       # Resume management
├── logs/                     # Application logs
├── docker-compose.yml        # Docker configuration
└── README.md                 # This file
```

⭐ **Star this repository if you found it helpful!**
