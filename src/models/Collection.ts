/**
 * @fileoverview Collection model for organizing saved photos
 * @module models/Collection
 * @author Youssef, Dominic, Mustafa
 */

import type { Collection as ICollection } from '../types';

/**
 * Represents a collection of photos
 * @class Collection
 * @implements {ICollection}
 */
export class Collection implements ICollection {
  id: string;
  userId: string;
  title: string;
  description?: string;
  photoIds: string[];
  createdAt: string;
  coverImage?: string;

  /**
   * Creates a new Collection instance
   * @constructor
   * @param {string} id - Unique collection identifier
   * @param {string} userId - ID of the user who owns the collection
   * @param {string} title - Collection title
   * @param {string} [description] - Collection description
   */
  constructor(id: string, userId: string, title: string, description?: string) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.photoIds = [];
    this.createdAt = new Date().toISOString();
  }

  /**
   * Add a photo to the collection
   * @param {string} photoId - ID of the photo to add
   * @param {string} [coverImage] - URL to use as collection cover
   * @returns {boolean} True if photo added, false if already exists
   * @throws {Error} If photoId is empty
   */
  addPhoto(photoId: string, coverImage?: string): boolean {
    if (!photoId) {
      throw new Error('Photo ID cannot be empty');
    }
    if (this.photoIds.includes(photoId)) {
      return false;
    }
    this.photoIds.push(photoId);
    
    // Set cover image if this is the first photo or cover is explicitly provided
    if (this.photoIds.length === 1 || coverImage) {
      this.coverImage = coverImage;
    }
    return true;
  }

  /**
   * Remove a photo from the collection
   * @param {string} photoId - ID of the photo to remove
   * @returns {boolean} True if photo removed, false if not found
   */
  removePhoto(photoId: string): boolean {
    const index = this.photoIds.indexOf(photoId);
    if (index === -1) {
      return false;
    }
    this.photoIds.splice(index, 1);
    
    // Clear cover image if it was the removed photo
    if (this.photoIds.length === 0) {
      this.coverImage = undefined;
    }
    return true;
  }

  /**
   * Check if a photo is in the collection
   * @param {string} photoId - Photo ID to check
   * @returns {boolean} True if photo is in collection
   */
  hasPhoto(photoId: string): boolean {
    return this.photoIds.includes(photoId);
  }

  /**
   * Get the number of photos in the collection
   * @returns {number} Photo count
   */
  getPhotoCount(): number {
    return this.photoIds.length;
  }

  /**
   * Check if collection is empty
   * @returns {boolean} True if no photos in collection
   */
  isEmpty(): boolean {
    return this.photoIds.length === 0;
  }

  /**
   * Convert Collection instance to plain object
   * @returns {ICollection} Plain object representation
   */
  toObject(): ICollection {
    return {
      id: this.id,
      userId: this.userId,
      title: this.title,
      description: this.description,
      photoIds: [...this.photoIds],
      createdAt: this.createdAt,
      coverImage: this.coverImage,
    };
  }

  /**
   * Create a Collection instance from a plain object
   * @static
   * @param {ICollection} data - Plain object data
   * @returns {Collection} New Collection instance
   */
  static fromObject(data: ICollection): Collection {
    const collection = new Collection(data.id, data.userId, data.title, data.description);
    collection.photoIds = [...data.photoIds];
    collection.createdAt = data.createdAt;
    collection.coverImage = data.coverImage;
    return collection;
  }
}
