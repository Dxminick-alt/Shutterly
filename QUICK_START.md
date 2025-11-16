# Shutterly - Quick Start Guide

## 🚀 What Changed?

Your project has been upgraded from vanilla HTML/CSS/JS to a **professional React/TypeScript application** with the Figma design system!

## ✅ All Tasks Completed

### ✔️ Task 7: User Authentication & Profiles
- Login/Signup with email & password
- User profiles with avatars, bio, followers/following
- Edit profile functionality

### ✔️ Task 9: Photo Management  
- Upload photos (title, description, category)
- Pinterest-style masonry grid
- 10+ photo categories (Portrait, Landscape, Wedding, etc.)

### ✔️ Task 10: Social Features
- ❤️ Like/Unlike photos
- 💬 Comment on photos  
- 👥 Follow/Unfollow users
- 📁 Create collections
- 💾 Save photos to collections

### ✔️ Task 11: Download & Search
- 📥 Download in 4 sizes (800px, 1280px, 1920px, original)
- 🔍 Real-time search (searches as you type)
- Search by title, description, category, author

### ✔️ Extra: Database (LocalStorage)
- 💾 All data persists across browser sessions
- Automatic save on every action
- Full CRUD operations

## 📦 Installation (ONE TIME ONLY)

### Step 1: Install Node.js
**Download**: https://nodejs.org/ (v18 or higher)

Verify:
```bash
node --version
npm --version
```

### Step 2: Install Dependencies
Open PowerShell in the `shutterly` folder:
```bash
cd "C:\University\Technology and methodology\shutterly"
npm install
```

⏳ This takes 2-3 minutes on first run.

## ▶️ Run the Project

### Start Development Server
```bash
npm run dev
```

✅ Open browser to: **http://localhost:5173/**

### Stop Server
Press `Ctrl + C` in the terminal

## 🎨 Features Highlight

### Professional UI Components
- **Radix UI**: Accessible, production-ready components
- **Tailwind CSS**: Modern, responsive styling
- **Lucide Icons**: Clean, crisp icons
- **Dark Mode**: Toggle between light/dark themes

### Responsive Design
- ✅ Desktop (5-column grid)
- ✅ Tablet (2-3 column grid)
- ✅ Mobile (1 column)

### Data Persistence
All your actions are saved automatically:
- ✅ User accounts
- ✅ Uploaded photos
- ✅ Likes & Saves
- ✅ Comments
- ✅ Collections
- ✅ Theme preference

## 📂 Project Structure

```
shutterly/
├── src/
│   ├── components/         # All React components
│   ├── lib/
│   │   ├── mockData.ts    # Sample photos/users
│   │   └── storage.ts     # LocalStorage database
│   ├── types/             # TypeScript definitions
│   └── App.tsx            # Main app logic
├── package.json           # Dependencies
└── vite.config.ts         # Build configuration
```

## 🧪 Test the Features

### Try These:
1. **Sign up** with any email/password
2. **Upload a photo** (use any image from your computer)
3. **Like** photos (heart icon)
4. **Comment** on photos (click photo → add comment)
5. **Follow** other users (click their profile)
6. **Create a collection** (save photo → create new)
7. **Search** in real-time (type in search bar)
8. **Download** photos (click download → select size)
9. **Toggle dark mode** (moon/sun icon)
10. **Refresh page** - all data persists!

## 📚 Documentation

- **SETUP_GUIDE.md** - Detailed setup instructions
- **FEATURES_IMPLEMENTATION.md** - Complete features list
- **README.md** - Project overview

## 🐛 Troubleshooting

### "npm: command not found"
→ Install Node.js from https://nodejs.org/

### Port 5173 already in use
→ The terminal will suggest an alternative port automatically

### Clear all data
1. Press F12 (DevTools)
2. Go to Application → Local Storage
3. Delete all `shutterly_*` entries

## 👥 Team Members

- Youssef
- Dominic  
- Mustafa

## 🎯 What's Next?

The app is **production-ready** with all tasks completed! 

Optional enhancements:
- Add real backend API
- Deploy to Vercel/Netlify
- Add image filters
- Implement direct messaging

---

**Version**: 1.0.0  
**Last Updated**: November 16, 2025  
**Repository**: https://github.com/Dxminick-alt/Shutterly
