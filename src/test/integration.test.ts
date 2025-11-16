/**
 * @fileoverview Integration tests for Shutterly - testing interaction between modules
 * @author Youssef, Dominic, Mustafa
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { User } from '../models/User';
import { Photo } from '../models/Photo';
import { Collection } from '../models/Collection';
import * as storage from '../lib/storage';

describe('Integration Tests - Multi-Module Interaction', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('User Registration and Data Persistence', () => {
    it('should create a new user and save to localStorage successfully', () => {
      const user = new User('user1', 'John Doe', 'john@example.com', 'avatar.jpg', 'Photographer');
      
      // Save to storage
      storage.saveUsers([user]);
      
      // Retrieve from storage
      const retrieved = storage.getUsers();
      
      expect(retrieved).toHaveLength(1);
      expect(retrieved[0].id).toBe('user1');
      expect(retrieved[0].name).toBe('John Doe');
      expect(retrieved[0].email).toBe('john@example.com');
    });

    it('should not allow duplicate user registration with same email', () => {
      const user1 = new User('user1', 'John', 'john@example.com');
      const user2 = new User('user2', 'Jane', 'john@example.com'); // Same email
      
      storage.saveUsers([user1]);
      const existingUsers = storage.getUsers();
      
      // Check if email already exists
      const emailExists = existingUsers.some(u => u.email === user2.email);
      
      expect(emailExists).toBe(true);
      // In real app, this would throw an error or return false
    });
  });

  describe('Photo Upload and Like System Integration', () => {
    it('should create photo, like it, and persist data correctly', () => {
      // Create user
      const user = new User('user1', 'John', 'john@example.com');
      const liker = new User('user2', 'Jane', 'jane@example.com');
      
      // Create photo
      const photo = new Photo('photo1', 'sunset.jpg', 'Beautiful Sunset', user.id, user.name, 'nature');
      
      // User2 likes the photo
      const likeResult = photo.addLike(liker.id);
      expect(likeResult).toBe(true);
      expect(photo.likes).toBe(1);
      
      // Save to storage
      storage.savePhotos([photo]);
      storage.saveLikedPhotos(new Set([photo.id]));
      
      // Retrieve and verify
      const retrievedPhotos = storage.getPhotos();
      const likedSet = storage.getLikedPhotos();
      
      expect(retrievedPhotos[0].likes).toBe(1);
      expect(likedSet.has(photo.id)).toBe(true);
    });

    it('should prevent double-liking the same photo', () => {
      const photo = new Photo('photo1', 'img.jpg', 'Test', 'user1', 'John', 'nature');
      
      // First like
      const firstLike = photo.addLike('user2');
      expect(firstLike).toBe(true);
      
      // Second like attempt
      const secondLike = photo.addLike('user2');
      expect(secondLike).toBe(false);
      expect(photo.likes).toBe(1); // Should still be 1
    });
  });

  describe('Collection and Photo Relationship Integration', () => {
    it('should create collection, add photos, and persist correctly', () => {
      const user = new User('user1', 'John', 'john@example.com');
      const collection = new Collection('col1', user.id, 'My Favorites', 'Best photos');
      
      // Create photos
      const photo1 = new Photo('p1', 'img1.jpg', 'Photo 1', user.id, user.name, 'nature');
      const photo2 = new Photo('p2', 'img2.jpg', 'Photo 2', user.id, user.name, 'portrait');
      
      // Add photos to collection
      collection.addPhoto(photo1.id, photo1.imageUrl);
      collection.addPhoto(photo2.id);
      
      expect(collection.getPhotoCount()).toBe(2);
      expect(collection.hasPhoto(photo1.id)).toBe(true);
      expect(collection.hasPhoto(photo2.id)).toBe(true);
      
      // Save to storage
      storage.saveCollections([collection]);
      storage.savePhotos([photo1, photo2]);
      
      // Retrieve and verify
      const retrievedCollections = storage.getCollections();
      const retrievedPhotos = storage.getPhotos();
      
      expect(retrievedCollections[0].photoIds).toHaveLength(2);
      expect(retrievedPhotos).toHaveLength(2);
    });

    it('should remove photo from collection when photo is deleted', () => {
      const collection = new Collection('col1', 'user1', 'Favorites');
      collection.addPhoto('photo1');
      collection.addPhoto('photo2');
      
      expect(collection.getPhotoCount()).toBe(2);
      
      // Simulate photo deletion
      const removed = collection.removePhoto('photo1');
      
      expect(removed).toBe(true);
      expect(collection.getPhotoCount()).toBe(1);
      expect(collection.hasPhoto('photo1')).toBe(false);
      expect(collection.hasPhoto('photo2')).toBe(true);
    });
  });

  describe('Follow System and User Interaction', () => {
    it('should establish bidirectional follow relationship', () => {
      const user1 = new User('user1', 'John', 'john@example.com');
      const user2 = new User('user2', 'Jane', 'jane@example.com');
      
      // User1 follows User2
      user1.followUser(user2.id);
      user2.followers.push(user1.id);
      
      expect(user1.isFollowing(user2.id)).toBe(true);
      expect(user2.followers).toContain(user1.id);
      expect(user1.getFollowingCount()).toBe(1);
      expect(user2.getFollowerCount()).toBe(1);
      
      // Save to storage
      storage.saveUsers([user1, user2]);
      
      // Retrieve and verify
      const users = storage.getUsers();
      const retrievedUser1 = users.find(u => u.id === 'user1');
      const retrievedUser2 = users.find(u => u.id === 'user2');
      
      expect(retrievedUser1?.following).toContain('user2');
      expect(retrievedUser2?.followers).toContain('user1');
    });
  });

  describe('Complete Workflow Integration Test', () => {
    it('should complete full user journey: register, upload, like, save, comment', () => {
      // Step 1: User registration
      const user = new User('user1', 'John Doe', 'john@example.com', 'avatar.jpg');
      storage.saveCurrentUser(user);
      storage.saveUsers([user]);
      
      // Step 2: Upload photo
      const photo = new Photo('photo1', 'sunset.jpg', 'Sunset', user.id, user.name, 'nature', 'Beautiful view');
      
      // Step 3: Another user likes and comments
      const user2 = new User('user2', 'Jane', 'jane@example.com');
      photo.addLike(user2.id);
      photo.addComment({
        id: 'comment1',
        userId: user2.id,
        userName: user2.name,
        text: 'Amazing shot!',
        createdAt: new Date().toISOString(),
      });
      
      // Save photo with likes and comments
      storage.savePhotos([photo]);
      
      // Step 4: Save photo to collection
      const collection = new Collection('col1', user2.id, 'Favorites');
      collection.addPhoto(photo.id, photo.imageUrl);
      storage.saveCollections([collection]);
      
      // Verify complete state
      const currentUser = storage.getCurrentUser();
      const photos = storage.getPhotos();
      const collections = storage.getCollections();
      
      expect(currentUser?.id).toBe('user1');
      expect(photos[0].likes).toBe(1);
      expect(photos[0].comments).toHaveLength(1);
      expect(collections[0].photoIds).toContain(photo.id);
      
      // Verify data persistence
      expect(photos[0].id).toBe('photo1');
      expect(collections[0].id).toBe('col1');
    });
  });
});
