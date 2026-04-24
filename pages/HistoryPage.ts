import { BasePage } from './BasePage';

export class HistoryPage extends BasePage {
  readonly historySection      = this.page.locator('#history');
  readonly noAppointmentText   = this.page.locator('#history p').filter({ hasText: 'No appointment' });
  readonly historyItems        = this.page.locator('#history .panel');

  // Scoped to first panel — date is in panel-heading, not p#visit_date
  readonly firstItemDate       = this.page.locator('#history .panel').first().locator('.panel-heading');
  readonly firstItemFacility   = this.page.locator('#history .panel').first().locator('p#facility');
  readonly firstItemReadmission= this.page.locator('#history .panel').first().locator('p#hospital_readmission');
  readonly firstItemProgram    = this.page.locator('#history .panel').first().locator('p#program');
  readonly firstItemComment    = this.page.locator('#history .panel').first().locator('p#comment');
}