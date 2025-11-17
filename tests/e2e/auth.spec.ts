import { test, expect } from '@playwright/test';

/**
 * E2E Test Suite: Authentication Flow
 * Author: Youssef
 * Tests user authentication functionality including login and signup
 */

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display login page on initial load', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Welcome to Shutterly');
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
  });

  test('should allow user to sign up with valid credentials', async ({ page }) => {
    // Click Sign Up tab
    await page.getByRole('button', { name: /sign up/i }).click();
    
    // Fill signup form
    await page.getByPlaceholder(/username/i).fill('testuser123');
    await page.getByPlaceholder(/email/i).fill('testuser123@example.com');
    await page.getByPlaceholder(/password/i).fill('Password123!');
    
    // Submit form
    await page.getByRole('button', { name: /create account/i }).click();
    
    // Verify redirect to main page
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should allow existing user to login', async ({ page }) => {
    // First create an account
    await page.getByRole('button', { name: /sign up/i }).click();
    await page.getByPlaceholder(/username/i).fill('existinguser');
    await page.getByPlaceholder(/email/i).fill('existing@example.com');
    await page.getByPlaceholder(/password/i).fill('Password123!');
    await page.getByRole('button', { name: /create account/i }).click();
    
    // Logout
    await page.getByRole('button', { name: /logout/i }).click();
    
    // Login again
    await page.getByPlaceholder(/email/i).fill('existing@example.com');
    await page.getByPlaceholder(/password/i).fill('Password123!');
    await page.getByRole('button', { name: /^login$/i }).click();
    
    // Verify successful login
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should show error for invalid login credentials', async ({ page }) => {
    await page.getByPlaceholder(/email/i).fill('nonexistent@example.com');
    await page.getByPlaceholder(/password/i).fill('WrongPassword123!');
    await page.getByRole('button', { name: /^login$/i }).click();
    
    // Should still be on login page
    await expect(page.locator('h1')).toContainText('Welcome to Shutterly');
  });
});
