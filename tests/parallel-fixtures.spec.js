const { test: base, expect } = require('@playwright/test');

// Extend the base test to create a custom fixture
const test = base.extend({
  // This fixture automatically navigates to a page and accepts cookies
  preparedPage: async ({ page }, use) => {
    await page.goto('https://playwright.dev/');
    // Imagine clicking an "Accept Cookies" button here
    await use(page); // This hands the page over to the test
    // Anything after use() is teardown (runs after the test finishes)
  },
});

// Run all tests in this describe block at the exact same time
test.describe.configure({ mode: 'parallel' });

test.describe('Parallel Execution and Fixtures', () => {
  
  test('Test 1 running in parallel', async ({ preparedPage }) => {
    // preparedPage already went to the URL because of our fixture!
    await expect(preparedPage.getByText('Get started')).toBeVisible();
  });

  test('Test 2 running in parallel', async ({ preparedPage }) => {
    await expect(preparedPage).toHaveTitle(/Playwright/);
  });
});