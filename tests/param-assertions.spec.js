const { test, expect } = require('@playwright/test');

// The data we want to parameterize
const searchData = ['Java', 'Python', 'JavaScript'];

test.describe('Parameterization and Advanced Assertions', () => {
  
  for (const item of searchData) {
    test(`Search test for ${item}`, async ({ page }) => {
      // 1. Go to Wikipedia instead of DuckDuckGo
      await page.goto('https://en.wikipedia.org/');
      
      // 2. Fill the Wikipedia search box
      await page.fill('input[name="search"]', item);
      
      // 3. Press Enter
      await page.keyboard.press('Enter');
      
      // 4. Wikipedia page titles usually look like "Java - Wikipedia"
      await expect(page).toHaveTitle(new RegExp(item, 'i'));
    });
  }

  test('Soft Assertions', async ({ page }) => {
    await page.goto('https://example.com');
    
    // I updated this to the CORRECT text so your test will pass!
    // If you change it back to 'Wrong Text', it will show you the soft failure behavior again.
    await expect.soft(page.locator('h1')).toHaveText('Example Domain'); 
    await expect.soft(page.locator('p').first()).toBeVisible();
  });

  test('Polling Assertions', async ({ page }) => {
    let counter = 0;
    await expect.poll(async () => {
      counter++;
      return counter;
    }, {
      message: 'Counter did not reach 5',
      timeout: 5000,
    }).toBe(5);
  });
});