/**
 * LocalStorage Database Layer
 * Provides persistent storage for all application data
 */

import { User, Photo, Collection, SavedPhoto } from '../types';

const STORAGE_KEYS = {
  USERS: 'shutterly_users',
  PHOTOS: 'shutterly_photos',
  CURRENT_USER: 'shutterly_current_user',
  LIKED_PHOTOS: 'shutterly_liked_photos',
  SAVED_PHOTOS: 'shutterly_saved_photos',
  COLLECTIONS: 'shutterly_collections',
  THEME: 'shutterly_theme',
} as const;

// User Operations
export const saveUsers = (users: User[]): void => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const getUsers = (): User[] => {
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  return data ? JSON.parse(data) : [];
};

export const saveCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};

export const getCurrentUser = (): User | null => {
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
};

// Photo Operations
export const savePhotos = (photos: Photo[]): void => {
  localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(photos));
};

export const getPhotos = (): Photo[] => {
  const data = localStorage.getItem(STORAGE_KEYS.PHOTOS);
  return data ? JSON.parse(data) : [];
};

// Liked Photos
export const saveLikedPhotos = (photoIds: Set<string>): void => {
  localStorage.setItem(STORAGE_KEYS.LIKED_PHOTOS, JSON.stringify([...photoIds]));
};

export const getLikedPhotos = (): Set<string> => {
  const data = localStorage.getItem(STORAGE_KEYS.LIKED_PHOTOS);
  return new Set(data ? JSON.parse(data) : []);
};

// Saved Photos
export const saveSavedPhotos = (savedPhotos: SavedPhoto[]): void => {
  localStorage.setItem(STORAGE_KEYS.SAVED_PHOTOS, JSON.stringify(savedPhotos));
};

export const getSavedPhotos = (): SavedPhoto[] => {
  const data = localStorage.getItem(STORAGE_KEYS.SAVED_PHOTOS);
  return data ? JSON.parse(data) : [];
};

// Collections
export const saveCollections = (collections: Collection[]): void => {
  localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(collections));
};

export const getCollections = (): Collection[] => {
  const data = localStorage.getItem(STORAGE_KEYS.COLLECTIONS);
  return data ? JSON.parse(data) : [];
};

// Theme
export const saveTheme = (theme: 'light' | 'dark'): void => {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
};

export const getTheme = (): 'light' | 'dark' => {
  const theme = localStorage.getItem(STORAGE_KEYS.THEME);
  return (theme === 'dark' ? 'dark' : 'light') as 'light' | 'dark';
};

// Clear all data (for logout)
export const clearAllData = (): void => {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
};

// Initialize database with mock data if empty
export const initializeDatabase = (mockUsers: User[], mockPhotos: Photo[]): void => {
  if (getUsers().length === 0) {
    saveUsers(mockUsers);
  }
  if (getPhotos().length === 0) {
    savePhotos(mockPhotos);
  }
};
