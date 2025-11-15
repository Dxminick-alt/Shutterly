# Task #7: UI Design - Wireframes, Prototypes & Mockups

## Design Requirements

**Minimum:** 
- 3 pages total
- 1 wireframe per person
- 1 mockup per person

**Design Consistency:**
- Uniform color schemes
- Consistent fonts
- Cohesive visual elements

---

## Page Designs

### Page 1: Homepage / Gallery

#### Wireframe (Low-Fidelity)

```
┌─────────────────────────────────────────────────────────┐
│  [LOGO]  Shutterly     [Search Bar]      [Login] [Sign Up] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│         Discover Beautiful Photography                  │
│   Get inspired by millions of photos worldwide          │
│               [Start Exploring Button]                  │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ [All] [Nature] [Architecture] [Portrait] [Street]...    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────┐  ┌────────┐  ┌──────┐  ┌────────┐          │
│  │Photo │  │ Photo  │  │Photo │  │ Photo  │          │
│  │ 1    │  │   2    │  │ 3    │  │   4    │          │
│  └──────┘  ├────────┤  └──────┘  ├────────┤          │
│            │        │            │        │          │
│  ┌────────┐└────────┘  ┌────────┐└────────┘          │
│  │ Photo  │            │ Photo  │                    │
│  │   5    │            │   7    │                    │
│  ├────────┤            ├────────┤                    │
│  │        │            │        │                    │
│  └────────┘            └────────┘                    │
│                                                         │
│            [Load More Photos]                           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Mockup Features:
- **Hero Section:** Gradient background (purple/blue)
- **Photo Grid:** Pinterest-style masonry layout
- **Hover Effects:** Photos lift on hover with shadow
- **Category Pills:** Rounded buttons with icons

---

### Page 2: Photo Detail / Lightbox

#### Wireframe

```
┌─────────────────────────────────────────────────────────┐
│                         [X Close]                       │
│  ┌─────────────────┐   ┌─────────────────────────┐    │
│  │                 │   │  "Mountain Sunrise"      │    │
│  │                 │   │  By: John Doe            │    │
│  │                 │   │  Category: Nature        │    │
│  │   FULL SIZE     │   │                          │    │
│  │     PHOTO       │   │  Beautiful sunrise over  │    │
│  │                 │   │  the mountains in...     │    │
│  │                 │   │                          │    │
│  │                 │   │  [♡ Save] [⬇ Download]  │    │
│  └─────────────────┘   │  [⎋ Share]              │    │
│                        │                          │    │
│                        │  👁 1,234 views          │    │
│                        │  ♡ 89 likes              │    │
│                        │                          │    │
│                        │  Comments (5)            │    │
│                        │  ┌─────────────────────┐│    │
│                        │  │ Comment 1...         ││    │
│                        │  └─────────────────────┘│    │
│                        │  ┌─────────────────────┐│    │
│                        │  │ Add comment...      ││    │
│                        │  └─────────────────────┘│    │
│                        └─────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

#### Mockup Features:
- **Modal Overlay:** Semi-transparent dark background
- **Image Display:** Large, centered photo
- **Sidebar:** White panel with details
- **Action Buttons:** Icon + text buttons
- **Social Stats:** Eye and heart icons with counts

---

### Page 3: User Profile

#### Wireframe

```
┌─────────────────────────────────────────────────────────┐
│  [LOGO]  Shutterly     [Search Bar]      [Profile] [▼]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌────┐   John Doe                                     │
│  │    │   john.doe@email.com                           │
│  │ 👤 │   Landscape photographer from...               │
│  │    │                                                │
│  └────┘   [Edit Profile]                               │
│                                                         │
│  ┌────────┬────────┬────────┐                         │
│  │   24   │  1.2K  │  543   │                         │
│  │ Photos │ Likes  │ Views  │                         │
│  └────────┴────────┴────────┘                         │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  [My Uploads] [Liked Photos] [Collections]              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────┐  ┌────────┐  ┌──────┐  ┌────────┐          │
│  │Photo │  │ Photo  │  │Photo │  │ Photo  │          │
│  │ 1    │  │   2    │  │ 3    │  │   4    │          │
│  └──────┘  └────────┘  └──────┘  └────────┘          │
│                                                         │
│  ┌────────┐  ┌──────┐  ┌────────┐                     │
│  │ Photo  │  │Photo │  │ Photo  │                     │
│  │   5    │  │ 6    │  │   7    │                     │
│  └────────┘  └──────┘  └────────┘                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Mockup Features:
- **Profile Header:** Avatar, name, bio
- **Statistics Cards:** Number highlights
- **Tab Navigation:** My Uploads, Liked, Collections
- **Photo Grid:** User's content in masonry layout

---

## Design System

### Color Palette

**Primary Colors:**
- Primary Red: `#E60023` (Pinterest-inspired)
- Dark Gray: `#111111`
- Text: `#333333`

**Secondary Colors:**
- Light Background: `#F5F5F5`
- White: `#FFFFFF`
- Border: `#E0E0E0`

**Accent Colors:**
- Success: `#4CAF50`
- Error: `#F44336`
- Info: `#2196F3`

**Gradients:**
- Hero: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Button Hover: `linear-gradient(135deg, #cc001f 0%, #e60023 100%)`

---

### Typography

**Font Family:**
- Primary: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif`
- Headings: Same, bold weight
- Body: Same, regular weight

**Font Sizes:**
- H1 (Hero): 48px
- H2 (Section): 32px
- H3 (Card): 24px
- Body: 16px
- Small: 14px
- Tiny: 12px

**Font Weights:**
- Regular: 400
- Medium: 500
- Semi-Bold: 600
- Bold: 700

---

### Spacing

**Padding/Margin Scale:**
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px

---

### Border Radius

- Small buttons: 8px
- Large buttons: 24px
- Cards: 16px
- Inputs: 24px (rounded pills)

---

### Shadows

**Elevation Levels:**
- Level 1: `0 2px 8px rgba(0,0,0,0.1)`
- Level 2: `0 4px 12px rgba(0,0,0,0.15)`
- Level 3: `0 8px 24px rgba(0,0,0,0.15)`

---

### Components

#### Buttons

**Primary Button:**
- Background: `#E60023`
- Color: White
- Padding: 12px 24px
- Border Radius: 24px
- Font Weight: 600
- Hover: Opacity 0.9

**Secondary Button:**
- Background: `#F5F5F5`
- Color: `#333333`
- Same padding/radius as primary

#### Input Fields

- Border: 2px solid `#E0E0E0`
- Border Radius: 24px
- Padding: 12px 20px
- Focus: Border color changes to primary red

#### Category Pills

- Background: `#F5F5F5`
- Padding: 10px 24px
- Border Radius: 24px
- Active: Dark background `#111111`, white text

---

## Tools for Design

### Recommended Tools

1. **Figma** (https://figma.com)
   - Free tier available
   - Collaborative design
   - Component libraries
   - Export to PNG/SVG

2. **Canva** (https://canva.com)
   - Easy to use
   - Templates available
   - Free version sufficient

3. **Penpot** (https://penpot.app)
   - Open-source alternative to Figma
   - Free and privacy-focused

4. **Adobe XD** (Trial available)
   - Professional tool
   - Prototyping features

---

## Creating Wireframes

### Wireframe Checklist
- [ ] Use grayscale (no colors)
- [ ] Focus on layout and structure
- [ ] Label all sections
- [ ] Show navigation flow
- [ ] Indicate interactive elements
- [ ] Keep it simple (boxes and lines)

### Tools for Wireframes
- Balsamiq Wireframes
- Figma (low-fidelity mode)
- draw.io
- Paper and pencil (scan/photo)

---

## Creating Mockups

### Mockup Checklist
- [ ] Apply full color scheme
- [ ] Use actual fonts
- [ ] Include real images (or placeholders)
- [ ] Add shadows and effects
- [ ] Show hover states
- [ ] Include icons
- [ ] Make it pixel-perfect

### High-Fidelity Design
- Use design system colors
- Apply typography rules
- Add visual hierarchy
- Include micro-interactions
- Show loading states

---

## Prototyping

### Interactive Prototype Features
- Click navigation between pages
- Button hover effects
- Modal open/close
- Tab switching
- Form interactions

### Figma Prototyping
1. Select frame
2. Click "Prototype" tab
3. Connect frames with arrows
4. Define interactions (click, hover)
5. Preview prototype

---

## Responsive Design

### Breakpoints
- Mobile: 320px - 767px
- Tablet: 768px - 1024px
- Desktop: 1025px+

### Mobile Considerations
- Larger touch targets (min 44px)
- Simplified navigation
- Stack vertically
- Reduce columns in grid
- Collapse menus

---

## Deliverables for Task #7

### Required Files

1. **Wireframes/**
   - `wireframe-homepage.png`
   - `wireframe-photo-detail.png`
   - `wireframe-user-profile.png`

2. **Mockups/**
   - `mockup-homepage.png`
   - `mockup-photo-detail.png`
   - `mockup-user-profile.png`

3. **Design System**
   - `design-system.pdf` or Figma link

### File Organization
```
shutterly/
├── ui-designs/
│   ├── wireframes/
│   │   ├── homepage.png
│   │   ├── photo-detail.png
│   │   └── user-profile.png
│   ├── mockups/
│   │   ├── homepage.png
│   │   ├── photo-detail.png
│   │   └── user-profile.png
│   └── design-system.pdf
```

---

## Checklist for Task #7

- [ ] Create wireframes for 3 pages (low-fidelity)
- [ ] Create mockups for 3 pages (high-fidelity)
- [ ] Define color palette
- [ ] Define typography system
- [ ] Create design system document
- [ ] Ensure visual uniformity across designs
- [ ] Export all designs as PNG/PDF
- [ ] Save to `ui-designs/` folder
- [ ] Upload to GitHub
- [ ] Document design decisions

---

## References

1. Cooper, A., Reimann, R., & Cronin, D. (2014). *About Face: The Essentials of Interaction Design*. Wiley.
2. Nielsen, J. (2000). *Designing Web Usability*. New Riders.
3. Tidwell, J., Brewer, C., & Valencia, A. (2020). *Designing Interfaces* (3rd ed.). O'Reilly.
4. Google Material Design Guidelines: https://material.io/design
5. Apple Human Interface Guidelines: https://developer.apple.com/design/
