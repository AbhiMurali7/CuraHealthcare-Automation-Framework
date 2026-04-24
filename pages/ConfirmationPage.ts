import { BasePage } from './BasePage';

export class ConfirmationPage extends BasePage {
  // Each field has its own unique ID — use those directly
  readonly facilityValue      = this.page.locator('p#facility');
  readonly readmissionValue   = this.page.locator('p#hospital_readmission');
  readonly programValue       = this.page.locator('p#program');
  readonly dateValue          = this.page.locator('p#visit_date');
  readonly commentValue       = this.page.locator('p#comment');
  readonly homeButton         = this.page.getByRole('link', { name: 'Go to Homepage' });
}