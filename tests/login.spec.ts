import { test, expect } from './fixtures';
import { credentials } from '../utils/testData';

test.describe('LOGIN MODULE', () => {

  // ✅ Positive Test Cases
  test('Valid Login', async ({ page, loginPage }) => {
    await page.goto('/profile.php#login');
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveURL(/appointment/);
  });

  test('Login With Enter Key', async ({ page, loginPage }) => {
    await page.goto('/profile.php#login');
    await loginPage.loginWithEnter(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveURL(/appointment/);
  });

  test('Login Page Title', async ({ page }) => {
    await page.goto('/profile.php#login');
    await expect(page).toHaveTitle(/CURA Healthcare Service/i);
  });

  test('Login Form Elements Visible', async ({ page, loginPage }) => {
    await page.goto('/profile.php#login');
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  // ❌ Negative Test Cases
  test('Invalid Password Shows Error', async ({ page, loginPage }) => {
    await page.goto('/profile.php#login');
    await loginPage.login(credentials.invalidPass.username, credentials.invalidPass.password);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveURL(/profile\.php/);
  });

  test('Invalid Username Shows Error', async ({ page, loginPage }) => {
    await page.goto('/profile.php#login');
    await loginPage.login(credentials.invalidUser.username, credentials.invalidUser.password);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveURL(/profile\.php/);
  });

  test('Both Fields Invalid Shows Error', async ({ page, loginPage }) => {
    await page.goto('/profile.php#login');
    await loginPage.login(credentials.bothInvalid.username, credentials.bothInvalid.password);
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('Empty Username and Password', async ({ page, loginPage }) => {
    await page.goto('/profile.php#login');
    await loginPage.login(credentials.emptyBoth.username, credentials.emptyBoth.password);
    // Stays on login page — no navigation
    await expect(page).toHaveURL(/profile\.php/);
  });

  test('Empty Password Only', async ({ page, loginPage }) => {
    await page.goto('/profile.php#login');
    await loginPage.login(credentials.emptyPass.username, credentials.emptyPass.password);
    await expect(page).toHaveURL(/profile\.php/);
  });

  test('Already Logged In Redirects to Appointment', async ({ page, loginPage }) => {
    // Login once
    await page.goto('/profile.php#login');
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveURL(/appointment/);

    // Try to visit login page again
    await page.goto('/profile.php#login');
    // Should redirect away or show profile — not show login form
    await expect(loginPage.loginButton).not.toBeVisible();
  });

  test('Password Field Is Masked', async ({ page, loginPage }) => {
    await page.goto('/profile.php#login');
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });

  test('Username Field Accepts Text Input', async ({ page, loginPage }) => {
    await page.goto('/profile.php#login');
    await loginPage.usernameInput.fill(credentials.validUser.username);
    await expect(loginPage.usernameInput).toHaveValue(credentials.validUser.username);
  });

});