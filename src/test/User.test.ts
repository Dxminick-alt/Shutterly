/**
 * @fileoverview Unit tests for User model
 * @author Youssef
 */

import { describe, it, expect } from 'vitest';
import { User } from '../models/User';

describe('User Model - Youssef', () => {
  describe('Constructor', () => {
    it('should create a user with valid data (happy path)', () => {
      const user = new User('user1', 'John Doe', 'john@example.com');
      
      expect(user.id).toBe('user1');
      expect(user.name).toBe('John Doe');
      expect(user.email).toBe('john@example.com');
      expect(user.followers).toEqual([]);
      expect(user.following).toEqual([]);
    });

    it('should create a user with avatar and bio', () => {
      const user = new User('user2', 'Jane', 'jane@example.com', 'avatar.jpg', 'Photographer');
      
      expect(user.avatar).toBe('avatar.jpg');
      expect(user.bio).toBe('Photographer');
    });
  });

  describe('followUser', () => {
    it('should follow a user successfully (happy path)', () => {
      const user = new User('user1', 'John', 'john@example.com');
      const result = user.followUser('user2');
      
      expect(result).toBe(true);
      expect(user.following).toContain('user2');
      expect(user.isFollowing('user2')).toBe(true);
    });

    it('should return false when already following (exception)', () => {
      const user = new User('user1', 'John', 'john@example.com');
      user.followUser('user2');
      const result = user.followUser('user2');
      
      expect(result).toBe(false);
      expect(user.following.length).toBe(1);
    });

    it('should throw error when trying to follow yourself (exception)', () => {
      const user = new User('user1', 'John', 'john@example.com');
      
      expect(() => user.followUser('user1')).toThrow('Cannot follow yourself');
    });

    it('should throw error when userId is empty (exception)', () => {
      const user = new User('user1', 'John', 'john@example.com');
      
      expect(() => user.followUser('')).toThrow('User ID cannot be empty');
    });
  });

  describe('unfollowUser', () => {
    it('should unfollow a user successfully (happy path)', () => {
      const user = new User('user1', 'John', 'john@example.com');
      user.followUser('user2');
      const result = user.unfollowUser('user2');
      
      expect(result).toBe(true);
      expect(user.following).not.toContain('user2');
    });

    it('should return false when not following (exception)', () => {
      const user = new User('user1', 'John', 'john@example.com');
      const result = user.unfollowUser('user2');
      
      expect(result).toBe(false);
    });
  });

  describe('getFollowerCount & getFollowingCount', () => {
    it('should return correct follower and following counts (happy path)', () => {
      const user = new User('user1', 'John', 'john@example.com');
      user.followers = ['user2', 'user3'];
      user.following = ['user4'];
      
      expect(user.getFollowerCount()).toBe(2);
      expect(user.getFollowingCount()).toBe(1);
    });
  });

  describe('toObject & fromObject', () => {
    it('should convert to and from object (happy path)', () => {
      const user = new User('user1', 'John', 'john@example.com', 'avatar.jpg', 'Bio');
      user.followUser('user2');
      
      const obj = user.toObject();
      const restored = User.fromObject(obj);
      
      expect(restored.id).toBe(user.id);
      expect(restored.name).toBe(user.name);
      expect(restored.email).toBe(user.email);
      expect(restored.following).toEqual(user.following);
    });
  });
});
