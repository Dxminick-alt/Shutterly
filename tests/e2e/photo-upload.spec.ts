import { test, expect } from '@playwright/test';

/**
 * E2E Test Suite: Photo Upload Functionality
 * Author: Dominic
 * Tests photo upload features including URL and file uploads
 */

test.describe('Photo Upload', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Login first
    await page.getByRole('button', { name: /sign up/i }).click();
    await page.getByPlaceholder(/username/i).fill('uploadtester');
    await page.getByPlaceholder(/email/i).fill('upload@test.com');
    await page.getByPlaceholder(/password/i).fill('Test123!');
    await page.getByRole('button', { name: /create account/i }).click();
    
    // Wait for main page to load
    await page.waitForSelector('nav');
  });

  test('should open upload modal when clicking upload button', async ({ page }) => {
    await page.getByRole('button', { name: /upload/i }).first().click();
    
    // Verify modal is visible
    await expect(page.getByText(/upload photo/i)).toBeVisible();
  });

  test('should upload photo via URL', async ({ page }) => {
    // Click upload button
    await page.getByRole('button', { name: /upload/i }).first().click();
    
    // Switch to URL mode
    await page.getByRole('button', { name: /image url/i }).click();
    
    // Fill in photo details
    await page.getByPlaceholder(/paste image url/i).fill('https://images.unsplash.com/photo-1506905925346-21bda4d32df4');
    await page.getByPlaceholder(/photo title/i).fill('Mountain Landscape');
    await page.getByPlaceholder(/description/i).fill('Beautiful mountain view');
    await page.getByPlaceholder(/tags/i).fill('nature, mountain, landscape');
    
    // Submit
    await page.getByRole('button', { name: /upload/i }).last().click();
    
    // Wait for modal to close
    await page.waitForTimeout(1000);
    
    // Verify photo appears in grid
    await expect(page.getByText('Mountain Landscape')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.getByRole('button', { name: /upload/i }).first().click();
    
    // Try to submit without filling anything
    await page.getByRole('button', { name: /upload/i }).last().click();
    
    // Modal should still be visible (validation failed)
    await expect(page.getByText(/upload photo/i)).toBeVisible();
  });

  test('should toggle between file and URL upload modes', async ({ page }) => {
    await page.getByRole('button', { name: /upload/i }).first().click();
    
    // Default should be file upload
    await expect(page.getByText(/upload from pc/i)).toBeVisible();
    
    // Switch to URL
    await page.getByRole('button', { name: /image url/i }).click();
    await expect(page.getByPlaceholder(/paste image url/i)).toBeVisible();
    
    // Switch back to file
    await page.getByRole('button', { name: /upload from pc/i }).click();
    await expect(page.getByText(/drag and drop/i).or(page.getByText(/choose file/i))).toBeVisible();
  });

  test('should close upload modal when clicking cancel', async ({ page }) => {
    await page.getByRole('button', { name: /upload/i }).first().click();
    
    // Click cancel or close button
    await page.getByRole('button', { name: /cancel/i }).click();
    
    // Modal should be closed
    await expect(page.getByText(/upload photo/i)).not.toBeVisible();
  });
});
