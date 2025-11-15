# Task #11: Unit Testing and Integration Testing

## Overview

This task requires writing:
- **Unit Tests:** Test individual functions/methods in isolation
- **Integration Tests:** Test interaction between modules
- Test both **happy paths** (success scenarios) and **exceptions** (error scenarios)

---

## Unit Testing Basics

### What is Unit Testing?

**Unit Test:** Tests a single unit of code (function, method, class) in isolation.

**Benefits:**
- Early bug detection
- Facilitates refactoring
- Documents code behavior
- Improves code quality

**Characteristics:**
- Fast execution (milliseconds)
- Independent (no dependencies on external systems)
- Repeatable (same result every time)
- Isolated (mocks external dependencies)

---

## JavaScript Testing with Jest

### Installation

```bash
npm install --save-dev jest
```

### Configure package.json

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "testEnvironment": "node",
    "coverageDirectory": "coverage",
    "collectCoverageFrom": [
      "src/**/*.js",
      "!src/tests/**"
    ]
  }
}
```

---

## Unit Test Examples

### Example 1: Photo Validation Function

**File:** `src/utils/validation.js`
```javascript
/**
 * Validate photo upload file
 * @param {File} file - File to validate
 * @returns {Object} Validation result with isValid and errors
 */
export function validatePhotoFile(file) {
    const errors = [];
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!file) {
        errors.push('No file provided');
        return { isValid: false, errors };
    }

    if (!validTypes.includes(file.type)) {
        errors.push('File must be JPG, PNG, or GIF');
    }

    if (file.size > maxSize) {
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        errors.push(`File size (${fileSizeMB}MB) exceeds maximum allowed size (10MB)`);
    }

    if (file.size === 0) {
        errors.push('File is empty');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}
```

**Test File:** `src/tests/validation.test.js`
```javascript
import { validatePhotoFile } from '../utils/validation.js';

describe('Photo File Validation', () => {
    
    // HAPPY PATH TESTS
    
    test('should validate correct JPEG file', () => {
        const validFile = {
            name: 'photo.jpg',
            type: 'image/jpeg',
            size: 5 * 1024 * 1024 // 5MB
        };

        const result = validatePhotoFile(validFile);

        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    test('should validate correct PNG file', () => {
        const validFile = {
            name: 'photo.png',
            type: 'image/png',
            size: 2 * 1024 * 1024 // 2MB
        };

        const result = validatePhotoFile(validFile);

        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    test('should validate file at exact size limit', () => {
        const validFile = {
            name: 'photo.jpg',
            type: 'image/jpeg',
            size: 10 * 1024 * 1024 // Exactly 10MB
        };

        const result = validatePhotoFile(validFile);

        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    // EXCEPTION/ERROR TESTS

    test('should reject file that is too large', () => {
        const largeFile = {
            name: 'huge.jpg',
            type: 'image/jpeg',
            size: 15 * 1024 * 1024 // 15MB
        };

        const result = validatePhotoFile(largeFile);

        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('File size (15.00MB) exceeds maximum allowed size (10MB)');
    });

    test('should reject invalid file type', () => {
        const invalidFile = {
            name: 'document.pdf',
            type: 'application/pdf',
            size: 1 * 1024 * 1024
        };

        const result = validatePhotoFile(invalidFile);

        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('File must be JPG, PNG, or GIF');
    });

    test('should reject empty file', () => {
        const emptyFile = {
            name: 'empty.jpg',
            type: 'image/jpeg',
            size: 0
        };

        const result = validatePhotoFile(emptyFile);

        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('File is empty');
    });

    test('should reject null file', () => {
        const result = validatePhotoFile(null);

        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('No file provided');
    });

    test('should reject undefined file', () => {
        const result = validatePhotoFile(undefined);

        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('No file provided');
    });

    test('should handle multiple validation errors', () => {
        const badFile = {
            name: 'bad.txt',
            type: 'text/plain',
            size: 15 * 1024 * 1024 // 15MB
        };

        const result = validatePhotoFile(badFile);

        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(1);
        expect(result.errors).toContain('File must be JPG, PNG, or GIF');
        expect(result.errors).toContain('File size (15.00MB) exceeds maximum allowed size (10MB)');
    });
});
```

**Run tests:**
```bash
npm test
```

---

### Example 2: Search Function

**File:** `src/utils/search.js`
```javascript
/**
 * Search photos by query
 * @param {Array<Object>} photos - Array of photo objects
 * @param {string} query - Search query
 * @returns {Array<Object>} Matching photos
 */
export function searchPhotos(photos, query) {
    if (!photos || !Array.isArray(photos)) {
        throw new Error('Photos must be an array');
    }

    if (!query || typeof query !== 'string') {
        return photos;
    }

    const lowercaseQuery = query.toLowerCase().trim();
    
    if (lowercaseQuery === '') {
        return photos;
    }

    return photos.filter(photo => {
        const titleMatch = photo.title?.toLowerCase().includes(lowercaseQuery);
        const descMatch = photo.description?.toLowerCase().includes(lowercaseQuery);
        const authorMatch = photo.author?.toLowerCase().includes(lowercaseQuery);
        const categoryMatch = photo.category?.toLowerCase().includes(lowercaseQuery);

        return titleMatch || descMatch || authorMatch || categoryMatch;
    });
}
```

**Test File:** `src/tests/search.test.js`
```javascript
import { searchPhotos } from '../utils/search.js';

describe('Photo Search Functionality', () => {
    const samplePhotos = [
        {
            id: 1,
            title: 'Mountain Sunset',
            description: 'Beautiful sunset over mountains',
            author: 'John Doe',
            category: 'nature'
        },
        {
            id: 2,
            title: 'City Lights',
            description: 'Urban landscape at night',
            author: 'Jane Smith',
            category: 'architecture'
        },
        {
            id: 3,
            title: 'Ocean Waves',
            description: 'Crashing waves on beach',
            author: 'John Doe',
            category: 'nature'
        }
    ];

    // HAPPY PATH TESTS

    test('should find photos by title', () => {
        const results = searchPhotos(samplePhotos, 'Mountain');

        expect(results).toHaveLength(1);
        expect(results[0].title).toBe('Mountain Sunset');
    });

    test('should find photos by description', () => {
        const results = searchPhotos(samplePhotos, 'urban');

        expect(results).toHaveLength(1);
        expect(results[0].title).toBe('City Lights');
    });

    test('should find photos by author', () => {
        const results = searchPhotos(samplePhotos, 'John Doe');

        expect(results).toHaveLength(2);
        expect(results[0].author).toBe('John Doe');
        expect(results[1].author).toBe('John Doe');
    });

    test('should find photos by category', () => {
        const results = searchPhotos(samplePhotos, 'nature');

        expect(results).toHaveLength(2);
        expect(results.every(p => p.category === 'nature')).toBe(true);
    });

    test('should be case insensitive', () => {
        const results = searchPhotos(samplePhotos, 'MOUNTAIN');

        expect(results).toHaveLength(1);
    });

    test('should handle whitespace in query', () => {
        const results = searchPhotos(samplePhotos, '  Mountain  ');

        expect(results).toHaveLength(1);
    });

    test('should return all photos for empty query', () => {
        const results = searchPhotos(samplePhotos, '');

        expect(results).toHaveLength(3);
    });

    test('should return all photos for null query', () => {
        const results = searchPhotos(samplePhotos, null);

        expect(results).toHaveLength(3);
    });

    // EXCEPTION TESTS

    test('should return empty array when no matches found', () => {
        const results = searchPhotos(samplePhotos, 'nonexistent');

        expect(results).toHaveLength(0);
        expect(results).toEqual([]);
    });

    test('should throw error for null photos array', () => {
        expect(() => {
            searchPhotos(null, 'test');
        }).toThrow('Photos must be an array');
    });

    test('should throw error for non-array photos', () => {
        expect(() => {
            searchPhotos('not an array', 'test');
        }).toThrow('Photos must be an array');
    });

    test('should handle photos with missing fields', () => {
        const incompletePhotos = [
            { id: 1, title: 'Photo 1' }, // Missing description, author, category
            { id: 2 }  // Missing all text fields
        ];

        const results = searchPhotos(incompletePhotos, 'Photo');

        expect(results).toHaveLength(1);
    });
});
```

---

## Integration Testing

### What is Integration Testing?

**Integration Test:** Tests how multiple units work together.

**Example:** Testing user registration flow that involves:
- Controller (handles request)
- User model (creates user)
- Database (saves data)
- Email service (sends welcome email)

---

### Example: User Registration Integration Test

**Test File:** `src/tests/integration/userRegistration.test.js`

```javascript
import request from 'supertest';
import app from '../../app.js';
import User from '../../models/User.js';
import { connectDB, disconnectDB, clearDB } from '../testHelpers.js';

describe('User Registration Integration Tests', () => {
    
    // Setup: Connect to test database before all tests
    beforeAll(async () => {
        await connectDB();
    });

    // Cleanup: Clear database before each test
    beforeEach(async () => {
        await clearDB();
    });

    // Teardown: Disconnect after all tests
    afterAll(async () => {
        await disconnectDB();
    });

    // HAPPY PATH

    test('should successfully register a new user', async () => {
        const newUser = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'SecurePass123!'
        };

        const response = await request(app)
            .post('/api/auth/register')
            .send(newUser)
            .expect(201);

        // Verify response
        expect(response.body.success).toBe(true);
        expect(response.body.data.user.email).toBe('john@example.com');
        expect(response.body.data.user.name).toBe('John Doe');
        expect(response.body.data.token).toBeDefined();

        // Verify user saved in database
        const savedUser = await User.findByEmail('john@example.com');
        expect(savedUser).toBeDefined();
        expect(savedUser.name).toBe('John Doe');
        
        // Verify password is hashed (not plain text)
        expect(savedUser.password).not.toBe('SecurePass123!');
    });

    test('should login after successful registration', async () => {
        // Register user
        await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: 'Password123!'
            })
            .expect(201);

        // Login with same credentials
        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'jane@example.com',
                password: 'Password123!'
            })
            .expect(200);

        expect(loginResponse.body.success).toBe(true);
        expect(loginResponse.body.data.token).toBeDefined();
    });

    // EXCEPTION TESTS

    test('should reject registration with existing email', async () => {
        // Register first user
        await request(app)
            .post('/api/auth/register')
            .send({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password123!'
            })
            .expect(201);

        // Try to register with same email
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Jane Doe',
                email: 'john@example.com', // Same email
                password: 'DifferentPass123!'
            })
            .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.error).toContain('Email already exists');
    });

    test('should reject registration with weak password', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'John Doe',
                email: 'john@example.com',
                password: '123' // Too short
            })
            .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.error).toContain('Password');
    });

    test('should reject registration with invalid email', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'John Doe',
                email: 'invalid-email', // Invalid format
                password: 'SecurePass123!'
            })
            .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.error).toContain('email');
    });

    test('should reject registration with missing fields', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'John Doe'
                // Missing email and password
            })
            .expect(400);

        expect(response.body.success).toBe(false);
    });
});
```

---

## Test Helpers

**File:** `src/tests/testHelpers.js`

```javascript
import mongoose from 'mongoose';

/**
 * Connect to test database
 */
export async function connectDB() {
    const testDB = process.env.TEST_DB_URL || 'mongodb://localhost:27017/shutterly_test';
    await mongoose.connect(testDB);
}

/**
 * Disconnect from database
 */
export async function disconnectDB() {
    await mongoose.connection.close();
}

/**
 * Clear all collections in test database
 */
export async function clearDB() {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
}
```

---

## Test Coverage

### Running Coverage Report

```bash
npm run test:coverage
```

**Output:**
```
------------------|---------|----------|---------|---------|
File              | % Stmts | % Branch | % Funcs | % Lines |
------------------|---------|----------|---------|---------|
All files         |   85.71 |    78.57 |   90.00 |   85.71 |
 validation.js    |   100   |    100   |   100   |   100   |
 search.js        |   92.31 |    85.71 |   100   |   92.31 |
 User.js          |   78.26 |    66.67 |   80.00 |   78.26 |
------------------|---------|----------|---------|---------|
```

**Coverage Goals:**
- Aim for 80%+ code coverage
- 100% coverage for critical functions
- Don't obsess over 100% everywhere

---

## Best Practices

### ✅ DO

- **Test both happy paths and exceptions**
- **Use descriptive test names**
- **Keep tests independent**
- **Mock external dependencies**
- **Test edge cases**
- **Clean up after tests**
- **Use setup/teardown (beforeEach, afterEach)**

### ❌ DON'T

- **Don't test implementation details**
- **Don't write flaky tests**
- **Don't skip test cleanup**
- **Don't test third-party libraries**
- **Don't make tests dependent on each other**

---

## Folder Structure

```
shutterly/
├── src/
│   ├── tests/
│   │   ├── unit/
│   │   │   ├── validation.test.js
│   │   │   ├── search.test.js
│   │   │   └── helpers.test.js
│   │   ├── integration/
│   │   │   ├── userRegistration.test.js
│   │   │   ├── photoUpload.test.js
│   │   │   └── userAuth.test.js
│   │   └── testHelpers.js
│   ├── utils/
│   │   ├── validation.js
│   │   └── search.js
│   └── models/
│       └── User.js
└── package.json
```

---

## Checklist for Task #11

### Unit Tests
- [ ] At least 1 unit test file per team member
- [ ] Test happy paths (success scenarios)
- [ ] Test exceptions (error scenarios)
- [ ] Test edge cases (boundary conditions)
- [ ] All unit tests pass
- [ ] Upload to `src/tests/unit/` folder

### Integration Tests
- [ ] At least 1 integration test for the project
- [ ] Test module interactions
- [ ] Test database operations
- [ ] Test API endpoints (if applicable)
- [ ] All integration tests pass
- [ ] Upload to `src/tests/integration/` folder

### Documentation
- [ ] Document what is being tested
- [ ] Include test commands in README
- [ ] Share GitHub repo link

---

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Run specific test file
npx jest validation.test.js

# Run tests matching pattern
npx jest --testNamePattern="should validate"
```

---

## References

1. Jest Documentation: https://jestjs.io/
2. Testing Library: https://testing-library.com/
3. Supertest (API Testing): https://github.com/visionmedia/supertest
4. Fowler, M. "Test Pyramid": https://martinfowler.com/bliki/TestPyramid.html
5. Beck, K. (2002). *Test-Driven Development*. Addison-Wesley.
