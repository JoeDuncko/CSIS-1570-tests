// @ts-check
const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Assignment 2", () => {
  test("Home should pass tests", async ({ page }) => {
    const title = await page.title();
    expect.soft(title).toContain("Home");

    // TODO:
    // Enforce there's a site name in the header - and is not an h1
    // Enforce that the nav is in the header
    // Enforce name and year in the footer
    // Enforce that all three links are in the nav
    // Enforce that all three links work
    // Copy this pattern for the other pages
    const header = page.getByRole("banner"); // header
    const nav = page.getByRole("navigation"); // nav
    page.getByRole("main"); // main
    page.getByRole("contentinfo"); // footer

    // TODO: make sure the heading is in the main
    page.getByRole("heading", { name: "Home" });

    // TODO: Look for the 3 sections, each with a secondary heading and a paragraph
  });

  test("Home should pass w3 validation", async ({ page }) => {
    const newURL = `https://validator.w3.org/nu/?&doc=${page.url()}`;

    await page.goto(newURL);

    await expect.soft(page).toHaveURL(newURL);

    expect
      .soft(
        page.getByText(
          "Document checking completed. No errors or warnings to show.",
          { exact: false }
        )
      )
      .toBeVisible({ timeout: 10000 });
  });

  test("About should pass tests", async ({ page }) => {
    // TODO: use clicks to get here instead
    await page.goto("/about.html");
    await expect.soft(page).toHaveURL("/about.html");

    const title = await page.title();
    expect.soft(title).toContain("About");

    page.getByRole("heading", { name: "About" });

    // TODO: make sure heading and image are in the main

    // TODO: copy the pattern from the home page

    // TODO: enforce image works
  });

  test("About should pass w3 validation", async ({ page }) => {
    const newURL = `https://validator.w3.org/nu/?&doc=${page.url()}/about.html`;

    await page.goto(newURL);

    await expect.soft(page).toHaveURL(newURL);

    expect
      .soft(
        page.getByText(
          "Document checking completed. No errors or warnings to show.",
          { exact: false }
        )
      )
      .toBeVisible({ timeout: 10000 });
  });

  test("Contact should pass tests", async ({ page }) => {
    // TODO: use clicks to get here instead
    await page.goto("/contact.html");
    await expect.soft(page).toHaveURL("/contact.html");

    const title = await page.title();
    expect.soft(title).toContain("Contact");

    page.getByRole("heading", { name: "Contact" });

    // TODO: make sure heading and form are in the main

    // TODO: Make sure the form exists and these inputs are in there

    // Name input
    page.getByLabel("Name");

    // Email input
    const emailInput = page.getByLabel("Email");
    expect.soft(await emailInput.getAttribute("type")).toBe("email");

    // Message input
    const messageInput = page.getByLabel("Message");
    const messageInputNodeName = await messageInput.evaluate(
      (node) => node.nodeName
    );
    expect.soft(messageInputNodeName).toBe("TEXTAREA");

    // Submit button
    const submitButton = page.getByText("Submit");
    expect.soft(await submitButton.getAttribute("type")).toBe("submit");
  });

  test("Contact should pass w3 validation", async ({ page }) => {
    const newURL = `https://validator.w3.org/nu/?&doc=${page.url()}/contact.html`;

    await page.goto(newURL);

    await expect.soft(page).toHaveURL(newURL);

    expect
      .soft(
        page.getByText(
          "Document checking completed. No errors or warnings to show.",
          { exact: false }
        )
      )
      .toBeVisible({ timeout: 10000 });
  });
});

// TODO
// Enforce Favicon
//
