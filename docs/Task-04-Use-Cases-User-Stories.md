# Task #4: Use Cases and User Stories for Shutterly

## Use Cases (Minimum 5)

### Use Case 1: User Registration

**Use Case ID:** UC-001  
**Use Case Name:** User Registration  
**Actor:** New User  
**Precondition:** User is not registered  
**Postcondition:** User account is created and user is logged in

**Main Flow:**
1. User navigates to Shutterly homepage
2. User clicks "Sign Up" button
3. System displays registration form
4. User enters name, email, and password
5. User confirms password
6. User clicks "Register" button
7. System validates input data
8. System creates user account
9. System sends welcome email
10. System logs user in and redirects to home page

**Alternative Flows:**
- 7a. Email already exists:
  - System displays error message
  - User returns to step 4
- 7b. Password doesn't match:
  - System displays error message
  - User returns to step 5

---

### Use Case 2: Upload Photo

**Use Case ID:** UC-002  
**Use Case Name:** Upload Photo  
**Actor:** Registered User  
**Precondition:** User is logged in  
**Postcondition:** Photo is uploaded and visible in gallery

**Main Flow:**
1. User clicks "Upload" button
2. System displays upload modal
3. User selects photo file or drags and drops
4. System displays photo preview
5. User enters title and description
6. User selects category
7. User adds tags (optional)
8. User clicks "Upload Photo" button
9. System validates file (type, size)
10. System processes and stores photo
11. System displays success message
12. Photo appears in user's gallery

**Alternative Flows:**
- 9a. Invalid file type:
  - System displays error message
  - User returns to step 3
- 9b. File too large:
  - System displays error message
  - User returns to step 3

---

### Use Case 3: Search Photos

**Use Case ID:** UC-003  
**Use Case Name:** Search Photos  
**Actor:** Any User (Guest or Registered)  
**Precondition:** None  
**Postcondition:** Search results are displayed

**Main Flow:**
1. User enters search query in search bar
2. User clicks search button or presses Enter
3. System processes search query
4. System searches photos by title, description, tags, and author
5. System displays matching photos in grid layout
6. User browses search results
7. User clicks on photo to view details

**Alternative Flows:**
- 5a. No results found:
  - System displays "No photos found" message
  - System suggests popular categories

---

### Use Case 4: Save Photo to Collection

**Use Case ID:** UC-004  
**Use Case Name:** Save Photo to Collection  
**Actor:** Registered User  
**Precondition:** User is logged in  
**Postcondition:** Photo is saved to user's collection

**Main Flow:**
1. User browses photo gallery
2. User clicks on a photo
3. System displays photo in detail view
4. User clicks "Save" button
5. System displays collection selection dialog
6. User selects existing collection or creates new one
7. User confirms save action
8. System adds photo to collection
9. System displays success notification
10. Photo appears in user's saved collection

**Alternative Flows:**
- 5a. User has no collections:
  - System prompts to create new collection
  - User enters collection name
  - System creates collection and saves photo

---

### Use Case 5: Filter by Category

**Use Case ID:** UC-005  
**Use Case Name:** Filter Photos by Category  
**Actor:** Any User (Guest or Registered)  
**Precondition:** None  
**Postcondition:** Filtered photos are displayed

**Main Flow:**
1. User views photo gallery homepage
2. User sees category filter buttons
3. User clicks on a category (Nature, Architecture, Portrait, etc.)
4. System filters photos by selected category
5. System displays only photos in selected category
6. Category button highlights as active
7. User browses filtered photos

**Alternative Flows:**
- 3a. User clicks "All" category:
  - System displays all photos without filter

---

## User Stories (Minimum 5)

### User Story 1: Photo Upload

**ID:** US-001  
**Title:** Upload and Share Photos

**User Story:**  
As a **photographer**, I want to **upload my photos with titles and descriptions** so that **I can share my work with the community and build my portfolio**.

**Acceptance Criteria:**
- User can select photos from their device
- Drag and drop functionality is available
- User can add title (required), description, and tags
- User can select category
- Photo is processed and displayed in gallery within 5 seconds
- User receives confirmation notification

**Priority:** High  
**Estimation:** 5 story points

---

### User Story 2: Discover Inspiration

**ID:** US-002  
**Title:** Browse and Discover Photos

**User Story:**  
As a **design enthusiast**, I want to **browse photos in a Pinterest-style grid layout** so that **I can discover inspiring photography and collect ideas**.

**Acceptance Criteria:**
- Photos display in masonry/grid layout
- Images load progressively as user scrolls
- Photos are organized by categories
- User can click any photo to view full size
- Layout is responsive on mobile and tablet

**Priority:** High  
**Estimation:** 8 story points

---

### User Story 3: Search Functionality

**ID:** US-003  
**Title:** Search for Specific Photos

**User Story:**  
As a **user**, I want to **search photos by keywords, tags, or photographer name** so that **I can quickly find specific content I'm interested in**.

**Acceptance Criteria:**
- Search bar is prominently displayed
- Search works across titles, descriptions, tags, and authors
- Results display in real-time or within 2 seconds
- Search highlights matching terms
- User can clear search and return to all photos

**Priority:** High  
**Estimation:** 5 story points

---

### User Story 4: Save Favorites

**ID:** US-004  
**Title:** Save Photos to Collections

**User Story:**  
As a **registered user**, I want to **save photos to my personal collections** so that **I can organize and revisit my favorite images later**.

**Acceptance Criteria:**
- User can click "Save" button on any photo
- User can create multiple named collections
- User can view all saved photos in profile
- User can remove photos from collections
- Save status is indicated on photos

**Priority:** Medium  
**Estimation:** 8 story points

---

### User Story 5: User Profile

**ID:** US-005  
**Title:** Manage User Profile

**User Story:**  
As a **photographer**, I want to **have a profile page showing my uploaded photos and statistics** so that **I can showcase my portfolio and track engagement**.

**Acceptance Criteria:**
- Profile page displays user's uploaded photos
- Statistics show: total photos, total views, total likes
- User can edit profile information (name, bio, avatar)
- Profile is accessible via username URL
- Other users can visit and view public profiles

**Priority:** Medium  
**Estimation:** 8 story points

---

## Additional User Stories

### User Story 6: Social Interaction

**ID:** US-006  
**Title:** Like and Share Photos

**User Story:**  
As a **user**, I want to **like and share photos I enjoy** so that **I can show appreciation to photographers and share content with others**.

**Acceptance Criteria:**
- Heart icon allows liking photos
- Like count is displayed and updates in real-time
- Share button provides shareable link
- User can copy link or share to social media
- Liked photos are saved in user profile

**Priority:** Medium  
**Estimation:** 5 story points

---

### User Story 7: Responsive Mobile Experience

**ID:** US-007  
**Title:** Mobile-Friendly Interface

**User Story:**  
As a **mobile user**, I want to **browse and upload photos seamlessly on my smartphone** so that **I can use Shutterly anywhere, anytime**.

**Acceptance Criteria:**
- Interface adapts to mobile screen sizes
- Touch gestures work intuitively (swipe, pinch, tap)
- Upload works from mobile camera or gallery
- Performance is optimized for mobile networks
- Navigation is thumb-friendly

**Priority:** High  
**Estimation:** 13 story points

---

### User Story 8: Category Exploration

**ID:** US-008  
**Title:** Browse by Photography Categories

**User Story:**  
As an **art lover**, I want to **filter photos by categories like Nature, Architecture, Portrait** so that **I can explore specific types of photography I enjoy**.

**Acceptance Criteria:**
- Category buttons are clearly visible
- Clicking a category filters photos instantly
- Active category is visually highlighted
- Categories include: Nature, Architecture, Portrait, Street, Wildlife, Landscape, Abstract
- "All" option shows unfiltered content

**Priority:** High  
**Estimation:** 3 story points

---

## Summary

**Total Use Cases:** 5  
**Total User Stories:** 8

These use cases and user stories provide a comprehensive foundation for developing the Shutterly photography platform, covering core functionality from user registration to content discovery and social interaction.
