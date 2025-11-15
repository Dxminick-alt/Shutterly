# Shutterly - Photography Sharing Platform

> A Pinterest-inspired photo sharing platform for photographers and photography enthusiasts

![Shutterly Banner](https://via.placeholder.com/1200x300/667eea/ffffff?text=Shutterly+-+Discover+Beautiful+Photography)

---

## 📸 About

**Shutterly** is a modern, responsive photo sharing website that allows photographers to upload, share, and discover beautiful photography. Built with HTML, CSS, and JavaScript, it features a Pinterest-style masonry grid layout, category filtering, and search functionality.

This project was developed as part of the **Technology and Methodology** course at university.

---

## ✨ Features

- 📷 **Photo Upload** - Upload photos with titles, descriptions, and categories
- 🔍 **Search & Filter** - Search photos by keywords and filter by categories
- 🎨 **Pinterest-Style Layout** - Responsive masonry grid for optimal visual appeal
- 👤 **User Profiles** - Showcase your portfolio and track statistics
- ❤️ **Social Interaction** - Like and save photos to collections
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🌓 **Modern UI** - Clean, intuitive interface with smooth interactions

---

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js 14+ (for running tests)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/shutterly.git
   cd shutterly
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - OR use a local server:
   ```bash
   npx serve .
   ```

3. **Start exploring!**
   - Browse the photo gallery
   - Use category filters
   - Search for photos
   - Click photos to view details

---

## 📁 Project Structure

```
shutterly/
├── index.html              # Main HTML file
├── styles/
│   └── main.css           # All CSS styles
├── src/
│   └── app.js             # Main JavaScript logic
├── docs/                  # Project documentation
│   ├── Task-01-System-Development-Steps.md
│   ├── Task-02-Development-Methods-Comparison.md
│   ├── Task-03-Requirements-Types-Techniques.md
│   ├── Task-04-Use-Cases-User-Stories.md
│   ├── Task-05-Requirements-Specification.md
│   ├── Task-06-UML-Diagrams-Guide.md
│   ├── Task-07-UI-Design-Guide.md
│   ├── Task-08-Class-ER-Diagrams.md
│   ├── Task-09-API-Documentation-Guide.md
│   ├── Task-10-GitHub-Workflow-Guide.md
│   └── Task-11-Testing-Guide.md
├── tests/                 # Unit and integration tests
│   └── validation.test.js
├── ui-designs/            # Wireframes and mockups
│   ├── wireframes/
│   └── mockups/
└── README.md              # This file
```

---

## 📚 Documentation

All project tasks and documentation are located in the [`docs/`](./docs/) folder:

### Course Tasks

1. **[Task #1](./docs/Task-01-System-Development-Steps.md)** - System Development Steps, Process & Purpose
2. **[Task #2](./docs/Task-02-Development-Methods-Comparison.md)** - Software Development Methods Comparison
3. **[Task #3](./docs/Task-03-Requirements-Types-Techniques.md)** - Requirement Types, Elicitation Techniques & Standards
4. **[Task #4](./docs/Task-04-Use-Cases-User-Stories.md)** - Use Cases and User Stories (5 each)
5. **[Task #5](./docs/Task-05-Requirements-Specification.md)** - Functional & Non-Functional Requirements
6. **[Task #6](./docs/Task-06-UML-Diagrams-Guide.md)** - UML Diagrams (Use Case, Sequence, Activity)
7. **[Task #7](./docs/Task-07-UI-Design-Guide.md)** - UI Design (Wireframes, Mockups)
8. **[Task #8](./docs/Task-08-Class-ER-Diagrams.md)** - Class Diagrams and ER Diagrams
9. **[Task #9](./docs/Task-09-API-Documentation-Guide.md)** - API Documentation with JSDoc
10. **[Task #10](./docs/Task-10-GitHub-Workflow-Guide.md)** - GitHub Workflow (Issues, Branches, Pull Requests)
11. **[Task #11](./docs/Task-11-Testing-Guide.md)** - Unit and Integration Testing

---

## 🧪 Testing

### Running Tests

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

### Test Files
- `tests/validation.test.js` - Photo file validation tests (16 tests covering happy paths and exceptions)

**Test Coverage:**
- ✅ Happy path tests (valid files)
- ✅ Exception tests (invalid files, edge cases)
- ✅ Boundary tests (size limits)

---

## 🎨 UI Design

### Design System

**Colors:**
- Primary: `#E60023` (Pinterest Red)
- Dark: `#111111`
- Light Background: `#F5F5F5`
- White: `#FFFFFF`

**Typography:**
- Font: System fonts (San Francisco, Segoe UI, Roboto)
- Sizes: 12px - 48px

**Components:**
- Rounded buttons (24px radius)
- Card-based layout
- Masonry grid
- Modal overlays

See [`docs/Task-07-UI-Design-Guide.md`](./docs/Task-07-UI-Design-Guide.md) for complete design system.

---

## 🛠️ Technology Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Layout:** CSS Grid, Flexbox, Masonry
- **Icons:** Font Awesome 6
- **Testing:** Jest
- **Version Control:** Git & GitHub

---

## 🌐 Features Roadmap

### Implemented ✅
- Photo gallery with masonry layout
- Category filtering
- Search functionality
- Photo detail modal
- Responsive design

### Planned 🚧
- User authentication (registration/login)
- Backend API (Node.js + Express)
- Database integration (MongoDB)
- Photo upload functionality
- User profiles
- Collections/Boards
- Like and comment system

---

## 📖 Usage Guide

### Browsing Photos
1. Open the website
2. Scroll through the masonry grid
3. Click category buttons to filter
4. Use search bar to find specific photos

### Viewing Photo Details
1. Click any photo in the gallery
2. View full-size image
3. Read title, description, and metadata
4. Like, save, or download photo

### Uploading Photos (Future)
1. Click "Upload" button
2. Select photo file
3. Add title, description, and category
4. Submit upload

---

## 👥 Team

This project was developed as a university course project.

**Team Members:**
- [Your Name] - [Role]
- [Teammate Name] - [Role]

---

## 📄 License

This project is created for educational purposes as part of the Technology and Methodology course.

---

## 🙏 Acknowledgments

- **Unsplash** - Sample images
- **Font Awesome** - Icon library
- **Pinterest** - Design inspiration
- **Course Instructor** - Guidance and requirements

---

## 📞 Contact

For questions about this project, please contact:
- Email: your.email@university.edu
- GitHub: [@yourusername](https://github.com/yourusername)

---

## 🔗 Links

- **GitHub Repository:** https://github.com/yourusername/shutterly
- **Live Demo:** [Coming soon]
- **Documentation:** [docs/](./docs/)

---

**Made with ❤️ for the Technology and Methodology Course**

*Last Updated: November 2025*
