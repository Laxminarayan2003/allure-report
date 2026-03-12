import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/');
  await page.getByRole('link', { name: 'Dynamic ID' }).click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('link', { name: 'Resources' }).click();

  await expect(page).toHaveTitle("Resources");
});

test('test2', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/');
  await page.getByRole('link', { name: 'Class Attribute' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Button' }).first().click();
  await expect(page).toHaveTitle("Class Attribute")
});

test('test3', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/');
  await page.getByRole('link', { name: 'Verify Text' }).click();
  await page.getByRole('link', { name: 'Resources' }).click();
  await page.getByRole('link', { name: 'Test Pyramid' }).click();
  await expect(page.getByRole('heading', { name: 'Test Pyramid' })).toBeVisible();
});

test('test4', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/');
  await page.getByRole('link', { name: 'Load Delay' }).click();
  await page.goto('http://uitestingplayground.com/loaddelay');
  await page.getByRole('link', { name: 'Resources' }).click();
  await page.getByRole('link', { name: 'w3schools.com' }).click();
  await page.getByRole('textbox', { name: 'Search our tutorials' }).click();
    await page.getByRole('textbox', { name: 'Search our tutorials' }).fill('playwright');  
});

test('test5', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/');
  await page.getByRole('link', { name: 'AJAX Data' }).click();
  await page.getByRole('link', { name: 'Resources' }).click();
  await page.getByRole('link', { name: 'MDN' }).click();

  await expect(page).toHaveTitle("MDN Web Docs");
});

test('test6', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/');
  await page.getByRole('link', { name: 'Click' }).click();
  await page.getByRole('link', { name: 'Resources' }).click();
  await page.getByRole('link', { name: 'Test Pyramid' }).click();
  await expect(page).toHaveTitle("Test Pyramid");
});