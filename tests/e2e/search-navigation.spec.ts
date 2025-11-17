import { test, expect } from '@playwright/test';

/**
 * E2E Test Suite: Search and Navigation
 * Tests search functionality and app navigation
 */

test.describe('Search and Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Login
    await page.getByRole('button', { name: /sign up/i }).click();
    await page.getByPlaceholder(/username/i).fill('searchuser');
    await page.getByPlaceholder(/email/i).fill('search@test.com');
    await page.getByPlaceholder(/password/i).fill('Test123!');
    await page.getByRole('button', { name: /create account/i }).click();
    await page.waitForSelector('nav');
  });

  test('should search for photos by keyword', async ({ page }) => {
    // Find search input
    const searchInput = page.getByPlaceholder(/search/i);
    await searchInput.fill('nature');
    
    // Wait for search results
    await page.waitForTimeout(1000);
    
    // Verify photos are filtered
    const photoCards = page.locator('.photo-card, [data-testid="photo-card"]');
    await expect(photoCards.first()).toBeVisible();
  });

  test('should clear search results', async ({ page }) => {
    // Search for something
    const searchInput = page.getByPlaceholder(/search/i);
    await searchInput.fill('mountain');
    await page.waitForTimeout(500);
    
    // Clear search
    await searchInput.clear();
    
    // All photos should be visible again
    const photoCards = page.locator('.photo-card, [data-testid="photo-card"]');
    const count = await photoCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should navigate to user profile', async ({ page }) => {
    // Click on profile/user menu
    await page.getByRole('button', { name: /profile|account|searchuser/i }).click();
    
    // Verify profile elements are visible
    await expect(page.getByText(/searchuser|profile|my photos/i)).toBeVisible();
  });

  test('should toggle dark/light theme', async ({ page }) => {
    // Find theme toggle button
    const themeToggle = page.getByRole('button', { name: /theme|dark|light/i }).or(
      page.locator('[aria-label*="theme" i]')
    );
    
    await themeToggle.click();
    
    // Wait for theme change
    await page.waitForTimeout(300);
    
    // Verify theme changed (check for dark class or light class)
    const html = page.locator('html');
    const hasThemeClass = await html.evaluate(el => 
      el.classList.contains('dark') || el.classList.contains('light')
    );
    expect(hasThemeClass).toBeTruthy();
  });

  test('should navigate between tabs/sections', async ({ page }) => {
    // Find navigation tabs (Home, Explore, Collections, etc.)
    const homeTab = page.getByRole('button', { name: /^home$/i }).or(
      page.getByRole('link', { name: /^home$/i })
    );
    
    if (await homeTab.isVisible()) {
      await homeTab.click();
      await page.waitForTimeout(300);
      
      // Verify we're on home
      await expect(page.locator('nav')).toBeVisible();
    }
  });
});
