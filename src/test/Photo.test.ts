/**
 * @fileoverview Unit tests for Photo model
 * @author Dominic
 */

import { describe, it, expect } from 'vitest';
import { Photo } from '../models/Photo';
import { Comment } from '../types';

describe('Photo Model - Dominic', () => {
  describe('Constructor', () => {
    it('should create a photo with required fields (happy path)', () => {
      const photo = new Photo('p1', 'image.jpg', 'Sunset', 'user1', 'John', 'nature');
      
      expect(photo.id).toBe('p1');
      expect(photo.imageUrl).toBe('image.jpg');
      expect(photo.title).toBe('Sunset');
      expect(photo.userId).toBe('user1');
      expect(photo.userName).toBe('John');
      expect(photo.category).toBe('nature');
      expect(photo.likes).toBe(0);
      expect(photo.comments).toEqual([]);
    });

    it('should create a photo with optional description (happy path)', () => {
      const photo = new Photo('p1', 'img.jpg', 'Beach', 'u1', 'Jane', 'travel', 'Beautiful beach');
      
      expect(photo.description).toBe('Beautiful beach');
    });
  });

  describe('addLike', () => {
    it('should add a like successfully (happy path)', () => {
      const photo = new Photo('p1', 'img.jpg', 'Photo', 'u1', 'John', 'nature');
      const result = photo.addLike('user2');
      
      expect(result).toBe(true);
      expect(photo.likes).toBe(1);
      expect(photo.isLikedBy('user2')).toBe(true);
    });

    it('should return false when user already liked (exception)', () => {
      const photo = new Photo('p1', 'img.jpg', 'Photo', 'u1', 'John', 'nature');
      photo.addLike('user2');
      const result = photo.addLike('user2');
      
      expect(result).toBe(false);
      expect(photo.likes).toBe(1);
    });

    it('should throw error when userId is empty (exception)', () => {
      const photo = new Photo('p1', 'img.jpg', 'Photo', 'u1', 'John', 'nature');
      
      expect(() => photo.addLike('')).toThrow('User ID cannot be empty');
    });
  });

  describe('removeLike', () => {
    it('should remove a like successfully (happy path)', () => {
      const photo = new Photo('p1', 'img.jpg', 'Photo', 'u1', 'John', 'nature');
      photo.addLike('user2');
      const result = photo.removeLike('user2');
      
      expect(result).toBe(true);
      expect(photo.likes).toBe(0);
      expect(photo.isLikedBy('user2')).toBe(false);
    });

    it('should return false when user has not liked (exception)', () => {
      const photo = new Photo('p1', 'img.jpg', 'Photo', 'u1', 'John', 'nature');
      const result = photo.removeLike('user2');
      
      expect(result).toBe(false);
    });

    it('should not go below zero likes (edge case)', () => {
      const photo = new Photo('p1', 'img.jpg', 'Photo', 'u1', 'John', 'nature');
      photo.addLike('user2');
      photo.removeLike('user2');
      photo.removeLike('user2'); // Try to remove again
      
      expect(photo.likes).toBe(0);
    });
  });

  describe('addComment', () => {
    it('should add a comment successfully (happy path)', () => {
      const photo = new Photo('p1', 'img.jpg', 'Photo', 'u1', 'John', 'nature');
      const comment: Comment = {
        id: 'c1',
        userId: 'user2',
        userName: 'Jane',
        text: 'Great photo!',
        createdAt: new Date().toISOString(),
      };
      
      const result = photo.addComment(comment);
      
      expect(result).toEqual(comment);
      expect(photo.getCommentCount()).toBe(1);
      expect(photo.getComments()).toContainEqual(comment);
    });

    it('should throw error for invalid comment (exception)', () => {
      const photo = new Photo('p1', 'img.jpg', 'Photo', 'u1', 'John', 'nature');
      const invalidComment: any = { id: 'c1', text: '' };
      
      expect(() => photo.addComment(invalidComment)).toThrow('Invalid comment data');
    });
  });

  describe('toObject & fromObject', () => {
    it('should convert photo to and from object (happy path)', () => {
      const photo = new Photo('p1', 'img.jpg', 'Sunset', 'u1', 'John', 'nature', 'Beautiful');
      photo.addLike('user2');
      
      const obj = photo.toObject();
      const restored = Photo.fromObject(obj);
      
      expect(restored.id).toBe(photo.id);
      expect(restored.likes).toBe(photo.likes);
      expect(restored.likedBy).toEqual(photo.likedBy);
    });
  });
});
