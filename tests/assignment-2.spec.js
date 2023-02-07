// @ts-check
const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

const formData = {
  name: "Joe Duncko",
  address: "123 Main St",
  city: "Chicago",
  state: "Ohio",
  zip: "60606",
  email: "joe@joeduncko.com",
  employees: "9382709",
  phone: "123-456-7890",
  website: "https://joeduncko.com",
};

test.describe("Assignment 2", () => {
  test("Should submit and show all items", async ({ page }) => {
    const nameInput = page.getByLabel("Name");
    expect.soft(await nameInput.getAttribute("required")).toBe("");
    await nameInput.fill(formData.name);

    const addressInput = page.getByLabel("Address");
    expect.soft(await addressInput.getAttribute("required")).toBe("");
    await addressInput.fill(formData.address);

    const cityInput = page.getByLabel("City");
    expect.soft(await cityInput.getAttribute("required")).toBe("");
    await cityInput.fill(formData.city);

    const stateInput = page.getByLabel("State");
    await stateInput.selectOption(formData.state);

    const zipInput = page.getByLabel("Zip");
    expect.soft(await zipInput.getAttribute("required")).toBe("");
    await zipInput.fill(formData.zip);

    const emailInput = page.getByLabel("Email");
    expect.soft(await emailInput.getAttribute("required")).toBe("");
    expect.soft(await emailInput.getAttribute("type")).toBe("email");
    await emailInput.fill(formData.email);

    const employeesInput = page.getByLabel("Employees");
    expect.soft(await employeesInput.getAttribute("required")).toBe(null);
    expect.soft(await employeesInput.getAttribute("type")).toBe("number");
    await employeesInput.fill(formData.employees);

    const phoneInput = page.getByLabel("Phone");
    expect.soft(await phoneInput.getAttribute("required")).toBe(null);
    expect.soft(await phoneInput.getAttribute("type")).toBe("tel");
    await phoneInput.fill(formData.phone);

    const websiteInput = page.getByLabel("Website");
    expect.soft(await websiteInput.getAttribute("required")).toBe(null);
    expect.soft(await websiteInput.getAttribute("type")).toBe("url");
    await websiteInput.fill(formData.website);

    const subscribeCheckbox = page.getByLabel("Subscribe");
    expect.soft(await subscribeCheckbox.getAttribute("type")).toBe("checkbox");
    await subscribeCheckbox.check();

    const resetButton = page.getByText("Reset");
    expect.soft(await resetButton.getAttribute("type")).toBe("reset");

    const submitButton = page.getByText("Submit");
    expect.soft(await submitButton.getAttribute("type")).toBe("submit");
    await submitButton.click();

    await expect.soft(page).toHaveURL("/form");

    const name = page.getByText(formData.name);
    await expect.soft(name).toBeVisible();

    const address = page.getByText(formData.address);
    await expect.soft(address).toBeVisible();

    const city = page.getByText(formData.city);
    await expect.soft(city).toBeVisible();

    const state = page.getByText(/Ohio|ohio|OH/);
    await expect.soft(state).toBeVisible();

    const zip = page.getByText(formData.zip);
    await expect.soft(zip).toBeVisible();

    const email = page.getByText(formData.email);
    await expect.soft(email).toBeVisible();

    const employees = page.getByText(formData.employees);
    await expect.soft(employees).toBeVisible();

    const phone = page.getByText(formData.phone);
    await expect.soft(phone).toBeVisible();

    const website = page.getByText(formData.website);
    await expect.soft(website).toBeVisible();

    page.getByText("Yes");
  });

  test("Should pass w3 validation", async ({ page }) => {
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
});
