import { test, expect } from '@playwright/test';

test.describe('Demo sample listings', () => {
  test('should render a demo listing detail page without database records', async ({ page, isMobile }) => {
    await page.goto('/property/11111111-1111-4111-8111-111111111111');

    await expect(page.locator('h1')).toContainText('Skyline Penthouse at UB City');
    await expect(page.getByText('Demo')).toBeVisible();
    await expect(page.getByText('Namma Living Concierge')).toBeVisible();
    await expect(page.getByRole('button', { name: isMobile ? /Inquire Now/i : /Connect on WhatsApp/i })).toBeVisible();
  });
});
