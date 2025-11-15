# Shutterly - Project Diagrams and Modeling

This document contains various diagrams modeling the Shutterly photo sharing platform architecture, user flows, and system components.

## 1. System Architecture Diagram

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[HTML Structure] --> B[CSS Styling]
        B --> C[JavaScript Logic]
        A --> D[Responsive UI]
        B --> D
        C --> D
    end
    
    subgraph "Core Components"
        E[Authentication System]
        F[Photo Management]
        G[Social Features]
        H[Theme System]
        I[User Profiles]
    end
    
    subgraph "Data Layer"
        J[LocalStorage]
        K[Photos Data]
        L[Comments Data]
        M[Likes Data]
        N[User Data]
    end
    
    subgraph "External Services"
        O[Unsplash API<br/>Sample Images]
        P[FontAwesome<br/>Icons]
        Q[Google Fonts<br/>Inter]
    end
    
    D --> E
    D --> F
    D --> G
    D --> H
    D --> I
    
    E --> J
    F --> K
    G --> L
    G --> M
    I --> N
    
    D --> O
    D --> P
    D --> Q
    
    J --> K
    J --> L
    J --> M
    J --> N
```

## 2. User Journey Flow

```mermaid
journey
    title User Journey in Shutterly
    section Registration/Login
      Visit Website: 5: User
      View Gallery: 4: User
      Register Account: 5: User
      Login: 5: User
    section Photo Interaction
      Browse Photos: 5: User
      Filter by Category: 4: User
      Search Photos: 4: User
      View Photo Details: 5: User
      Like Photo: 5: User
      Comment on Photo: 5: User
      Download Photo: 4: User
    section Content Creation
      Upload Photo: 5: User
      Add Title/Description: 4: User
      Select Category: 4: User
      Publish Photo: 5: User
    section Profile Management
      View Profile: 5: User
      Edit Profile: 4: User
      View My Uploads: 5: User
      View Liked Photos: 4: User
      View My Comments: 4: User
      Edit Comments: 3: User
```

## 3. Data Model Structure

```mermaid
erDiagram
    USER {
        string id PK
        string name
        string email
        string avatar
        string bio
        datetime joinDate
    }
    
    PHOTO {
        string id PK
        string title
        string description
        string category
        string author FK
        string imageUrl
        datetime uploadDate
        int likes
        int comments
    }
    
    COMMENT {
        string id PK
        string photoId FK
        string author FK
        string text
        datetime date
        boolean edited
        datetime editDate
    }
    
    LIKE {
        string photoId FK
        string userId FK
    }
    
    CATEGORY {
        string name PK
        string displayName
    }
    
    USER ||--o{ PHOTO : uploads
    USER ||--o{ COMMENT : writes
    USER ||--o{ LIKE : gives
    PHOTO ||--o{ COMMENT : has
    PHOTO ||--o{ LIKE : receives
    PHOTO }o--|| CATEGORY : belongs_to
```

## 4. Component Architecture

```mermaid
graph TD
    subgraph "ShutterlyApp Class"
        A[Constructor] --> B[Initialize]
        B --> C[Setup Event Listeners]
        B --> D[Setup Theme]
        B --> E[Load User Session]
        B --> F[Load Sample Data]
        B --> G[Render Photos]
    end
    
    subgraph "Authentication Module"
        H[Login Handler]
        I[Register Handler]
        J[Logout Handler] 
        K[Update Auth UI]
    end
    
    subgraph "Photo Module"
        L[Photo Gallery]
        M[Photo Upload]
        N[Photo Detail Modal]
        O[Photo Search/Filter]
    end
    
    subgraph "Social Module"
        P[Like System]
        Q[Comment System]
        R[Comment Editing]
        S[Download Feature]
    end
    
    subgraph "Profile Module"
        T[User Profile Modal]
        U[Profile Tabs]
        V[My Uploads]
        W[Liked Photos]
        X[My Comments]
        Y[Edit Profile]
    end
    
    subgraph "Theme Module"
        Z[Theme Toggle]
        AA[Theme Storage]
        AB[CSS Variables]
    end
    
    A --> H
    A --> L
    A --> P
    A --> T
    A --> Z
    
    H --> K
    I --> K
    J --> K
    
    L --> M
    L --> N
    L --> O
    
    P --> Q
    Q --> R
    
    T --> U
    U --> V
    U --> W
    U --> X
    T --> Y
```

## 5. User Interface State Flow

```mermaid
stateDiagram-v2
    [*] --> Landing
    Landing --> Authenticated : Login/Register
    Landing --> Gallery : Browse as Guest
    
    state Authenticated {
        [*] --> MainGallery
        MainGallery --> PhotoDetail : Click Photo
        MainGallery --> Upload : Click Upload
        MainGallery --> Profile : Click Profile
        MainGallery --> Search : Use Search
        
        PhotoDetail --> Like : Click Like
        PhotoDetail --> Comment : Add Comment
        PhotoDetail --> Download : Click Download
        PhotoDetail --> MainGallery : Close Modal
        
        Upload --> MainGallery : Upload Complete
        
        state Profile {
            [*] --> MyUploads
            MyUploads --> LikedPhotos : Switch Tab
            LikedPhotos --> MyComments : Switch Tab
            MyComments --> MyUploads : Switch Tab
            
            MyUploads --> PhotoPreview : Click Photo
            LikedPhotos --> PhotoPreview : Click Photo
            MyComments --> PhotoPreview : Click Comment
            PhotoPreview --> MyUploads : Close Preview
        }
        
        Profile --> EditProfile : Click Edit
        EditProfile --> Profile : Save Changes
    }
    
    Gallery --> PhotoDetail : Click Photo (Guest)
    PhotoDetail --> Gallery : Close Modal (Guest)
    
    Authenticated --> [*] : Logout
```

## 6. Feature Dependencies

```mermaid
graph LR
    subgraph "Core Features"
        A[Authentication]
        B[Photo Display]
        C[Theme System]
    end
    
    subgraph "Social Features"
        D[Like System]
        E[Comment System]
        F[Comment Editing]
    end
    
    subgraph "Content Features"
        G[Photo Upload]
        H[Photo Categories]
        I[Search/Filter]
    end
    
    subgraph "Profile Features"
        J[User Profile]
        K[Upload History]
        L[Like History]
        M[Comment History]
    end
    
    subgraph "Advanced Features"
        N[Inline Photo Preview]
        O[Photo Download]
        P[Profile Editing]
    end
    
    A --> D
    A --> E
    A --> G
    A --> J
    
    B --> D
    B --> E
    B --> O
    
    D --> L
    E --> F
    E --> M
    
    G --> K
    
    J --> K
    J --> L
    J --> M
    J --> P
    
    K --> N
    L --> N
    M --> N
```

## 7. Technology Stack

```mermaid
graph TB
    subgraph "Frontend Technologies"
        A[HTML5<br/>Structure & Semantics]
        B[CSS3<br/>Styling & Animations]
        C[JavaScript ES6+<br/>Logic & Interactions]
    end
    
    subgraph "Styling Framework"
        D[CSS Variables<br/>Theme System]
        E[Flexbox & Grid<br/>Layout]
        F[CSS Animations<br/>Transitions]
        G[Responsive Design<br/>Media Queries]
    end
    
    subgraph "External Dependencies"
        H[Google Fonts<br/>Inter Font]
        I[FontAwesome<br/>Icons]
        J[Unsplash<br/>Sample Images]
    end
    
    subgraph "Storage & Data"
        K[LocalStorage<br/>Data Persistence]
        L[JSON<br/>Data Format]
        M[Base64<br/>Image Storage]
    end
    
    subgraph "Browser APIs"
        N[File API<br/>Image Upload]
        O[Canvas API<br/>Image Processing]
        P[DOM API<br/>Manipulation]
    end
    
    A --> D
    B --> E
    B --> F
    B --> G
    C --> K
    C --> L
    C --> N
    C --> O
    C --> P
    
    B --> H
    A --> I
    C --> J
    
    K --> M
```

## 8. Security & Privacy Model

```mermaid
graph TD
    subgraph "Client-Side Security"
        A[Input Validation]
        B[XSS Prevention]
        C[Data Sanitization]
    end
    
    subgraph "Data Privacy"
        D[Local Storage Only]
        E[No Server Communication]
        F[User Control]
    end
    
    subgraph "Authentication"
        G[Basic Auth System]
        H[Session Management]
        I[User Permissions]
    end
    
    subgraph "Content Security"
        J[Image Validation]
        K[File Size Limits]
        L[Content Filtering]
    end
    
    A --> B
    A --> C
    G --> H
    H --> I
    D --> E
    E --> F
    J --> K
    K --> L
    
    I --> L
    C --> J
```

## Summary

The Shutterly project is architected as a modern, client-side photo sharing platform with the following key characteristics:

### Architecture Highlights:
- **Single Page Application (SPA)** built with vanilla JavaScript
- **Component-based structure** with modular functionality
- **Local storage persistence** for offline capability
- **Responsive design** with mobile-first approach
- **Theme system** supporting dark/light modes

### Key Design Patterns:
- **MVC Pattern**: Clear separation of data, view, and logic
- **Observer Pattern**: Event-driven interactions
- **Strategy Pattern**: Pluggable theme system
- **Factory Pattern**: Dynamic content generation

### Technical Strengths:
- **No dependencies**: Pure HTML/CSS/JS implementation
- **Offline capable**: All data stored locally
- **Performance optimized**: Lightweight and fast
- **Accessibility focused**: Semantic HTML and proper ARIA
- **Mobile responsive**: Touch-friendly interactions

This modeling provides a comprehensive view of the Shutterly platform's architecture, user flows, and technical implementation for future development and maintenance.