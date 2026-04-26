# 🏥 CuraHealthcare Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Allure](https://img.shields.io/badge/Allure-FF6B6B?style=for-the-badge&logo=qameta&logoColor=white)

End-to-end test automation framework for [CURA Healthcare Service](https://katalon-demo-cura.herokuapp.com) built with **Playwright + TypeScript** using **Page Object Model (POM)** and **Fixtures** pattern.

---

## 📁 Project Structure

```
CuraHealthcare-Automation-Framework/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD pipeline
├── pages/
│   ├── BasePage.ts                 # Base class for all pages
│   ├── LoginPage.ts                # Login page POM
│   ├── HomePage.ts                 # Home page POM
│   ├── AppointmentPage.ts          # Appointment booking POM
│   ├── ConfirmationPage.ts         # Booking confirmation POM
│   ├── HistoryPage.ts              # Appointment history POM
│   └── NavigationPage.ts           # Navbar / sidebar POM
├── tests/
│   ├── fixtures.ts                 # Custom Playwright fixtures
│   ├── login.spec.ts               # Login module tests
│   ├── home.spec.ts                # Home module tests
│   ├── appointment.spec.ts         # Appointment module tests
│   ├── confirmation.spec.ts        # Confirmation module tests
│   ├── history.spec.ts             # History module tests
│   ├── navigation.spec.ts          # Navigation module tests
│   └── logout.spec.ts              # Logout module tests
├── utils/
│   └── testData.ts                 # Test data (credentials, appointment data)
├── playwright.config.ts            # Local dev config
├── playwright.ci.config.ts         # CI/CD config with ordered projects
├── package.json
└── tsconfig.json
```

---

## 🧪 Test Coverage

| Module | Tests | Type |
|---|---|---|
| Login | 12 | Positive + Negative |
| Home | 9 | Positive + Negative |
| Appointment | 7 | Positive + Negative |
| Confirmation | 4 | Positive + Negative |
| History | 5 | Positive + Negative |
| Navigation | 7 | Positive + Negative |
| Logout | 4 | Positive + Negative |
| **Total** | **48+** | |

---

## ⚙️ Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev) | Browser automation |
| [TypeScript](https://www.typescriptlang.org) | Type-safe test code |
| [Allure](https://allurereport.org) | Test reporting |
| [GitHub Actions](https://github.com/features/actions) | CI/CD pipeline |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 24+
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/AbhiMurali7/CuraHealthcare-Automation-Framework.git
cd CuraHealthcare-Automation-Framework

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps
```

---

## ▶️ Running Tests

```bash
# Run all tests (local config)
npx playwright test

# Run specific module
npx playwright test login.spec.ts
npx playwright test appointment.spec.ts

# Run with browser visible
npx playwright test --headed

# Run in specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run in CI order (with dependencies)
npx playwright test --config=playwright.ci.config.ts

# Debug mode
npx playwright test --debug

# Run specific test by name
npx playwright test -g "Valid Login"
```

---

## 📊 Reports

### Playwright HTML Report
```bash
npx playwright show-report
```

### Allure Report
```bash
# Generate
npx allure generate allure-results --clean -o allure-report

# Open
npx allure open allure-report
```

---

## 🏗️ Architecture

### Page Object Model (POM)

Each page has its own class extending `BasePage`:

```typescript
export class LoginPage extends BasePage {
  readonly usernameInput = this.page.locator('#txt-username');
  readonly passwordInput = this.page.locator('#txt-password');
  readonly loginButton   = this.page.locator('#btn-login');

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

### Fixtures

All page objects are injected via Playwright fixtures:

```typescript
export const test = base.extend<Fixtures>({
  loginPage:        async ({ page }, use) => await use(new LoginPage(page)),
  homePage:         async ({ page }, use) => await use(new HomePage(page)),
  appointmentPage:  async ({ page }, use) => await use(new AppointmentPage(page)),
  confirmationPage: async ({ page }, use) => await use(new ConfirmationPage(page)),
  historyPage:      async ({ page }, use) => await use(new HistoryPage(page)),
  navigationPage:   async ({ page }, use) => await use(new NavigationPage(page)),
});
```

### CI Execution Order

Tests run in strict module order in CI using Playwright project dependencies:

```
1-login → 2-home → 3-appointment → 4-confirmation → 5-history → 6-logout
                                                                      ↓
                                              chromium + firefox + webkit (cross-browser)
```

---

## 🔄 CI/CD Pipeline

Runs automatically on:
- Push to `main` / `develop`
- Pull requests to `main`
- Daily schedule at 9AM UTC

```yaml
- Install Node 24
- Install dependencies
- Install Playwright browsers
- Run tests (ordered + cross-browser)
- Upload HTML report artifact
- Upload Allure results artifact
```

Artifacts are retained for **14 days** and downloadable from the GitHub Actions run.

---

## 🌐 Application Under Test

**CURA Healthcare Service** — [https://katalon-demo-cura.herokuapp.com](https://katalon-demo-cura.herokuapp.com)

| Credential | Value |
|---|---|
| Username | `John Doe` |
| Password | `ThisIsNotAPassword` |

---

## 📝 Key Design Decisions

- **Bootstrap datepicker** requires `$(wrapper).datepicker('setDate', date)` — plain `fill()` won't update internal state, causing silent form submission failures
- **Sidebar navigation** links are off-screen at `x:1185` — `#menu-toggle` must be clicked first before interacting with logout/history/profile links
- **Hash navigation** (`#appointment`) doesn't trigger Playwright's URL change events — assert element visibility instead of URL for same-page hash navigation
- **`form.submit()`** is used instead of button click to bypass Bootstrap datepicker popup overlay blocking pointer events

---

## 👤 Author

**Abinaya Murali**  
[GitHub](https://github.com/AbhiMurali7)
