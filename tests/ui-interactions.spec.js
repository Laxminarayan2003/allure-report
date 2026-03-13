const { test, expect } = require('@playwright/test');

test.describe('Intermediate UI Components & Alerts', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
  });

  test('1. Handle JS Alert - Accept', async ({ page }) => {
    page.on('dialog', dialog => {
      expect(dialog.message()).toBe('I am a JS Alert');
      dialog.accept();
    });
    await page.click('text="JavaScript Alerts"');
    await page.click('button[onclick="jsAlert()"]');
    await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
  });

  test('2. Handle JS Confirm - Dismiss', async ({ page }) => {
    page.on('dialog', dialog => dialog.dismiss());
    await page.click('text="JavaScript Alerts"');
    await page.click('button[onclick="jsConfirm()"]');
    await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
  });

  test('3. Handle JS Prompt - Input Text', async ({ page }) => {
    page.on('dialog', dialog => dialog.accept('Playwright Rocks'));
    await page.click('text="JavaScript Alerts"');
    await page.click('button[onclick="jsPrompt()"]');
    await expect(page.locator('#result')).toHaveText('You entered: Playwright Rocks');
  });

  test.skip('4. Interact with IFrame', async ({ page }) => {
    await page.click('text="Frames"');
    await page.click('text="iFrame"');
    const frame = page.frameLocator('#mce_0_ifr');
    
    await frame.locator('#tinymce').click();
    
    await page.keyboard.press('ControlOrMeta+A');
    await page.keyboard.press('Backspace');
    
    await page.keyboard.insertText('Writing inside an iframe!');
    
    await expect(frame.locator('#tinymce')).toContainText('Writing inside an iframe!');
  });

  test('5. Hover over elements', async ({ page }) => {
    await page.click('text="Hovers"');
    const userProfile = page.locator('.figure').first();
    await userProfile.hover();
    await expect(userProfile.locator('.figcaption h5')).toBeVisible();
    await expect(userProfile.locator('.figcaption h5')).toHaveText('name: user1');
  });

  test('6. Drag and Drop', async ({ page }) => {
    await page.click('text="Drag and Drop"');
    await page.dragAndDrop('#column-a', '#column-b');
    await expect(page.locator('#column-a header')).toHaveText('B');
  });

  test('7. Select from Dropdown', async ({ page }) => {
    await page.click('text="Dropdown"');
    await page.locator('#dropdown').selectOption('1');
    await expect(page.locator('#dropdown')).toHaveValue('1');
  });

  test('8. Handle Checkboxes', async ({ page }) => {
    await page.click('text="Checkboxes"');
    const checkbox1 = page.locator('#checkboxes input').nth(0);
    const checkbox2 = page.locator('#checkboxes input').nth(1);
    await checkbox1.check();
    await checkbox2.uncheck();
    await expect(checkbox1).toBeChecked();
    await expect(checkbox2).not.toBeChecked();
  });

  test('9. Dynamic Loading - Wait for element', async ({ page }) => {
    await page.click('text="Dynamic Loading"');
    await page.click('text="Example 1: Element on page that is hidden"');
    await page.click('#start button');
    // Playwright automatically waits for elements to be visible
    await expect(page.locator('#finish h4')).toHaveText('Hello World!', { timeout: 10000 });
  });

  test('10. File Upload', async ({ page }) => {
    await page.click('text="File Upload"');
    // Using a buffer to simulate a file upload without needing a local file
    await page.locator('#file-upload').setInputFiles({
      name: 'test.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('this is a test')
    });
    await page.click('#file-submit');
    await expect(page.locator('#uploaded-files')).toContainText('test.txt');
  });
});