const { test, expect } = require('@playwright/test');

test.describe('Intermediate UI Components & Alerts - DemoQA', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/');
  });

  test.skip('1. Handle JS Alert - Accept', async ({ page }) => {
    page.on('dialog', dialog => {
      expect(dialog.message()).toBe('You clicked a button');
      dialog.accept();
    });
    await page.click('text="Alerts"');
    await page.click('#alertButton');
    await expect(page.locator('#alertMessage')).toHaveText('You clicked a button');
  });

  test.skip('2. Handle JS Confirm - Dismiss', async ({ page }) => {
    page.on('dialog', dialog => dialog.dismiss());
    await page.click('text="Alerts"');
    await page.click('#confirmButton');
    await expect(page.locator('#confirmMessage')).toHaveText('You selected Cancel');
  });

  test.skip('3. Handle JS Prompt - Input Text', async ({ page }) => {
    page.on('dialog', dialog => dialog.accept('Playwright Rocks'));
    await page.click('text="Alerts"');
    await page.click('#promtButton');
    await expect(page.locator('#promptMessage')).toHaveText('You entered: Playwright Rocks');
  });

  test.skip('4. Interact with IFrame', async ({ page }) => {
    await page.click('text="Frames"');
    await page.click('text="iFrame"');
    const frame = page.frameLocator('#frame1');
    
    await frame.locator('#tinymce').click();
    
    await page.keyboard.press('ControlOrMeta+A');
    await page.keyboard.press('Backspace');
    
    await page.keyboard.insertText('Writing inside an iframe!');
    
    await expect(frame.locator('#tinymce')).toContainText('Writing inside an iframe!');
  });

  test.skip('5. Hover over elements', async ({ page }) => {
    await page.click('text="Tool Tips"');
    const toolTipButton = page.locator('#toolTipButton');
    await toolTipButton.hover();
    await expect(page.locator('.tooltip-inner')).toHaveText('You hovered over the Button');
  });

  test('6. Drag and Drop', async ({ page }) => {
    await page.click('text="Droppable"');
    await page.dragAndDrop('#draggable', '#droppable');
    await expect(page.locator('#droppable')).toHaveText('Dropped!');
  });

  test('7. Select from Dropdown', async ({ page }) => {
    await page.click('text="Select Menu"');
    await page.locator('#oldSelectMenu').selectOption('2');
    await expect(page.locator('#oldSelectMenu')).toHaveValue('2');
  });

  test('8. Handle Checkboxes', async ({ page }) => {
    await page.click('text="Checkboxes"');
    const checkbox1 = page.locator('#checkbox1');
    const checkbox2 = page.locator('#checkbox2');
    await checkbox1.check();
    await checkbox2.uncheck();
    await expect(checkbox1).toBeChecked();
    await expect(checkbox2).not.toBeChecked();
  });

  test('9. Dynamic Loading - Wait for element', async ({ page }) => {
    await page.click('text="Dynamic Properties"');
    await page.click('#enableAfter');
    await expect(page.locator('#enableAfter')).toBeEnabled();
  });

  test('10. File Upload', async ({ page }) => {
    await page.click('text="Upload and Download"');
    await page.locator('#uploadFile').setInputFiles({
      name: 'test.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('this is a test')
    });
    await page.click('#submitButton');
    await expect(page.locator('#uploadedFilePath')).toContainText('test.txt');
  });
});