// playwright.ci.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  workers: 2,
  fullyParallel: false,
  retries: 2,

  reporter: [
    ["list"],
    ["allure-playwright", { outputFolder: "allure-results" }],
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["github"],   // ← directly here, no spread, no ternary
  ],

  use: {
    baseURL:    "https://katalon-demo-cura.herokuapp.com",
    headless:   true,
    screenshot: "only-on-failure",
    video:      "retain-on-failure",
    trace:      "retain-on-failure",
  },

  projects: [
    { name: "1-login",        testMatch: "**/login.spec.ts" },
    { name: "2-home",         testMatch: "**/home.spec.ts",         dependencies: ["1-login"] },
    { name: "3-appointment",  testMatch: "**/appointment.spec.ts",  dependencies: ["2-home"] },
    { name: "4-confirmation", testMatch: "**/confirmation.spec.ts", dependencies: ["3-appointment"] },
    { name: "5-history",      testMatch: "**/history.spec.ts",      dependencies: ["4-confirmation"] },
    { name: "6-logout",       testMatch: "**/logout.spec.ts",       dependencies: ["5-history"] },
    { name: "chromium",       use: { ...devices["Desktop Chrome"] },  dependencies: ["6-logout"] },
    { name: "firefox",        use: { ...devices["Desktop Firefox"] }, dependencies: ["6-logout"] },
    { name: "webkit",         use: { ...devices["Desktop Safari"] },  dependencies: ["6-logout"] },
  ],
});