// @ts-check
const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

const testLinks = async (page) => {
  const originalPage = page.url();

  // Disabling the header check because getting the header by the banner role doesn't work
  // const header = page.getByRole("banner"); // header

  const nav = page.getByRole("navigation");

  const homeLink = nav.getByRole("link", { name: "Home" });
  homeLink.click();
  await expect.soft(page).toHaveURL("/index.html");

  await page.goto(originalPage);
  await expect.soft(page).toHaveURL(originalPage);

  const aboutLink = nav.getByText("About");
  aboutLink.click();
  await expect.soft(page).toHaveURL("/about.html");

  await page.goto(originalPage);
  await expect.soft(page).toHaveURL(originalPage);

  const contactLink = nav.getByText("Contact");
  contactLink.click();
  await expect.soft(page).toHaveURL("/contact.html");

  await page.goto(originalPage);
  await expect.soft(page).toHaveURL(originalPage);
};

const testFooter = async (page) => {
  const footer = page.getByRole("contentinfo");
  await expect(footer.getByText("2023")).toBeVisible();
};

test.describe("Assignment 2", () => {
  test("Home should pass tests", async ({ page }) => {
    const title = await page.title();
    expect.soft(title).toContain("Home");

    await testLinks(page);
    await testFooter(page);

    const main = page.getByRole("main");
    await expect(main).toBeVisible();

    const h1 = main.getByRole("heading", { level: 1 });
    await expect.soft(h1).toBeVisible();

    // Not testing that these are in sections because apparently sections only get roles if they have a name
    // I didn't teach that in class, so I'm not going to test for it
    const h2s = await main.getByRole("heading", { level: 2 }).all();
    const paragraphs = await main.getByRole("paragraph").all();
    expect.soft(h2s).toHaveLength(3);
    expect.soft(paragraphs).toHaveLength(3);
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
    await page.goto("/about.html");
    await expect.soft(page).toHaveURL("/about.html");

    const title = await page.title();
    expect.soft(title).toContain("About");

    await testLinks(page);
    await testFooter(page);

    const main = page.getByRole("main");

    const h1 = main.getByRole("heading", { level: 1 });
    await expect.soft(h1).toBeVisible();

    const img = main.getByRole("img");
    await expect.soft(img).toBeVisible();
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
    await page.goto("/contact.html");
    await expect.soft(page).toHaveURL("/contact.html");

    const title = await page.title();
    expect.soft(title).toContain("Contact");

    await testLinks(page);
    await testFooter(page);

    const main = page.getByRole("main");

    const h1 = main.getByRole("heading", { level: 1 });
    await expect.soft(h1).toBeVisible();

    // Not testing that these are in a form because apparently forms only get roles if they have a name

    // Name input
    main.getByLabel("Name");

    // Email input
    const emailInput = page.getByLabel("Email");
    expect.soft(await emailInput.getAttribute("type")).toBe("email");

    // Message input
    const messageInput = main.getByLabel("Message");
    const messageInputNodeName = await messageInput.evaluate(
      (node) => node.nodeName
    );
    expect.soft(messageInputNodeName).toBe("TEXTAREA");

    // Submit button
    const submitButton = main.getByText(/send|submit/i);
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
