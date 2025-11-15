/**
 * Collection model for grouping photos
 * @class Collection
 */
class Collection {
  /**
   * Create a collection
   * @param {string} collectionId - Unique collection ID
   * @param {string} userId - Owner user ID
   * @param {string} name - Collection name
   */
  constructor(collectionId, userId, name) {
    this.collectionId = collectionId;
    this.userId = userId;
    this.name = name;
    this.photos = [];
    this.createdAt = new Date();
  }

  /**
   * Add photo to collection
   * @param {string} photoId - Photo ID
   * @returns {number} New photo count
   */
  addPhoto(photoId) {
    if (this.photos.includes(photoId)) return this.photos.length;
    this.photos.push(photoId);
    return this.photos.length;
  }

  /**
   * Remove photo from collection
   * @param {string} photoId - Photo ID
   * @returns {number} New photo count
   */
  removePhoto(photoId) {
    this.photos = this.photos.filter(id => id !== photoId);
    return this.photos.length;
  }
}

module.exports = Collection;
