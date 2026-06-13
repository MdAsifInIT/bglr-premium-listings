import { test, expect } from '@playwright/test';

test.describe('Admin Flow', () => {
  test('should protect the admin dashboard and redirect to login', async ({ page }) => {
    await page.goto('/admin');
    
    // Should be redirected to auth login because user is not authenticated
    await expect(page).toHaveURL(/.*\/auth\/login\?redirect=\/admin/);
    
    // Check if the login form is present
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });
});
