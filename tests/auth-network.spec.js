const { test, expect } = require("@playwright/test");

test.describe("Auth, Network & Advanced Concepts", () => {
  test("1. Basic Authentication via URL", async ({ page }) => {
    // Injecting credentials directly into the URL
    await page.goto(
      "https://admin:admin@the-internet.herokuapp.com/basic_auth",
    );
    await expect(page.locator("p")).toContainText(
      "Congratulations! You must have the proper credentials.",
    );
  });

  test("2. Form Based Auth - Success", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
    await page.fill("#username", "tomsmith");
    await page.fill("#password", "SuperSecretPassword!");
    await page.click('button[type="submit"]');
    await expect(page.locator("#flash")).toContainText(
      "You logged into a secure area!",
    );
  });

  test("3. Form Based Auth - Failure", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
    await page.fill("#username", "wronguser");
    await page.fill("#password", "wrongpassword");
    await page.click('button[type="submit"]');
    await expect(page.locator("#flash")).toContainText(
      "Your username is invalid!",
    );
  });

  test.skip("4. Intercept & Mock Network Request", async ({ page }) => {
    // Intercept API call and return mock data
    await page.route("**/api/users/2", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ data: { first_name: "MockedName" } }),
      });
    });
    await page.goto("https://reqres.in/");

    // Scroll to the element and use user-facing text locators
    const singleUserButton = page.getByText("Single user", { exact: true });
    await singleUserButton.scrollIntoViewIfNeeded();
    await singleUserButton.click();

    await expect(page.locator(".response")).toContainText("MockedName");
  });

  test.skip("5. Wait for specific API response", async ({ page }) => {
    await page.goto("https://reqres.in/");

    const listUsersButton = page.getByText("List users", { exact: true });
    await listUsersButton.scrollIntoViewIfNeeded();

    // Start waiting for the response before clicking
    const responsePromise = page.waitForResponse("**/api/users?page=2");
    await listUsersButton.click();

    const response = await responsePromise;
    expect(response.status()).toBe(200);
  });

  test("6. Handle File Download", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/download");
    const downloadPromise = page.waitForEvent("download");
    // Click the first download link
    await page.locator(".example a").first().click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBeTruthy();
  });

  test("7. Multiple Windows/Tabs", async ({ context }) => {
    const page = await context.newPage();
    await page.goto("https://the-internet.herokuapp.com/windows");
    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      page.click('text="Click Here"'),
    ]);
    await newPage.waitForLoadState();
    await expect(newPage.locator("h3")).toHaveText("New Window");
  });

  test("8. Evaluate JS in Browser Context", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    const documentTitle = await page.evaluate(() => document.title);
    expect(documentTitle).toBe("The Internet");
  });

  test("9. Set Local Storage to bypass UI", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    await page.evaluate(() => {
      localStorage.setItem("testKey", "testValue");
    });
    const storageValue = await page.evaluate(() =>
      localStorage.getItem("testKey"),
    );
    expect(storageValue).toBe("testValue");
  });

  test("10. Take Element Screenshot", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    const content = page.locator("#content");
    // Takes a screenshot of just the specific element
    await content.screenshot({ path: "element-screenshot.png" });
    const fs = require("fs");
    expect(fs.existsSync("element-screenshot.png")).toBeTruthy();
  });
});