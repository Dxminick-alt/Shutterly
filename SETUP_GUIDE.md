# Shutterly Setup Guide

## Prerequisites

Before running Shutterly, ensure you have the following installed:

### 1. Install Node.js
- Download from: https://nodejs.org/
- **Recommended version**: Node.js 18.x or higher (LTS version)
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

## Installation Steps

### Step 1: Navigate to Project Directory
```bash
cd "C:\University\Technology and methodology\shutterly"
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all required packages including:
- React & React DOM
- TypeScript
- Vite
- Radix UI components
- Tailwind CSS
- Lucide React icons
- And all other dependencies listed in `package.json`

### Step 3: Run Development Server
```bash
npm run dev
```

The application will start at `http://localhost:5173/` (or another port if 5173 is in use)

### Step 4: Build for Production (Optional)
```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## Features Overview

### ✅ All Tasks Implemented

#### Task 7: User Authentication & Profiles
- Login/Signup with email and password
- User profiles with avatar, bio, followers, following
- Profile editing capabilities

#### Task 9: Photo Management
- Upload photos with title, description, category
- Pinterest-style masonry grid layout
- Photo detail view with full information

#### Task 10: Social Features
- Like/unlike photos
- Comment on photos
- Follow/unfollow users
- Create and manage collections
- Save photos to collections

#### Task 11: Download & Search
- Download photos in multiple sizes (800px, 1280px, 1920px, original)
- Real-time search (searches as you type)
- Search by title, description, category, photographer name

#### Extra Task: Database (LocalStorage)
- All data persists across sessions
- Users, photos, likes, saves, collections stored in browser
- Automatic data synchronization
- CRUD operations (Create, Read, Update, Delete)

### Theme Support
- Light and dark mode
- Theme toggle on login page and navigation
- Preference saved across sessions

### Responsive Design
- Works on desktop, tablet, and mobile
- Adaptive masonry grid (1-5 columns)
- Touch-friendly interface

## Troubleshooting

### Port Already in Use
If port 5173 is already in use:
```bash
# The terminal will suggest an alternative port
# Or manually specify a port:
npm run dev -- --port 3000
```

### Clear Browser Data
If you experience issues with stale data:
1. Open browser DevTools (F12)
2. Go to Application/Storage tab
3. Clear all "shutterly_*" items from LocalStorage
4. Refresh the page

### Module Not Found Errors
If you see "Cannot find module" errors:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Default Test Accounts

The app comes with pre-loaded test users and photos:

### Users:
1. **Sarah Johnson** - sarah@example.com
2. **Mike Chen** - mike@example.com
3. **Emma Davis** - emma@example.com
4. **Alex Rivera** - alex@example.com

You can sign up with any email/password to create a new account.

## Project Structure

```
shutterly/
├── src/
│   ├── components/       # React components
│   │   ├── ui/          # Radix UI primitives
│   │   ├── LoginPage.tsx
│   │   ├── TopNavigation.tsx
│   │   ├── PhotoGrid.tsx
│   │   ├── PhotoModal.tsx
│   │   ├── ProfilePage.tsx
│   │   └── ...
│   ├── contexts/         # React contexts (Theme)
│   ├── lib/
│   │   ├── mockData.ts  # Initial sample data
│   │   └── storage.ts   # LocalStorage database layer
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Development Tips

### Hot Module Replacement (HMR)
Vite provides instant updates - save any file and see changes immediately without losing application state.

### TypeScript
All files are type-checked. VSCode will show errors inline.

### Adding New Photos
Photos are stored in `localStorage`. Upload via the UI or modify `src/lib/mockData.ts` and clear localStorage.

### Customizing Theme
Edit `src/styles/globals.css` to modify colors and styles.

## Browser Compatibility

Tested and working on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Opera (latest)

## Team

- **Youssef**
- **Dominic**
- **Mustafa**

## Support

For issues or questions:
1. Check this guide
2. Review `FEATURES_IMPLEMENTATION.md`
3. Check browser console for errors
4. Verify Node.js and npm are installed correctly

---

**Last Updated**: November 16, 2025  
**Version**: 1.0.0
