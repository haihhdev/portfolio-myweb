# Portfolio Website

A full-stack portfolio website built with Next.js frontend and Node.js microservices backend.

## Architecture

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Backend**: Microservices architecture with Express.js
  - User Project Service (Port 5000)
  - About Service (Port 5001)
  - Resume Service (Port 5002)
- **Database**: MongoDB

## Local Development

### Prerequisites

- Node.js 18+
- MongoDB
- Docker (optional)

### Backend Services

1. **User Project Service**

```bash
cd back_end/user-project-service
npm install
npm run dev
```

2. **About Service**

```bash
cd back_end/about-service
npm install
npm run dev
```

3. **Resume Service**

```bash
cd back_end/resume-service
npm install
npm run dev
```

### Frontend

```bash
cd front-end
npm install
npm run dev
```

## Docker Deployment

### Local Docker

```bash
# Build and run all services
docker-compose up --build

# Run in background
docker-compose up -d --build
```

### Railway Deployment

1. **Connect Repository**

   - Push code to GitHub
   - Connect repository to Railway

2. **Environment Variables**
   Set these environment variables in Railway dashboard:

   ```
   MONGO_URI=your_mongodb_connection_string
   NEXT_PUBLIC_USER_PROJECT_API_URL=https://your-user-project-service.railway.app
   NEXT_PUBLIC_ABOUT_API_URL=https://your-about-service.railway.app
   NEXT_PUBLIC_RESUME_API_URL=https://your-resume-service.railway.app
   ```

3. **Deploy**
   - Railway will automatically detect docker-compose.yml
   - Build and deploy all services

## API Endpoints

### User Project Service (Port 5000)

- `GET /api/users` - Get user info
- `POST /api/users` - Create user
- `PUT /api/users` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/projects` - Get projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### About Service (Port 5001)

- `GET /api/about` - Get about info
- `POST /api/about` - Create about
- `PUT /api/about` - Update about
- `DELETE /api/about/:id` - Delete about

### Resume Service (Port 5002)

- `GET /api/resume` - Get resume
- `POST /api/resume` - Create resume
- `PUT /api/resume` - Update resume
- `DELETE /api/resume/:id` - Delete resume
- `GET /api/resume/export` - Export resume

## Features

- ✅ Responsive design
- ✅ Dark/Light mode
- ✅ Admin panel for content management
- ✅ Real-time updates
- ✅ Image upload
- ✅ PDF export
- ✅ SEO optimized
- ✅ Docker support
- ✅ Railway deployment ready

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Deployment**: Docker, Railway
- **Database**: MongoDB Atlas
