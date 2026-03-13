const { test, expect } = require('@playwright/test');

test.describe('Authentication Management', () => {
  test.describe.configure({ mode: 'serial' });
  test('1. Login and save state', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    
    // Save the cookies and local storage to a file
    await page.context().storageState({ path: 'playwright/.auth/user.json' });
  });

  test.describe('Tests that require login', () => {
    // Tell this specific block to use the saved authentication state
    test.use({ storageState: 'playwright/.auth/user.json' });

    test('2. Verify secure area without logging in again', async ({ page }) => {
      // Because we injected the storageState, we can go straight to the secure page!
      await page.goto('https://the-internet.herokuapp.com/secure');
      await expect(page.locator('h2')).toContainText('Secure Area');
    });
  });
});