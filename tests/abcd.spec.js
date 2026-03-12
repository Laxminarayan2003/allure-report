import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/');
  await page.getByRole('link', { name: 'Practice Test Automation', exact: true }).click();
  await expect(page).toHaveTitle("Practice Test Automation | Learn Selenium WebDriver");
});

test('test1', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/');
  await page.getByRole('heading', { name: 'Hello' }).click();
  await expect(page.getByRole('heading',{name:'Hello'})).toBeVisible();
});

test('test3', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/');
  await page.getByRole('textbox', { name: 'Name *' }).click();
  await expect(page.getByRole('textbox', { name: 'Name *' })).toBeVisible();
});

test('test5', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'COURSES', exact: true }).click();
  const page1 = await page1Promise;
  await expect(page1).toHaveURL(/courses/); 
  const heading = await page1.locator('h1'); 
  await expect(heading).toBeVisible();
});

test('test7', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/');
  await page.getByRole('link', { name: 'Contact' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  const button=page.locator("#wpforms-submit-161");
  await expect(button).toBeVisible();

  
  //await expect(Submit).toBeEnabled();
//   await Submit.click();
  
//   await expect(page).toHaveURL(/contact/);
});

