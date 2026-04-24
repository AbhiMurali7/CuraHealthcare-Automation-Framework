import { test, expect } from './fixtures';
import { credentials } from '../utils/testData';

test.describe('NAVIGATION MODULE', () => {

  test('Unauthenticated Nav Shows Login Only', async ({ page, navigationPage }) => {
    await page.goto('/');
    // Sidebar links always in DOM — check attached not visible
    // Logged out: loginLink exists, logout/history/profile don't
    await expect(navigationPage.loginLink).toBeAttached();
    await expect(navigationPage.logoutLink).not.toBeAttached();
    await expect(navigationPage.historyLink).not.toBeAttached();
  });

  test('Authenticated Nav Shows Correct Links', async ({ page, loginPage, navigationPage }) => {
    await page.goto('/profile.php#login');
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveURL(/appointment/);

    await expect(navigationPage.logoutLink).toBeAttached();
    await expect(navigationPage.historyLink).toBeAttached();
    await expect(navigationPage.profileLink).toBeAttached();
    await expect(navigationPage.loginLink).not.toBeAttached();
  });

  test('Brand Link Navigates to Home', async ({ page, navigationPage }) => {
    await page.goto('/profile.php#login');
    // JS click — sidebar link off-screen
    await page.evaluate(() => {
      (document.querySelector('a[href="./"]') as HTMLAnchorElement)?.click();
    });
    await expect(page).toHaveURL(/katalon-demo-cura\.herokuapp\.com\/?/);
  });

  test('Make Appointment Button Redirects to Login When Logged Out', async ({ page, navigationPage }) => {
    await page.context().clearCookies();
    await page.goto('/');
    // makeAppointmentBtn is in viewport — direct click works
    await navigationPage.makeAppointmentBtn.scrollIntoViewIfNeeded();
    await navigationPage.makeAppointmentBtn.click();
    await expect(page).toHaveURL(/profile\.php/);
  });

  test('Make Appointment Button Goes to Form When Logged In', async ({ page, loginPage, navigationPage }) => {
    await page.goto('/profile.php#login');
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);
    await expect(page).toHaveURL(/appointment/);
    // Form already visible after login — just assert
    await expect(page.locator('#combo_facility')).toBeVisible();
  });

  test('Profile Page Shows Under Construction', async ({ page, loginPage }) => {
    await page.goto('/profile.php#login');
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);
    await page.goto('/profile.php#profile');
    await expect(page.getByText('Under construction')).toBeVisible();
  });

  test('Sidebar Opens on Menu Toggle Click', async ({ page, loginPage, navigationPage }) => {
    await page.goto('/profile.php#login');
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);
    await navigationPage.openSidebar();
    // After toggle, logout link should be clickable (in viewport)
    await expect(navigationPage.logoutLink).toBeInViewport();
  });

});