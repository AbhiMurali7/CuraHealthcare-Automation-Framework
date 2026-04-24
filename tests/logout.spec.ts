import { test, expect } from './fixtures';
import { credentials } from '../utils/testData';

test.describe('LOGOUT MODULE', () => {

  test('Logout Clears Session', async ({ page, loginPage, navigationPage }) => {
    await page.goto('/profile.php#login');
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveURL(/appointment/);

    await navigationPage.logout(); // ← opens sidebar then clicks logout
    await page.waitForURL(/katalon-demo-cura\.herokuapp\.com\/?/);

    await expect(navigationPage.loginLink).toBeAttached();
    await expect(navigationPage.logoutLink).not.toBeAttached();
  });

  test('Cannot Access Appointment After Logout', async ({ page, loginPage, navigationPage }) => {
    await page.goto('/profile.php#login');
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);

    await navigationPage.logout();
    await page.waitForURL(/katalon-demo-cura\.herokuapp\.com\/?/);

    await page.goto('/#appointment');
    await page.waitForTimeout(1000);
    await expect(page.locator('#btn-book-appointment')).not.toBeVisible();
  });

  test('Cannot Access History After Logout', async ({ page, loginPage, navigationPage }) => {
    await page.goto('/profile.php#login');
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);

    await navigationPage.logout();
    await page.waitForURL(/katalon-demo-cura\.herokuapp\.com\/?/);

    await page.goto('/history.php#history');
    await page.waitForTimeout(1000);
    await expect(page).not.toHaveURL(/history\.php/);
  });

  test('Re-Login After Logout Works', async ({ page, loginPage, navigationPage }) => {
    await page.goto('/profile.php#login');
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);

    await navigationPage.logout();
    await page.waitForURL(/katalon-demo-cura\.herokuapp\.com\/?/);

    await page.goto('/profile.php#login');
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveURL(/appointment/);
  });

});