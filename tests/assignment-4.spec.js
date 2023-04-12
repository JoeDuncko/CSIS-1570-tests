// @ts-check
const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Assignment 4", () => {
  test("Should look the same as the example", async ({ page }) => {
    await expect(page).toHaveScreenshot({
      fullPage: true,
    });
  });
});
