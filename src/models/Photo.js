/**
 * Photo model representing an uploaded image
 * @class Photo
 */
class Photo {
  /**
   * Create a new Photo instance
   * @param {string} photoId - Unique photo identifier
   * @param {string} userId - Uploader user ID
   * @param {string} title - Photo title
   * @param {string} imageUrl - Photo URL/base64
   * @param {string} category - Category name
   */
  constructor(photoId, userId, title, imageUrl, category = 'nature') {
    this.photoId = photoId;
    this.userId = userId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.category = category;
    this.description = '';
    this.tags = [];
    this.views = 0;
    this.likes = 0;
    this.saves = 0;
    this.comments = [];
    this.uploadedAt = new Date();
  }

  /**
   * Add a comment
   * @param {string} author - Comment author name
   * @param {string} text - Comment text
   * @returns {number} New comment count
   */
  addComment(author, text) {
    if (!text || !text.trim()) return this.comments.length;
    this.comments.push({ author, text: text.trim(), createdAt: new Date() });
    return this.comments.length;
  }

  /**
   * Like photo
   * @returns {number} New like count
   */
  like() {
    this.likes += 1;
    return this.likes;
  }

  /**
   * Save photo
   * @returns {number} New save count
   */
  save() {
    this.saves += 1;
    return this.saves;
  }
}

module.exports = Photo;
