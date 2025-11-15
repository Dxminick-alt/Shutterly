-- Shutterly Database Initialization Script
-- This script creates the database schema for the photo sharing platform

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS shutterly;
USE shutterly;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    userId VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    passwordHash VARCHAR(255) NOT NULL,
    avatar VARCHAR(500),
    bio TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lastLogin TIMESTAMP NULL,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Photos table
CREATE TABLE IF NOT EXISTS photos (
    photoId VARCHAR(36) PRIMARY KEY,
    userId VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    imageUrl VARCHAR(500) NOT NULL,
    thumbnailUrl VARCHAR(500),
    category VARCHAR(50),
    tags JSON,
    views INT DEFAULT 0,
    likes INT DEFAULT 0,
    uploadedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
    INDEX idx_user (userId),
    INDEX idx_category (category),
    INDEX idx_uploaded (uploadedAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Collections table
CREATE TABLE IF NOT EXISTS collections (
    collectionId VARCHAR(36) PRIMARY KEY,
    userId VARCHAR(36) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    isPublic BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    photoCount INT DEFAULT 0,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
    INDEX idx_user (userId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Collection_Photos junction table
CREATE TABLE IF NOT EXISTS collection_photos (
    collectionPhotoId VARCHAR(36) PRIMARY KEY,
    collectionId VARCHAR(36) NOT NULL,
    photoId VARCHAR(36) NOT NULL,
    addedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (collectionId) REFERENCES collections(collectionId) ON DELETE CASCADE,
    FOREIGN KEY (photoId) REFERENCES photos(photoId) ON DELETE CASCADE,
    UNIQUE KEY unique_collection_photo (collectionId, photoId),
    INDEX idx_collection (collectionId),
    INDEX idx_photo (photoId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Likes table
CREATE TABLE IF NOT EXISTS likes (
    likeId VARCHAR(36) PRIMARY KEY,
    userId VARCHAR(36) NOT NULL,
    photoId VARCHAR(36) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
    FOREIGN KEY (photoId) REFERENCES photos(photoId) ON DELETE CASCADE,
    UNIQUE KEY unique_user_photo (userId, photoId),
    INDEX idx_user (userId),
    INDEX idx_photo (photoId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
    commentId VARCHAR(36) PRIMARY KEY,
    userId VARCHAR(36) NOT NULL,
    photoId VARCHAR(36) NOT NULL,
    content TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
    FOREIGN KEY (photoId) REFERENCES photos(photoId) ON DELETE CASCADE,
    INDEX idx_photo (photoId),
    INDEX idx_user (userId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data
INSERT INTO users (userId, name, email, passwordHash, bio) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'John Doe', 'john@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Professional landscape photographer'),
('550e8400-e29b-41d4-a716-446655440001', 'Jane Smith', 'jane@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Portrait and street photography enthusiast');

INSERT INTO photos (photoId, userId, title, description, category, views, likes) VALUES
('660e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 'Mountain Sunrise', 'Beautiful sunrise over the mountains', 'nature', 1234, 89),
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'City Lights', 'Urban landscape at night', 'architecture', 2345, 156);

-- Create a view for photo statistics
CREATE OR REPLACE VIEW photo_stats AS
SELECT 
    p.photoId,
    p.title,
    u.name as authorName,
    p.category,
    p.views,
    p.likes,
    COUNT(DISTINCT c.commentId) as commentCount
FROM photos p
JOIN users u ON p.userId = u.userId
LEFT JOIN comments c ON p.photoId = c.photoId
GROUP BY p.photoId, p.title, u.name, p.category, p.views, p.likes;
