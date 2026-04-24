import { test, expect } from './fixtures';
import { appointmentData, credentials } from '../utils/testData';

test.describe('HISTORY MODULE', () => {

  // ✅ Positive Test Cases
  test('History Visible After Booking', async ({ page, loginPage, appointmentPage, historyPage }) => {
    await page.goto('/profile.php#login');
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);

    await appointmentPage.bookAppointment(
      appointmentData.facility[0],
      appointmentData.program[0],
      appointmentData.validDate,
      appointmentData.comment
    );

    // Wait for summary to confirm booking completed
    await page.waitForURL(/appointment\.php#summary/);

    await page.goto('/history.php#history');
    await historyPage.historySection.waitFor({ state: 'visible' });

    // Poll until history items appear — server may need a moment to persist
    await expect(historyPage.historyItems).not.toHaveCount(0, { timeout: 10000 });
  });

  test('History Shows Correct Booking Details', async ({ page, loginPage, appointmentPage, historyPage }) => {
    await page.goto('/profile.php#login');
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);

    await appointmentPage.bookAppointment(
      appointmentData.facility[0],
      appointmentData.program[0],
      appointmentData.validDate,
      appointmentData.comment
    );

    await page.waitForURL(/appointment\.php#summary/);
    await page.goto('/history.php#history');
    await historyPage.historySection.waitFor({ state: 'visible' });
    await expect(historyPage.historyItems).not.toHaveCount(0, { timeout: 10000 });

    // Date is in panel-heading, not p#visit_date
    await expect(historyPage.firstItemDate).toHaveText(appointmentData.validDate);
    await expect(historyPage.firstItemFacility).toHaveText(appointmentData.facility[0]);
    await expect(historyPage.firstItemProgram).toHaveText(appointmentData.program[0]);
    await expect(historyPage.firstItemComment).toHaveText(appointmentData.comment);
  });

  test('History Accessible Only When Logged In', async ({ page }) => {
    await page.context().clearCookies(); // ensure logged out
    await page.goto('/history.php#history');
    await page.waitForTimeout(1000);
    await expect(page).not.toHaveURL(/history\.php/);
  });

  test('History Page URL Direct Access When Logged In', async ({ page, loginPage, historyPage }) => {
    await page.goto('/profile.php#login');
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);

    await page.goto('/history.php#history');
    await expect(page).toHaveURL(/history\.php/);
    await expect(historyPage.historySection).toBeVisible();
  });

  test('History Shows No Appointment When None Booked', async ({ page, loginPage, historyPage }) => {
    // Fresh login — no booking done in this test
    await page.context().clearCookies();
    await page.goto('/profile.php#login');
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);

    await page.goto('/history.php#history');
    await historyPage.historySection.waitFor({ state: 'visible' });

    // Site shows "No appointment." when history is empty
    await expect(historyPage.noAppointmentText).toBeVisible();
  });

});