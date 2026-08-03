# 🚀 Quick Start Guide - AI Content Generator Frontend

## Prerequisites
- ✅ Node.js 18 or higher
- ✅ npm or yarn
- ✅ Backend API running (http://localhost:9000)

## Option 1: Automated Setup (Recommended)

### Windows
```bash
# Run the setup script
setup.bat

# Start the development server
start-dev.bat
```

### Linux/Mac
```bash
# Make scripts executable
chmod +x setup.sh start-dev.sh

# Run the setup script
./setup.sh

# Start the development server
./start-dev.sh
```

## Option 2: Manual Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
```bash
# Create .env file (already exists)
# Or modify VITE_API_URL if your backend runs on a different port
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open Browser
Visit: **http://localhost:3000**

## 🎮 Using the Application

### Step 1: Landing Page
- View the hero section and features
- Click "Get Started" or "Sign In"

### Step 2: Authentication
**Option A - Demo Login:**
- Username: `demo`
- Password: `demo1234`

**Option B - Create Account:**
- Click "Sign Up"
- Enter username, email, and password
- Click "Create Account"

### Step 3: Dashboard
Once logged in, you'll see:
- **Left**: Upload section for files
- **Right**: Video preview area
- **Top**: Navigation with profile and dark mode toggle

### Step 4: Upload & Generate
1. Drag & drop a file OR click "Select File"
2. Supported files:
   - **Text**: .txt, .doc, .docx
   - **Images**: .jpg, .png, .gif
3. Click "Upload & Generate Video"
4. Wait for processing (may take a few moments)
5. Video appears in the preview section

### Step 5: Download
- Preview the generated video
- Click "Download Video" to save

## 🎨 Features to Explore

### Dark Mode
- Click the moon/sun icon in the top navbar
- Theme persists across sessions

### Profile Menu
- Click your profile picture (top right)
- View profile info
- Access settings
- Logout

### File Upload
- Supports drag & drop
- Real-time progress indicator
- File validation
- Error handling

## 📝 Demo Workflow

1. **Login** with demo credentials
2. **Upload** a text file or image
3. **Watch** the AI generate your video
4. **Preview** the video in the player
5. **Download** your creation

## 🔧 Troubleshooting

### "Cannot connect to backend"
**Solution:** Make sure backend is running:
```bash
cd backend
python quick_start.py
```

### "Port 3000 already in use"
**Solution:** Change port in terminal:
```bash
npm run dev -- --port 3001
```

### "Module not found" errors
**Solution:** Reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Dark mode not working
**Solution:** Clear browser localStorage and refresh

## 🌐 Backend Configuration

### Default Backend URL
```
http://localhost:9000
```

### Change Backend URL
Edit `.env` file:
```env
VITE_API_URL=http://your-backend-url:port
```

Then restart the dev server.

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Check for errors
```

## 🎯 Testing Checklist

- [ ] Landing page loads correctly
- [ ] Can navigate to auth page
- [ ] Can login with demo credentials
- [ ] Dashboard displays after login
- [ ] Can toggle dark mode
- [ ] Can upload a file
- [ ] Upload progress shows
- [ ] Video generates successfully
- [ ] Video preview works
- [ ] Can download video
- [ ] Can logout
- [ ] Responsive on mobile

## 💡 Tips

1. **Keep backend running** while using the app
2. **Use demo credentials** for quick testing
3. **Try dark mode** for better experience
4. **Upload small files** first (< 5MB) for faster testing
5. **Check console** (F12) for any errors

## 🆘 Need Help?

1. Check `README.md` for full documentation
2. Check `DEVELOPMENT.md` for developer guide
3. Review backend API documentation
4. Check browser console for errors

## ✅ Success Indicators

You'll know everything is working when:
- ✅ Frontend loads at http://localhost:3000
- ✅ Backend is accessible at http://localhost:9000
- ✅ You can login successfully
- ✅ File upload completes without errors
- ✅ Video generates and displays
- ✅ Download works correctly

## 🚀 Next Steps

After setup:
1. **Explore** all features
2. **Try** different file types
3. **Test** dark mode
4. **Check** responsive design on mobile
5. **Review** code structure for customization

---

**Ready to create amazing AI-powered videos!** 🎥✨

**Note:** This is a frontend-only build. The backend API must be running for full functionality.
