// @ts-check
import { test, expect } from '@playwright/test';

test('should have the title "Login"', async ({ page }) => {
  // Replace with your URL where the login page is located
  await page.goto('http://localhost:3004');

  // Check if the page title is "Login"
  const title = await page.title();
  expect(title).toBe('Login');
});

test('test', async ({ page }) => {
  await page.goto('https://www.amazon.com/');

  const value=await page.getByRole('button', { name: 'Continue shopping' });
  if(await value.isVisible())
  {
    await value.click();
  }

  //await page.getByRole('button', { name: 'Submit' }).first().click();
  await page.locator('li:nth-child(3) > .nav-div').click();
  await page.getByRole('link', { name: 'Gift List Gift List Share' }).click();
  await page.locator('#legalTextRow').getByRole('link', { name: 'Conditions of Use' }).click();
});
test('should take a screenshot of the login button', async ({ page }) => {
  // Replace with your URL where the login page is located
  await page.goto('http://localhost:3004');

  // Locate the login button
  const loginButton = await page.locator('button[type="submit"]'); // Adjust the selector as needed

  // Take a screenshot of the login button and save it to a specific path
  await loginButton.screenshot({ path: 'login-button-screenshot.png' });

  // Optionally, you can assert that the screenshot was taken successfully
  expect(loginButton).toBeVisible(); // Just a basic visibility check, to ensure button is there before screenshot
});


test('should take a screenshot of the complete page', async ({ page }) => {
  // Replace with your URL where the login page or other page is located
  await page.goto('http://localhost:3004');

  // Take a screenshot of the entire page and save it to a specific path
  await page.screenshot({ path: 'full-page-screenshot.png', fullPage: true });

  // Optionally, you can add an assertion to check if the page has loaded successfully
  expect(await page.title()).toBe('Login'); // Replace with the actual title of the page
});

test('should have a clickable login button', async ({ page }) => {
  // Replace with your URL where the login page is located
  await page.goto('http://localhost:3004');

  // Check if the login button exists and is visible
  const loginButton = await page.locator('button[type="submit"]'); // Adjust the selector as needed
  await expect(loginButton).toBeVisible(); // Assert that the button is visible

  // Click the login button
  await loginButton.click();

  // Optionally, check if clicking the button leads to a successful login action
  // For example, you might check for a redirect or a page element after login
  // await expect(page).toHaveURL('https://example.com/dashboard');
});

test.skip('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test.skip('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
