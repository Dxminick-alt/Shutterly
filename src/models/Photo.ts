/**
 * @fileoverview Photo model class for managing photo data and interactions
 * @module models/Photo
 * @author Youssef, Dominic, Mustafa
 */

import type { Photo as IPhoto, Comment } from '../types';

/**
 * Represents a photo post in the Shutterly platform
 * @class Photo
 * @implements {IPhoto}
 */
export class Photo implements IPhoto {
  id: string;
  imageUrl: string;
  title: string;
  description?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  likes: number;
  likedBy: string[];
  comments: Comment[];
  createdAt: string;
  category: string;

  /**
   * Creates a new Photo instance
   * @constructor
   * @param {string} id - Unique photo identifier
   * @param {string} imageUrl - URL to the photo image
   * @param {string} title - Photo title
   * @param {string} userId - ID of the user who uploaded the photo
   * @param {string} userName - Name of the uploader
   * @param {string} category - Photo category
   * @param {string} [description] - Photo description
   * @param {string} [userAvatar] - Uploader's avatar URL
   */
  constructor(
    id: string,
    imageUrl: string,
    title: string,
    userId: string,
    userName: string,
    category: string,
    description?: string,
    userAvatar?: string
  ) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.userName = userName;
    this.userAvatar = userAvatar;
    this.likes = 0;
    this.likedBy = [];
    this.comments = [];
    this.createdAt = new Date().toISOString();
    this.category = category;
  }

  /**
   * Add a like to the photo
   * @param {string} userId - ID of the user liking the photo
   * @returns {boolean} True if like added, false if already liked
   * @throws {Error} If userId is empty
   */
  addLike(userId: string): boolean {
    if (!userId) {
      throw new Error('User ID cannot be empty');
    }
    if (this.likedBy.includes(userId)) {
      return false;
    }
    this.likedBy.push(userId);
    this.likes++;
    return true;
  }

  /**
   * Remove a like from the photo
   * @param {string} userId - ID of the user unliking the photo
   * @returns {boolean} True if like removed, false if not liked
   */
  removeLike(userId: string): boolean {
    const index = this.likedBy.indexOf(userId);
    if (index === -1) {
      return false;
    }
    this.likedBy.splice(index, 1);
    this.likes = Math.max(0, this.likes - 1);
    return true;
  }

  /**
   * Check if a user has liked this photo
   * @param {string} userId - User ID to check
   * @returns {boolean} True if liked, false otherwise
   */
  isLikedBy(userId: string): boolean {
    return this.likedBy.includes(userId);
  }

  /**
   * Add a comment to the photo
   * @param {Comment} comment - Comment object to add
   * @returns {Comment} The added comment
   * @throws {Error} If comment is invalid
   */
  addComment(comment: Comment): Comment {
    if (!comment || !comment.text || !comment.userId) {
      throw new Error('Invalid comment data');
    }
    this.comments.push(comment);
    return comment;
  }

  /**
   * Get all comments for this photo
   * @returns {Comment[]} Array of comments
   */
  getComments(): Comment[] {
    return [...this.comments];
  }

  /**
   * Get comment count
   * @returns {number} Number of comments
   */
  getCommentCount(): number {
    return this.comments.length;
  }

  /**
   * Convert Photo instance to plain object
   * @returns {IPhoto} Plain object representation
   */
  toObject(): IPhoto {
    return {
      id: this.id,
      imageUrl: this.imageUrl,
      title: this.title,
      description: this.description,
      userId: this.userId,
      userName: this.userName,
      userAvatar: this.userAvatar,
      likes: this.likes,
      likedBy: [...this.likedBy],
      comments: [...this.comments],
      createdAt: this.createdAt,
      category: this.category,
    };
  }

  /**
   * Create a Photo instance from a plain object
   * @static
   * @param {IPhoto} data - Plain object data
   * @returns {Photo} New Photo instance
   */
  static fromObject(data: IPhoto): Photo {
    const photo = new Photo(
      data.id,
      data.imageUrl,
      data.title,
      data.userId,
      data.userName,
      data.category,
      data.description,
      data.userAvatar
    );
    photo.likes = data.likes;
    photo.likedBy = [...data.likedBy];
    photo.comments = [...data.comments];
    photo.createdAt = data.createdAt;
    return photo;
  }
}
