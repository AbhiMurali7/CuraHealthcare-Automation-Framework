import { BasePage } from './BasePage';

export class NavigationPage extends BasePage {
  // ── Sidebar toggle ────────────────────────────────────────────
  readonly menuToggle         = this.page.locator('#menu-toggle');

  // ── All sidebar links (off-screen — need menuToggle first) ────
  readonly logoutLink         = this.page.locator('a[href*="authenticate.php?logout"]');
  readonly historyLink        = this.page.locator('a[href="history.php#history"]');
  readonly profileLink        = this.page.locator('a[href="profile.php#profile"]');
  readonly loginLink          = this.page.locator('a[href="profile.php#login"]');

  // ── Always in viewport ────────────────────────────────────────
  readonly makeAppointmentBtn = this.page.locator('#btn-make-appointment');
  readonly brandLink          = this.page.locator('a[href="./"]').first();

  // ── Sidebar open → click link ─────────────────────────────────
  async openSidebar() {
    await this.menuToggle.click();
    await this.page.waitForTimeout(400); // sidebar slide animation
  }

  async logout() {
    await this.openSidebar();
    await this.logoutLink.click();
  }
}