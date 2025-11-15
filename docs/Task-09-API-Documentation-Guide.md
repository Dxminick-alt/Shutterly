# Task #9: Classes and API Documentation

## Overview

This task focuses on:
1. Creating well-documented classes with JSDoc comments
2. Generating API documentation automatically
3. Uploading code to `src/` folder
4. Uploading documentation to `docs/` folder

---

## Documentation Comments (JSDoc)

### What is JSDoc?

JSDoc is a markup language used to annotate JavaScript source code with documentation comments. It helps:
- Document function parameters and return types
- Explain class structure
- Auto-generate API documentation
- Improve IDE autocomplete

### JSDoc Syntax

```javascript
/**
 * Brief description of the function
 * 
 * @param {Type} paramName - Parameter description
 * @returns {Type} Return value description
 * @throws {ErrorType} When this error occurs
 * @example
 * functionName(exampleParam);
 */
```

---

## Documented Classes for Shutterly

### 1. User Class (src/models/User.js)

```javascript
/**
 * User model representing a registered user in Shutterly
 * @class User
 */
class User {
    /**
     * Create a new User instance
     * @constructor
     * @param {string} userId - Unique user identifier (UUID)
     * @param {string} name - User's full name
     * @param {string} email - User's email address
     * @param {string} passwordHash - Hashed password (bcrypt)
     */
    constructor(userId, name, email, passwordHash) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.passwordHash = passwordHash;
        this.avatar = null;
        this.bio = '';
        this.createdAt = new Date();
        this.lastLogin = null;
    }

    /**
     * Register a new user in the system
     * @static
     * @param {string} name - User's full name
     * @param {string} email - User's email address
     * @param {string} password - Plain text password
     * @returns {Promise<User>} Newly created user object
     * @throws {Error} If email already exists
     * @example
     * const user = await User.register('John Doe', 'john@example.com', 'password123');
     */
    static async register(name, email, password) {
        // Implementation here
        // 1. Check if email exists
        // 2. Hash password with bcrypt
        // 3. Create user in database
        // 4. Return user object
    }

    /**
     * Authenticate user with email and password
     * @static
     * @param {string} email - User's email
     * @param {string} password - User's password
     * @returns {Promise<Object>} Authentication result with token and user data
     * @throws {Error} If credentials are invalid
     * @example
     * const auth = await User.login('john@example.com', 'password123');
     * console.log(auth.token);
     */
    static async login(email, password) {
        // Implementation here
        // 1. Find user by email
        // 2. Verify password with bcrypt
        // 3. Generate JWT token
        // 4. Update lastLogin
        // 5. Return token and user data
    }

    /**
     * Update user profile information
     * @param {Object} updates - Fields to update
     * @param {string} [updates.name] - New name
     * @param {string} [updates.bio] - New bio
     * @param {string} [updates.avatar] - New avatar URL
     * @returns {Promise<User>} Updated user object
     * @example
     * await user.updateProfile({ name: 'Jane Doe', bio: 'Photographer' });
     */
    async updateProfile(updates) {
        // Implementation here
    }

    /**
     * Get all photos uploaded by this user
     * @returns {Promise<Array<Photo>>} Array of photo objects
     * @example
     * const photos = await user.getPhotos();
     */
    async getPhotos() {
        // Implementation here
    }

    /**
     * Delete user account and all associated data
     * @returns {Promise<boolean>} True if deletion successful
     * @example
     * await user.deleteAccount();
     */
    async deleteAccount() {
        // Implementation here
    }
}

module.exports = User;
```

---

### 2. Photo Class (src/models/Photo.js)

```javascript
/**
 * Photo model representing an uploaded image
 * @class Photo
 */
class Photo {
    /**
     * Create a new Photo instance
     * @constructor
     * @param {string} photoId - Unique photo identifier (UUID)
     * @param {string} userId - ID of user who uploaded the photo
     * @param {string} title - Photo title
     * @param {string} imageUrl - URL to the full-size image
     */
    constructor(photoId, userId, title, imageUrl) {
        this.photoId = photoId;
        this.userId = userId;
        this.title = title;
        this.description = '';
        this.imageUrl = imageUrl;
        this.thumbnailUrl = null;
        this.category = null;
        this.tags = [];
        this.views = 0;
        this.likes = 0;
        this.uploadedAt = new Date();
    }

    /**
     * Upload a new photo
     * @static
     * @param {string} userId - ID of uploading user
     * @param {File} file - Image file object
     * @param {Object} metadata - Photo metadata
     * @param {string} metadata.title - Photo title
     * @param {string} [metadata.description] - Photo description
     * @param {string} metadata.category - Photo category
     * @param {Array<string>} [metadata.tags] - Photo tags
     * @returns {Promise<Photo>} Newly created photo object
     * @throws {Error} If file is invalid or upload fails
     * @example
     * const photo = await Photo.upload(userId, imageFile, {
     *   title: 'Sunset',
     *   category: 'nature',
     *   tags: ['sunset', 'landscape']
     * });
     */
    static async upload(userId, file, metadata) {
        // Implementation here
        // 1. Validate file (type, size)
        // 2. Upload to cloud storage
        // 3. Generate thumbnail
        // 4. Save metadata to database
        // 5. Return photo object
    }

    /**
     * Search photos by query
     * @static
     * @param {string} query - Search query
     * @param {Object} [options] - Search options
     * @param {string} [options.category] - Filter by category
     * @param {number} [options.limit=20] - Maximum results
     * @param {number} [options.offset=0] - Pagination offset
     * @returns {Promise<Array<Photo>>} Array of matching photos
     * @example
     * const photos = await Photo.search('mountain', { category: 'nature', limit: 10 });
     */
    static async search(query, options = {}) {
        // Implementation here
    }

    /**
     * Increment view count
     * @returns {Promise<void>}
     * @example
     * await photo.incrementViews();
     */
    async incrementViews() {
        this.views += 1;
        // Update database
    }

    /**
     * Add a like to this photo
     * @param {string} userId - ID of user liking the photo
     * @returns {Promise<void>}
     * @throws {Error} If user already liked the photo
     * @example
     * await photo.addLike(currentUserId);
     */
    async addLike(userId) {
        // Implementation here
    }

    /**
     * Remove a like from this photo
     * @param {string} userId - ID of user unliking the photo
     * @returns {Promise<void>}
     * @example
     * await photo.removeLike(currentUserId);
     */
    async removeLike(userId) {
        // Implementation here
    }

    /**
     * Delete this photo
     * @returns {Promise<boolean>} True if deletion successful
     * @example
     * await photo.delete();
     */
    async delete() {
        // Implementation here
        // 1. Delete file from storage
        // 2. Delete from database
        // 3. Remove from collections
    }
}

module.exports = Photo;
```

---

### 3. Collection Class (src/models/Collection.js)

```javascript
/**
 * Collection model representing a user's photo album
 * @class Collection
 */
class Collection {
    /**
     * Create a new Collection instance
     * @constructor
     * @param {string} collectionId - Unique collection identifier
     * @param {string} userId - ID of collection owner
     * @param {string} name - Collection name
     */
    constructor(collectionId, userId, name) {
        this.collectionId = collectionId;
        this.userId = userId;
        this.name = name;
        this.description = '';
        this.isPublic = true;
        this.createdAt = new Date();
        this.photoCount = 0;
    }

    /**
     * Create a new collection
     * @static
     * @param {string} userId - Owner's user ID
     * @param {string} name - Collection name
     * @param {Object} [options] - Optional parameters
     * @param {string} [options.description] - Collection description
     * @param {boolean} [options.isPublic=true] - Whether collection is public
     * @returns {Promise<Collection>} Newly created collection
     * @example
     * const collection = await Collection.create(userId, 'My Favorites', {
     *   description: 'My favorite photos',
     *   isPublic: true
     * });
     */
    static async create(userId, name, options = {}) {
        // Implementation here
    }

    /**
     * Add a photo to this collection
     * @param {string} photoId - ID of photo to add
     * @returns {Promise<void>}
     * @throws {Error} If photo already in collection
     * @example
     * await collection.addPhoto(photoId);
     */
    async addPhoto(photoId) {
        // Implementation here
        // 1. Check if photo exists
        // 2. Check if already in collection
        // 3. Add to junction table
        // 4. Increment photoCount
    }

    /**
     * Remove a photo from this collection
     * @param {string} photoId - ID of photo to remove
     * @returns {Promise<void>}
     * @example
     * await collection.removePhoto(photoId);
     */
    async removePhoto(photoId) {
        // Implementation here
    }

    /**
     * Get all photos in this collection
     * @param {Object} [options] - Query options
     * @param {number} [options.limit=20] - Maximum results
     * @param {number} [options.offset=0] - Pagination offset
     * @returns {Promise<Array<Photo>>} Array of photos
     * @example
     * const photos = await collection.getPhotos({ limit: 10 });
     */
    async getPhotos(options = {}) {
        // Implementation here
    }
}

module.exports = Collection;
```

---

## API Endpoints Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user account

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "userId": "uuid-here",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "jwt-token-here"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Email already exists"
}
```

---

#### POST /api/auth/login
Authenticate user

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "token": "jwt-token-here",
    "user": {
      "userId": "uuid-here",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

---

### Photo Endpoints

#### POST /api/photos
Upload a new photo

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (FormData):**
- `file`: Image file
- `title`: Photo title
- `description`: Photo description (optional)
- `category`: Photo category
- `tags`: Comma-separated tags (optional)

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "photoId": "uuid-here",
    "title": "Sunset",
    "imageUrl": "https://cdn.example.com/photos/uuid.jpg",
    "uploadedAt": "2025-11-15T10:00:00Z"
  }
}
```

---

#### GET /api/photos
Get photos with optional filters

**Query Parameters:**
- `category`: Filter by category
- `search`: Search query
- `limit`: Results per page (default: 20)
- `offset`: Pagination offset (default: 0)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "photos": [...],
    "total": 150,
    "limit": 20,
    "offset": 0
  }
}
```

---

#### GET /api/photos/:photoId
Get photo details

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "photoId": "uuid-here",
    "title": "Sunset",
    "description": "Beautiful sunset",
    "imageUrl": "https://...",
    "category": "nature",
    "author": {
      "userId": "uuid",
      "name": "John Doe"
    },
    "views": 1234,
    "likes": 89
  }
}
```

---

## Generating Documentation

### Using JSDoc

**Install JSDoc:**
```bash
npm install --save-dev jsdoc
```

**Create jsdoc.json config:**
```json
{
  "source": {
    "include": ["src"],
    "includePattern": ".+\\.js(doc|x)?$"
  },
  "opts": {
    "destination": "./docs/api",
    "recurse": true,
    "readme": "./README.md"
  },
  "plugins": ["plugins/markdown"],
  "templates": {
    "cleverLinks": true,
    "monospaceLinks": false
  }
}
```

**Generate documentation:**
```bash
npx jsdoc -c jsdoc.json
```

---

### Alternative: JSDoc to Markdown

**Install jsdoc-to-markdown:**
```bash
npm install --save-dev jsdoc-to-markdown
```

**Generate Markdown:**
```bash
npx jsdoc2md src/**/*.js > docs/API.md
```

---

## Folder Structure

```
shutterly/
├── src/
│   ├── models/
│   │   ├── User.js
│   │   ├── Photo.js
│   │   ├── Collection.js
│   │   ├── Like.js
│   │   └── Comment.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── photoController.js
│   │   └── userController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── photos.js
│   │   └── users.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── utils/
│   │   ├── fileUpload.js
│   │   └── helpers.js
│   └── app.js
├── docs/
│   ├── api/
│   │   ├── index.html
│   │   └── ...
│   └── API.md
└── package.json
```

---

## Checklist for Task #9

- [ ] Add JSDoc comments to all classes
- [ ] Document all public methods
- [ ] Document parameters and return types
- [ ] Add usage examples
- [ ] Install JSDoc or jsdoc-to-markdown
- [ ] Configure JSDoc
- [ ] Generate API documentation
- [ ] Upload classes to `src/` folder
- [ ] Upload documentation to `docs/` folder
- [ ] Commit and push to GitHub
- [ ] Verify documentation is readable

---

## References

1. JSDoc Official Documentation: https://jsdoc.app/
2. jsdoc-to-markdown: https://github.com/jsdoc2md/jsdoc-to-markdown
3. Clean Code: Martin, R. C. (2008). *Clean Code*. Prentice Hall.
4. RESTful API Design: Fielding, R. T. (2000). *Architectural Styles and the Design of Network-based Software Architectures*. Dissertation.
