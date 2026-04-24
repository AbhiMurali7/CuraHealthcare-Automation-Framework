import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // ── Hero section ──────────────────────────────────────────────
  readonly heroTitle          = this.page.locator('header h1');
  readonly heroSubtitle       = this.page.locator('header h3');
  // Hero button — specific id, no ambiguity
  readonly makeAppointmentBtn = this.page.locator('#btn-make-appointment');

  // ── Navbar ─────────────────────────────────────────────────────
  // Sidebar drawer la irukku — use scrollIntoViewIfNeeded or navigate directly
  // These are in the TOP navbar (always visible), not sidebar
  readonly brandLink          = this.page.locator('.navbar-header a').first();
  readonly homeLink           = this.page.locator('#sidebar-wrapper a[href="./"]');

  // ── Navbar (logged OUT) ────────────────────────────────────────
  readonly loginLink          = this.page.locator('#sidebar-wrapper a[href="profile.php#login"]');

  // ── Navbar (logged IN) ─────────────────────────────────────────
  readonly logoutLink         = this.page.locator('a[href="authenticate.php?logout"]');
  readonly historyLink        = this.page.locator('a[href="history.php#history"]');
  readonly profileLink        = this.page.locator('a[href="profile.php#profile"]');
}