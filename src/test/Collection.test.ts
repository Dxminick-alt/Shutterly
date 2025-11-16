/**
 * @fileoverview Unit tests for Collection model
 * @author Mustafa
 */

import { describe, it, expect } from 'vitest';
import { Collection } from '../models/Collection';

describe('Collection Model - Mustafa', () => {
  describe('Constructor', () => {
    it('should create a collection with required fields (happy path)', () => {
      const collection = new Collection('c1', 'user1', 'My Favorites');
      
      expect(collection.id).toBe('c1');
      expect(collection.userId).toBe('user1');
      expect(collection.title).toBe('My Favorites');
      expect(collection.photoIds).toEqual([]);
      expect(collection.isEmpty()).toBe(true);
    });

    it('should create collection with description (happy path)', () => {
      const collection = new Collection('c1', 'user1', 'Travel', 'My travel photos');
      
      expect(collection.description).toBe('My travel photos');
    });
  });

  describe('addPhoto', () => {
    it('should add a photo successfully (happy path)', () => {
      const collection = new Collection('c1', 'user1', 'Favorites');
      const result = collection.addPhoto('photo1', 'cover.jpg');
      
      expect(result).toBe(true);
      expect(collection.hasPhoto('photo1')).toBe(true);
      expect(collection.getPhotoCount()).toBe(1);
      expect(collection.coverImage).toBe('cover.jpg');
    });

    it('should set cover image for first photo (happy path)', () => {
      const collection = new Collection('c1', 'user1', 'Favorites');
      collection.addPhoto('photo1', 'first.jpg');
      
      expect(collection.coverImage).toBe('first.jpg');
    });

    it('should return false when photo already exists (exception)', () => {
      const collection = new Collection('c1', 'user1', 'Favorites');
      collection.addPhoto('photo1');
      const result = collection.addPhoto('photo1');
      
      expect(result).toBe(false);
      expect(collection.getPhotoCount()).toBe(1);
    });

    it('should throw error when photoId is empty (exception)', () => {
      const collection = new Collection('c1', 'user1', 'Favorites');
      
      expect(() => collection.addPhoto('')).toThrow('Photo ID cannot be empty');
    });
  });

  describe('removePhoto', () => {
    it('should remove a photo successfully (happy path)', () => {
      const collection = new Collection('c1', 'user1', 'Favorites');
      collection.addPhoto('photo1');
      const result = collection.removePhoto('photo1');
      
      expect(result).toBe(true);
      expect(collection.hasPhoto('photo1')).toBe(false);
      expect(collection.isEmpty()).toBe(true);
    });

    it('should return false when photo not found (exception)', () => {
      const collection = new Collection('c1', 'user1', 'Favorites');
      const result = collection.removePhoto('nonexistent');
      
      expect(result).toBe(false);
    });

    it('should clear cover image when all photos removed (edge case)', () => {
      const collection = new Collection('c1', 'user1', 'Favorites');
      collection.addPhoto('photo1', 'cover.jpg');
      collection.removePhoto('photo1');
      
      expect(collection.coverImage).toBeUndefined();
    });
  });

  describe('hasPhoto', () => {
    it('should return true for existing photo (happy path)', () => {
      const collection = new Collection('c1', 'user1', 'Favorites');
      collection.addPhoto('photo1');
      
      expect(collection.hasPhoto('photo1')).toBe(true);
    });

    it('should return false for non-existing photo (happy path)', () => {
      const collection = new Collection('c1', 'user1', 'Favorites');
      
      expect(collection.hasPhoto('photo1')).toBe(false);
    });
  });

  describe('getPhotoCount', () => {
    it('should return correct count (happy path)', () => {
      const collection = new Collection('c1', 'user1', 'Favorites');
      collection.addPhoto('photo1');
      collection.addPhoto('photo2');
      
      expect(collection.getPhotoCount()).toBe(2);
    });

    it('should return 0 for empty collection (edge case)', () => {
      const collection = new Collection('c1', 'user1', 'Favorites');
      
      expect(collection.getPhotoCount()).toBe(0);
    });
  });

  describe('toObject & fromObject', () => {
    it('should convert collection to and from object (happy path)', () => {
      const collection = new Collection('c1', 'user1', 'Travel', 'My trips');
      collection.addPhoto('photo1', 'cover.jpg');
      
      const obj = collection.toObject();
      const restored = Collection.fromObject(obj);
      
      expect(restored.id).toBe(collection.id);
      expect(restored.title).toBe(collection.title);
      expect(restored.photoIds).toEqual(collection.photoIds);
      expect(restored.coverImage).toBe(collection.coverImage);
    });
  });
});
