# E2E Tests for Shutterly

This directory contains End-to-End (E2E) tests for the Shutterly photo-sharing platform using Playwright.

## Test Suites

### 1. Authentication Tests (`auth.spec.ts`)
**Author:** Youssef

Tests user authentication functionality:
- Display login page on initial load
- User signup with valid credentials
- User login with existing account
- Error handling for invalid credentials

### 2. Photo Upload Tests (`photo-upload.spec.ts`)
**Author:** Dominic

Tests photo upload features:
- Opening upload modal
- Uploading photos via URL
- Form validation for required fields
- Toggle between file and URL upload modes
- Cancel/close upload modal

### 3. Photo Interaction Tests (`photo-interactions.spec.ts`)
**Author:** Mustafa

Tests photo interaction features:
- Like and unlike photos
- Add comments to photos
- Save photos to collections
- Delete uploaded photos
- Open and close photo modals
- Navigate through photo details

### 4. Search and Navigation Tests (`search-navigation.spec.ts`)

Tests search and navigation functionality:
- Search photos by keyword
- Clear search results
- Navigate to user profile
- Toggle dark/light theme
- Navigate between different sections

## Running the Tests

### Run all E2E tests:
```bash
npm run test:e2e
```

### Run tests in UI mode (interactive):
```bash
npm run test:e2e:ui
```

### Run tests in headed mode (see browser):
```bash
npm run test:e2e:headed
```

### View test report:
```bash
npm run test:e2e:report
```

### Run specific test file:
```bash
npx playwright test auth.spec.ts
```

### Run tests in specific browser:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Configuration

The tests are configured in `playwright.config.ts` with:
- **Base URL:** http://localhost:3000
- **Browsers:** Chromium, Firefox, WebKit
- **Automatic server start:** Tests automatically start the dev server
- **Screenshots:** Captured on failure
- **Traces:** Recorded on first retry

## Prerequisites

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

3. Make sure the app runs locally:
```bash
npm run dev
```

## Writing New Tests

Follow the existing test structure:
1. Import test and expect from `@playwright/test`
2. Add author information in comments
3. Use `test.describe()` for grouping related tests
4. Use `test.beforeEach()` for common setup
5. Write descriptive test names
6. Use Playwright's locator strategies (role, placeholder, text, etc.)

## CI/CD Integration

These tests can be integrated into your GitHub Actions workflow for continuous testing on every push.

## Troubleshooting

- **Tests timing out:** Increase timeout in playwright.config.ts
- **Elements not found:** Check selector strategies and wait times
- **Server not starting:** Ensure port 3000 is available
- **Browser installation issues:** Run `npx playwright install` again

## Team Members

- **Youssef** - Authentication tests
- **Dominic** - Photo upload tests
- **Mustafa** - Photo interaction tests
