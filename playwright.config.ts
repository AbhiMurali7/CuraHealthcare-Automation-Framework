// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  workers: process.env["CI"] ? 2 : 4, // ← bracket notation bypasses TS check
  fullyParallel: false,
  retries: process.env["CI"] ? 2 : 0,

  reporter: [
    ["list"],
    ["allure-playwright"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],

  use: {
    baseURL: "https://katalon-demo-cura.herokuapp.com",
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },

  projects: [
    // Setup chain
    {
      name: "1-login",
      testMatch: "**/login.spec.ts",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "2-home",
      testMatch: "**/home.spec.ts",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["1-login"],
    },
    {
      name: "3-appointment",
      testMatch: "**/appointment.spec.ts",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["2-home"],
    },
    {
      name: "4-confirmation",
      testMatch: "**/confirmation.spec.ts",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["3-appointment"],
    },
    {
      name: "5-history",
      testMatch: "**/history.spec.ts",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["4-confirmation"],
    },
    {
      name: "6-logout",
      testMatch: "**/logout.spec.ts",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["5-history"],
    },

    // Browser projects run the full chain
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["6-logout"],
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      dependencies: ["6-logout"],
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
      dependencies: ["6-logout"],
    },
  ],
});
