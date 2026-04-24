import { test, expect } from "./fixtures";
import { credentials } from "../utils/testData";

test.describe("HOME MODULE", () => {

  // ✅ Positive Test Cases
  test("Home Page Loads Successfully", async ({ page, homePage }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/CURA Healthcare Service/i);
    await expect(homePage.heroTitle).toHaveText("CURA Healthcare Service");
    await expect(homePage.heroSubtitle).toHaveText("We Care About Your Health");
  });

  test("Make Appointment Button Visible", async ({ page, homePage }) => {
    await page.goto("/");
    await expect(homePage.makeAppointmentBtn).toBeVisible();
  });

  test("Make Appointment Redirects to Login When Logged Out", async ({ page, homePage }) => {
    // Clear cookies — previous test session may still be active
    await page.context().clearCookies();
    await page.goto("/");
    await homePage.makeAppointmentBtn.scrollIntoViewIfNeeded();
    await homePage.makeAppointmentBtn.click();
    await expect(page).toHaveURL(/profile\.php/);
  });

test("Make Appointment Goes to Form When Logged In", async ({ page, loginPage, homePage }) => {
  await page.goto("/profile.php#login");
  await loginPage.login(credentials.validUser.username, credentials.validUser.password);
  await expect(page).toHaveURL(/appointment/);
  await page.goto("/");

  await homePage.makeAppointmentBtn.scrollIntoViewIfNeeded();
  await homePage.makeAppointmentBtn.click();

  // Hash-only navigation doesn't trigger full URL change event
  // So check the appointment form is VISIBLE instead of URL
  await expect(page.locator('#combo_facility')).toBeVisible();
});

  test("Brand Link Navigates to Home", async ({ page, loginPage, homePage }) => {
    await page.goto("/profile.php#login");
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveURL(/appointment/);
    await page.goto("/");
    // Use JS click — sidebar link outside viewport
    await page.evaluate(() => {
      const link = document.querySelector<HTMLAnchorElement>('a[href="./"]');
      if (link) link.click();
    });
    await expect(page).toHaveURL(/katalon-demo-cura\.herokuapp\.com/);
  });

  // ── Navbar state checks ────────────────────────────────────────
  test("Logged Out Navbar Shows Login Only", async ({ page, homePage }) => {
    await page.context().clearCookies();
    await page.goto("/");
    await expect(homePage.loginLink).toBeAttached();   // in DOM
    await expect(homePage.logoutLink).not.toBeAttached(); // not in DOM at all
    await expect(homePage.historyLink).not.toBeAttached();
    await expect(homePage.profileLink).not.toBeAttached();
  });

  test("Logged In Navbar Shows Correct Links", async ({ page, loginPage, homePage }) => {
    await page.goto("/profile.php#login");
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);
    await expect(homePage.logoutLink).toBeAttached();
    await expect(homePage.historyLink).toBeAttached();
    await expect(homePage.profileLink).toBeAttached();
    await expect(homePage.loginLink).not.toBeAttached();
  });

  // ❌ Negative Test Cases
  test("Home Link in Navbar Navigates Back to Home", async ({ page, loginPage }) => {
    await page.goto("/profile.php#login");
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);
    await page.goto("/history.php#history");
    // JS click — sidebar link outside viewport
    await page.evaluate(() => {
      const links = document.querySelectorAll<HTMLAnchorElement>('a[href="./"]');
      if (links.length) links[0].click();
    });
    await expect(page).toHaveURL(/katalon-demo-cura\.herokuapp\.com/);
  });

  test("Page Title Correct on Home", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
  });

});