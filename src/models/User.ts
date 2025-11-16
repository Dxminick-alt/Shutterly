/**
 * @fileoverview User model class representing a Shutterly user
 * @module models/User
 * @author Youssef, Dominic, Mustafa
 */

import { User as IUser } from '../types';

/**
 * Represents a user in the Shutterly platform
 * @class User
 * @implements {IUser}
 */
export class User implements IUser {
  /**
   * Unique identifier for the user
   * @type {string}
   */
  id: string;

  /**
   * User's display name
   * @type {string}
   */
  name: string;

  /**
   * User's email address
   * @type {string}
   */
  email: string;

  /**
   * URL to user's avatar image
   * @type {string | undefined}
   */
  avatar?: string;

  /**
   * User's bio/description
   * @type {string | undefined}
   */
  bio?: string;

  /**
   * Array of user IDs who follow this user
   * @type {string[]}
   */
  followers: string[];

  /**
   * Array of user IDs this user follows
   * @type {string[]}
   */
  following: string[];

  /**
   * Creates a new User instance
   * @constructor
   * @param {string} id - Unique user identifier
   * @param {string} name - User's display name
   * @param {string} email - User's email address
   * @param {string} [avatar] - URL to avatar image
   * @param {string} [bio] - User biography
   */
  constructor(
    id: string,
    name: string,
    email: string,
    avatar?: string,
    bio?: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.avatar = avatar;
    this.bio = bio;
    this.followers = [];
    this.following = [];
  }

  /**
   * Follow another user
   * @param {string} userId - ID of the user to follow
   * @returns {boolean} True if successfully followed, false if already following
   * @throws {Error} If userId is invalid or same as current user
   */
  followUser(userId: string): boolean {
    if (!userId) {
      throw new Error('User ID cannot be empty');
    }
    if (userId === this.id) {
      throw new Error('Cannot follow yourself');
    }
    if (this.following.includes(userId)) {
      return false;
    }
    this.following.push(userId);
    return true;
  }

  /**
   * Unfollow a user
   * @param {string} userId - ID of the user to unfollow
   * @returns {boolean} True if successfully unfollowed, false if not following
   */
  unfollowUser(userId: string): boolean {
    const index = this.following.indexOf(userId);
    if (index === -1) {
      return false;
    }
    this.following.splice(index, 1);
    return true;
  }

  /**
   * Check if this user is following another user
   * @param {string} userId - ID of the user to check
   * @returns {boolean} True if following, false otherwise
   */
  isFollowing(userId: string): boolean {
    return this.following.includes(userId);
  }

  /**
   * Get the number of followers
   * @returns {number} Count of followers
   */
  getFollowerCount(): number {
    return this.followers.length;
  }

  /**
   * Get the number of users this user is following
   * @returns {number} Count of following
   */
  getFollowingCount(): number {
    return this.following.length;
  }

  /**
   * Convert User instance to plain object
   * @returns {IUser} Plain object representation
   */
  toObject(): IUser {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      avatar: this.avatar,
      bio: this.bio,
      followers: [...this.followers],
      following: [...this.following],
    };
  }

  /**
   * Create a User instance from a plain object
   * @static
   * @param {IUser} data - Plain object data
   * @returns {User} New User instance
   */
  static fromObject(data: IUser): User {
    const user = new User(data.id, data.name, data.email, data.avatar, data.bio);
    user.followers = [...data.followers];
    user.following = [...data.following];
    return user;
  }
}
