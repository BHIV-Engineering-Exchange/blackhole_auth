# AI Content Generator - Frontend

> **Frontend Only Build** — Backend integration already exists.

A modern, responsive React + TypeScript frontend for the AI Content Generator platform. Convert your ideas, words, or images into engaging text videos with the power of AI.

![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff)

## ✨ Features

### 🎨 Modern UI/UX
- Clean, minimalist design with TailwindCSS
- Smooth animations and transitions
- Fully responsive (mobile, tablet, desktop)
- Dark mode support with theme toggle

### 🔐 Authentication
- Login and Signup forms
- JWT token-based authentication
- Secure token storage
- Protected routes
- Demo credentials for quick testing

### 📤 File Upload
- Drag & drop file upload
- Support for text files (.txt, .doc, .docx)
- Support for images (.jpg, .png, .gif)
- Real-time upload progress
- File validation and error handling

### 🎥 Video Generation
- AI-powered video generation
- Real-time processing status
- Video preview player
- Download functionality
- Progress indicators

### 🎯 Dashboard Features
- User-friendly navigation bar
- Profile dropdown menu
- Dark/Light mode toggle
- Settings access
- Upload section with live feedback
- Video preview with multiple states

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Backend API running (default: http://localhost:9000)

### Installation

1. **Clone the repository** (if not already done)
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your backend URL
# VITE_API_URL=http://localhost:9000
```

4. **Start the development server**
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar.tsx      # Navigation bar with profile menu
│   │   ├── UploadSection.tsx   # File upload interface
│   │   └── VideoPreview.tsx    # Video player and preview
│   ├── context/            # React Context providers
│   │   ├── AuthContext.tsx    # Authentication state management
│   │   └── ThemeContext.tsx   # Theme (dark/light) management
│   ├── pages/              # Page components
│   │   ├── LandingPage.tsx    # Landing/home page
│   │   ├── AuthPage.tsx       # Login/Signup page
│   │   └── Dashboard.tsx      # Main dashboard
│   ├── services/           # API integration
│   │   └── api.ts            # Axios instance and API calls
│   ├── lib/                # Utility functions
│   │   └── utils.ts          # Helper functions
│   ├── App.tsx             # Main app component with routing
│   ├── main.tsx            # React entry point
│   └── index.css           # Global styles and Tailwind
├── public/                 # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 🔌 API Integration

The frontend connects to the backend API for:

### Authentication Endpoints
- `POST /users/register` - User registration
- `POST /users/login` - User login
- `GET /users/profile` - Get user profile
- `GET /demo-login` - Get demo credentials

### Content & Video Endpoints
- `POST /upload` - Upload files
- `POST /generate-video` - Generate video from content
- `GET /content/{id}` - Get content details
- `GET /contents` - List all contents
- `GET /stream/{id}` - Stream video
- `GET /download/{id}` - Download video

### Configuration
API base URL is configurable via environment variables:
```env
VITE_API_URL=http://localhost:9000
```

## 🎨 Styling

### TailwindCSS
- Custom color palette with primary colors
- Dark mode support via `dark:` classes
- Custom animations (fade-in, slide-up, pulse-slow)
- Utility-first approach

### Custom Components
Pre-styled components available:
- `.btn` - Base button styles
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.input` - Form input styles
- `.card` - Card container styles

## 🔒 Authentication Flow

1. User visits landing page
2. Clicks "Get Started" or "Sign In"
3. Redirected to authentication page
4. User can:
   - Login with existing credentials
   - Register new account
   - Use demo credentials (username: `demo`, password: `demo1234`)
5. Upon successful auth:
   - JWT token stored in localStorage
   - User redirected to dashboard
6. Dashboard is protected - requires valid token
7. Token included in all API requests via interceptor
8. Logout clears token and redirects to auth page

## 📱 Responsive Design

The application is fully responsive:
- **Mobile** (< 768px): Single column layout
- **Tablet** (768px - 1024px): Optimized for touch
- **Desktop** (> 1024px): Two-column dashboard layout

## 🌙 Dark Mode

Dark mode is implemented using:
- Tailwind's `dark:` classes
- System preference detection
- Manual toggle in navigation bar
- Persistent storage in localStorage

## 🧪 Testing Credentials

For quick testing, use these demo credentials:
- **Username**: `demo`
- **Password**: `demo1234`

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Technology Stack

- **Framework**: React 18.2
- **Language**: TypeScript 5.3
- **Build Tool**: Vite 5.0
- **Styling**: TailwindCSS 3.4
- **Routing**: React Router 6.21
- **HTTP Client**: Axios 1.6
- **Icons**: Lucide React
- **State Management**: React Context API

## 📝 Environment Variables

Create a `.env` file in the frontend directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:9000

# App Configuration
VITE_APP_NAME="AI Content Generator"
VITE_APP_TAGLINE="Convert your ideas, words, or images into engaging text videos"
```

## 🚧 Important Notes

- **Backend Dependency**: This frontend requires the backend API to be running
- **CORS**: Ensure backend has CORS enabled for the frontend origin
- **API Endpoints**: Do not modify backend code - this is frontend only
- **Authentication**: Backend must support JWT token authentication
- **File Upload**: Backend must handle multipart/form-data uploads

## 🎯 Key Features Implemented

✅ Landing page with hero section and features
✅ User authentication (Login/Signup)
✅ Protected routes with authentication guards
✅ Dashboard with navigation bar
✅ Profile dropdown menu
✅ Dark/Light mode toggle
✅ File upload with drag & drop
✅ Real-time upload progress
✅ Video generation workflow
✅ Video preview and playback
✅ Download functionality
✅ Responsive design
✅ Error handling and validation
✅ Loading states and animations

## 📚 Component Documentation

### Navbar
- Logo and branding
- Dark mode toggle
- Settings button
- Profile dropdown with user info and logout

### UploadSection
- Drag & drop file upload
- File type validation
- Upload progress indicator
- Error handling
- File preview

### VideoPreview
- Multiple states: idle, uploading, generating, completed, error
- Video player with controls
- Download button
- Video information display

## 🤝 Integration with Backend

The frontend is designed to work seamlessly with the existing backend:

1. **No Backend Changes Required**: All integration via API calls
2. **Environment-based Configuration**: API URL configurable
3. **Standard HTTP Methods**: RESTful API communication
4. **JWT Authentication**: Standard Bearer token format
5. **FormData Upload**: Compatible with FastAPI file upload

## 📄 License

This project is part of the AI Content Generator platform.

---

**Built with ❤️ using React + TypeScript + TailwindCSS**

**Comment**: Frontend Only Build — Backend integration already exists.
