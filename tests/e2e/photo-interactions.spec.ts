import { test, expect } from '@playwright/test';

/**
 * E2E Test Suite: Photo Interactions
 * Author: Mustafa
 * Tests photo interaction features including like, comment, save, and delete
 */

test.describe('Photo Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Create account and login
    await page.getByText("Don't have an account? Sign up").click();
    await page.getByPlaceholder('Your name').fill('interactionuser');
    await page.getByPlaceholder('your.email@example.com').fill('interaction@test.com');
    await page.getByPlaceholder('••••••••').fill('Test123!');
    await page.getByRole('button', { name: 'Sign Up' }).click();
    await page.waitForSelector('nav');
  });

  test('should like and unlike a photo', async ({ page }) => {
    // Find first photo and click on it
    const firstPhoto = page.locator('.photo-card, [data-testid="photo-card"]').first();
    await firstPhoto.click();
    
    // Wait for modal to open
    await page.waitForTimeout(500);
    
    // Click like button
    const likeButton = page.getByRole('button', { name: /like|heart/i }).first();
    await likeButton.click();
    
    // Verify like count increased (should show at least 1)
    await expect(page.locator('text=/\\d+\\s*(like|heart)/i')).toBeVisible();
    
    // Unlike
    await likeButton.click();
  });

  test('should add a comment to a photo', async ({ page }) => {
    // Click on first photo
    const firstPhoto = page.locator('.photo-card, [data-testid="photo-card"]').first();
    await firstPhoto.click();
    
    await page.waitForTimeout(500);
    
    // Find comment input and add comment
    const commentInput = page.getByPlaceholder(/add a comment|write a comment/i);
    await commentInput.fill('Great photo! This is an automated test comment.');
    
    // Submit comment
    await page.getByRole('button', { name: /post|submit|send/i }).click();
    
    // Verify comment appears
    await expect(page.getByText('Great photo! This is an automated test comment.')).toBeVisible();
  });

  test('should save photo to collection', async ({ page }) => {
    // Click on first photo
    const firstPhoto = page.locator('.photo-card, [data-testid="photo-card"]').first();
    await firstPhoto.click();
    
    await page.waitForTimeout(500);
    
    // Click save button
    await page.getByRole('button', { name: /save|bookmark/i }).first().click();
    
    // Wait for save modal or confirmation
    await page.waitForTimeout(500);
    
    // Verify save action (either modal appears or button changes state)
    const saveModal = page.getByText(/save to collection|create collection/i);
    await expect(saveModal.or(page.getByRole('button', { name: /saved/i }))).toBeVisible();
  });

  test('should delete own uploaded photo', async ({ page }) => {
    // First upload a photo
    await page.getByRole('button', { name: /upload/i }).first().click();
    await page.getByRole('button', { name: /image url/i }).click();
    await page.getByPlaceholder(/paste image url/i).fill('https://images.unsplash.com/photo-1469474968028-56623f02e42e');
    await page.getByPlaceholder(/photo title/i).fill('Test Delete Photo');
    await page.getByPlaceholder(/description/i).fill('This photo will be deleted');
    await page.getByRole('button', { name: /upload/i }).last().click();
    
    await page.waitForTimeout(1000);
    
    // Find and click on the uploaded photo
    await page.getByText('Test Delete Photo').click();
    
    await page.waitForTimeout(500);
    
    // Click delete button
    const deleteButton = page.getByRole('button', { name: /delete|trash/i });
    await deleteButton.click();
    
    // Confirm deletion if dialog appears
    page.on('dialog', dialog => dialog.accept());
    
    await page.waitForTimeout(500);
    
    // Verify photo is deleted (modal should close and photo shouldn't exist)
    await expect(page.getByText('Test Delete Photo')).not.toBeVisible();
  });

  test('should open and close photo modal', async ({ page }) => {
    // Click on first photo
    const firstPhoto = page.locator('.photo-card, [data-testid="photo-card"]').first();
    await firstPhoto.click();
    
    // Modal should be visible
    await page.waitForTimeout(500);
    await expect(page.locator('[role="dialog"], .modal')).toBeVisible();
    
    // Close modal (ESC key or close button)
    await page.keyboard.press('Escape');
    
    // Modal should be closed
    await expect(page.locator('[role="dialog"], .modal')).not.toBeVisible();
  });

  test('should navigate through photo details', async ({ page }) => {
    // Click on first photo
    const firstPhoto = page.locator('.photo-card, [data-testid="photo-card"]').first();
    await firstPhoto.click();
    
    await page.waitForTimeout(500);
    
    // Verify photo details are visible
    await expect(page.locator('img[alt]').or(page.locator('[role="img"]'))).toBeVisible();
    
    // Verify action buttons exist
    await expect(page.getByRole('button', { name: /like|heart/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /save|bookmark/i })).toBeVisible();
  });
});
