/**
 * User model representing a registered user in Shutterly
 * @class User
 */
class User {
  /**
   * Create a new User instance
   * @param {string} userId - Unique user identifier
   * @param {string} name - Full name
   * @param {string} email - Email address
   * @param {string} avatar - Avatar URL/base64
   */
  constructor(userId, name, email, avatar = 'assets/default-avatar.svg') {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.avatar = avatar;
    this.likes = 0;
    this.saves = 0;
    this.comments = 0;
    this.createdAt = new Date();
  }

  /**
   * Update profile attributes
   * @param {{name?: string, avatar?: string}} updates - Profile updates
   * @returns {User}
   */
  updateProfile(updates = {}) {
    if (typeof updates.name === 'string' && updates.name.trim()) {
      this.name = updates.name.trim();
    }
    if (typeof updates.avatar === 'string' && updates.avatar.trim()) {
      this.avatar = updates.avatar.trim();
    }
    return this;
  }

  /**
   * Add engagement stats (like/save/comment)
   * @param {('like'|'save'|'comment')} type - Engagement type
   * @returns {number} New counter value
   */
  addEngagement(type) {
    if (type === 'like') this.likes += 1;
    else if (type === 'save') this.saves += 1;
    else if (type === 'comment') this.comments += 1;
    return { like: this.likes, save: this.saves, comment: this.comments }[type];
  }
}

module.exports = User;
