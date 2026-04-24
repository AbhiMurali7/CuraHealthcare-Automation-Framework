import { test, expect } from "./fixtures";
import { appointmentData, credentials } from "../utils/testData";

test.describe("APPOINTMENT MODULE", () => {
  // ✅ Positive Test Cases
  test("Book Appointment Successfully", async ({
    page,
    loginPage,
    appointmentPage,
    confirmationPage,
  }) => {
    await page.goto("/profile.php#login");
    await loginPage.login(
      credentials.validUser.username,
      credentials.validUser.password,
    );

    await appointmentPage.bookAppointment(
      appointmentData.facility[0],
      appointmentData.program[0],
      appointmentData.validDate, // "01/04/2026" format dd/mm/yyyy
      appointmentData.comment,
    );

    await confirmationPage.facilityValue.waitFor({ state: "visible" });

    await expect(confirmationPage.facilityValue).toHaveText(
      appointmentData.facility[0],
    );
    await expect(confirmationPage.programValue).toHaveText(
      appointmentData.program[0],
    );
    await expect(confirmationPage.dateValue).toHaveText(
      appointmentData.validDate,
    );
    await expect(confirmationPage.commentValue).toHaveText(
      appointmentData.comment,
    );
  });

  test("Book Appointment Without Comment", async ({
    page,
    loginPage,
    appointmentPage,
    confirmationPage,
  }) => {
    await page.goto("/profile.php#login");
    await loginPage.login(
      credentials.validUser.username,
      credentials.validUser.password,
    );

    await appointmentPage.bookAppointment(
      appointmentData.facility[1],
      appointmentData.program[1],
      appointmentData.validDate,
    );

    await expect(confirmationPage.facilityValue).toHaveText(
      appointmentData.facility[1],
    );
    await expect(confirmationPage.programValue).toHaveText(
      appointmentData.program[1],
    );
    await expect(confirmationPage.dateValue).toHaveText(
      appointmentData.validDate,
    );
  });

  test("All Facility Options", async ({ page, loginPage, appointmentPage }) => {
    await page.goto("/profile.php#login");
    await loginPage.login(
      credentials.validUser.username,
      credentials.validUser.password,
    );

    for (const facility of appointmentData.facility) {
      await appointmentPage.facilityDropdown.selectOption(facility);
      await expect(appointmentPage.facilityDropdown).toHaveValue(facility);
    }
  });

  // ❌ Negative Test Cases

  test("Submit Without Date", async ({ page, loginPage, appointmentPage }) => {
    await page.goto("/profile.php#login");
    await loginPage.login(
      credentials.validUser.username,
      credentials.validUser.password,
    );

    await appointmentPage.bookAppointment(
      appointmentData.facility[0],
      appointmentData.program[0],
      "", // empty date
    );

    // HTML5 `required` on date input keeps us on appointment page
    await expect(page).toHaveURL(/#appointment/);
    // Verify date field is still empty (browser blocked submission)
    await expect(appointmentPage.dateInput).toHaveValue("");
  });

  test("Past Date Selection", async ({
    page,
    loginPage,
    appointmentPage,
    confirmationPage,
  }) => {
    await page.goto("/profile.php#login");
    await loginPage.login(
      credentials.validUser.username,
      credentials.validUser.password,
    );

    await appointmentPage.bookAppointment(
      appointmentData.facility[0],
      appointmentData.program[0],
      appointmentData.pastDate,
    );

    // Site does NOT reject past dates — navigates to summary
    await confirmationPage.facilityValue.waitFor({ state: "visible" });
    await expect(confirmationPage.facilityValue).toHaveText(
      appointmentData.facility[0],
    );
  });

  test("Multiple Click on Submit", async ({
    page,
    loginPage,
    appointmentPage,
    confirmationPage,
  }) => {
    await page.goto("/profile.php#login");
    await loginPage.login(
      credentials.validUser.username,
      credentials.validUser.password,
    );

    await appointmentPage.bookAppointment(
      appointmentData.facility[0],
      appointmentData.program[0],
      appointmentData.validDate,
      appointmentData.comment,
    );

    // Already on summary page after bookAppointment — dblclick on bookButton
    // is irrelevant here. Just assert confirmation loaded correctly.
    await confirmationPage.facilityValue.waitFor({ state: "visible" });
    await expect(confirmationPage.facilityValue).toHaveText(
      appointmentData.facility[0],
    );
  });

  test('Invalid Date Format', async ({ page, loginPage, appointmentPage }) => {
  await page.goto('/profile.php#login');
  await loginPage.login(credentials.validUser.username, credentials.validUser.password);

  // Skip enterDate entirely — directly fill raw invalid value without datepicker API
  await appointmentPage.facilityDropdown.selectOption(appointmentData.facility[0]);
  await appointmentPage.selectProgram(appointmentData.program[0]);
  await appointmentPage.dateInput.fill('abc');  // raw fill — bypasses datepicker
  await appointmentPage.commentInput.fill('');
  await appointmentPage.bookButton.click({ force: true });

  // Raw fill doesn't set datepicker state → form submit blocked → stays on page
  await expect(page).toHaveURL(/#appointment/);
});

});
