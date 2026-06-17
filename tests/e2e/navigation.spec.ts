import { test, expect, Page } from '@playwright/test';

test.describe('Navigation & Core Flows', () => {
  test('should navigate to the home page and see the hero section', async ({ page, isMobile }: { page: Page; isMobile: boolean }) => {
    await page.goto('/');
    
    // Verify the hero text
    await expect(page.locator('h1')).toContainText('Namma Living');
    await expect(page.locator('text=Luxury Redefined')).toBeVisible();
    
    // Verify Navbar links
    const navLinks = ['Indiranagar', 'HSR Layout', 'Koramangala', 'Whitefield'];
    if (!isMobile) {
      for (const link of navLinks) {
        await expect(page.locator(`nav a:has-text("${link}")`)).toBeVisible();
      }
    }
  });

  test('should navigate to the admin login page from the Sign In button', async ({ page, isMobile }: { page: Page; isMobile: boolean }) => {
    await page.goto('/');
    
    if (isMobile) {
      // Sign In is hidden on mobile layout, so we navigate directly to test the page
      await page.goto('/auth/login');
    } else {
      const signInBtn = page.locator('a:has-text("Sign In")');
      await signInBtn.click();
    }
    
    await expect(page).toHaveURL(/.*\/auth\/login/);
    await expect(page.locator('h1')).toContainText('Administrator Login');
  });
});
