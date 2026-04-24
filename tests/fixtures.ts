import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { AppointmentPage } from "../pages/AppointmentPage";
import { ConfirmationPage } from "../pages/ConfirmationPage";
import { HistoryPage } from "../pages/HistoryPage";
import { NavigationPage } from "../pages/NavigationPage";

type Fixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  appointmentPage: AppointmentPage;
  confirmationPage: ConfirmationPage;
  historyPage: HistoryPage;
  navigationPage: NavigationPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => await use(new LoginPage(page)),
  homePage: async ({ page }, use) => await use(new HomePage(page)),
  appointmentPage: async ({ page }, use) =>
    await use(new AppointmentPage(page)),
  confirmationPage: async ({ page }, use) =>
    await use(new ConfirmationPage(page)),
  historyPage: async ({ page }, use) => await use(new HistoryPage(page)),
  navigationPage: async ({ page }, use) => await use(new NavigationPage(page)),
});

export { expect } from "@playwright/test";
