import { test, expect } from './fixtures';
import { ConfirmationPage } from '../pages/ConfirmationPage';
import { appointmentData, credentials } from '../utils/testData';

test.describe('CONFIRMATION MODULE', () => {

  test('Validate All Fields', async ({ page, loginPage, appointmentPage, confirmationPage }) => {
    await page.goto('/profile.php#login');
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);

    await appointmentPage.bookAppointment(
      appointmentData.facility[0],
      appointmentData.program[0],
      appointmentData.validDate,
      appointmentData.comment
    );

    await confirmationPage.facilityValue.waitFor({ state: 'visible' });
    await expect(confirmationPage.facilityValue).toHaveText(appointmentData.facility[0]);
    await expect(confirmationPage.programValue).toHaveText(appointmentData.program[0]);
    await expect(confirmationPage.dateValue).toHaveText(appointmentData.validDate);
    await expect(confirmationPage.commentValue).toHaveText(appointmentData.comment);
  });

  test('Navigation After Confirmation', async ({ page, loginPage, appointmentPage, confirmationPage }) => {
    await page.goto('/profile.php#login');
    await loginPage.login(credentials.validUser.username, credentials.validUser.password);

    await appointmentPage.bookAppointment(
      appointmentData.facility[0],
      appointmentData.program[0],
      appointmentData.validDate,
      appointmentData.comment
    );

    await confirmationPage.facilityValue.waitFor({ state: 'visible' });
    await confirmationPage.homeButton.click();
    await expect(page).toHaveURL(/katalon-demo-cura\.herokuapp\.com\/?$/);
  });

  test('Direct URL Access Without Booking', async ({ page }) => {
    await page.goto('/appointment.php#summary');
    await page.waitForTimeout(1000);
    // No active booking session — server redirects away from summary
    await expect(page).not.toHaveURL(/appointment\.php/);
  });

  test('Data Tampering via URL', async ({ page }) => {
    await page.goto('/appointment.php?facility=Fake#summary');
    await page.waitForTimeout(1000);
    // GET params ignored on POST-only route — redirects away
    await expect(page).not.toHaveURL(/appointment\.php/);
  });

});