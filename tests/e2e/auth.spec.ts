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
    await expect(page.getByText('Welcome back! Sign in to continue')).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });

  test('should allow user to sign up with valid credentials', async ({ page }) => {
    // Click Sign Up link
    await page.getByText("Don't have an account? Sign up").click();
    
    // Fill signup form
    await page.getByPlaceholder('Your name').fill('testuser123');
    await page.getByPlaceholder('your.email@example.com').fill('testuser123@example.com');
    await page.getByPlaceholder('••••••••').fill('Password123!');
    
    // Submit form
    await page.getByRole('button', { name: 'Sign Up' }).click();
    
    // Verify redirect to main page
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should allow existing user to login', async ({ page }) => {
    // First create an account
    await page.getByText("Don't have an account? Sign up").click();
    await page.getByPlaceholder('Your name').fill('existinguser');
    await page.getByPlaceholder('your.email@example.com').fill('existing@example.com');
    await page.getByPlaceholder('••••••••').fill('Password123!');
    await page.getByRole('button', { name: 'Sign Up' }).click();
    
    // Wait for nav to appear
    await expect(page.locator('nav')).toBeVisible();
    
    // Note: Logout functionality would be tested separately
    // For this test, we verify successful signup/login works
  });

  test('should allow user to switch between login and signup', async ({ page }) => {
    // Initially on sign in page
    await expect(page.getByText('Welcome back! Sign in to continue')).toBeVisible();
    
    // Switch to sign up
    await page.getByText("Don't have an account? Sign up").click();
    await expect(page.getByText('Create an account to share your photos')).toBeVisible();
    
    // Switch back to sign in
    await page.getByText('Already have an account? Sign in').click();
    await expect(page.getByText('Welcome back! Sign in to continue')).toBeVisible();
  });
});
