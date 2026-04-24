import { BasePage } from './BasePage';

export class AppointmentPage extends BasePage {
  readonly facilityDropdown   = this.page.locator('#combo_facility');
  readonly readmissionCheck   = this.page.locator('#chk_hospotal_readmission');
  readonly medicareRadio      = this.page.locator('#radio_program_medicare');
  readonly medicaidRadio      = this.page.locator('#radio_program_medicaid');
  readonly noneRadio          = this.page.locator('#radio_program_none');
  readonly dateInput          = this.page.locator('#txt_visit_date');
  readonly commentInput       = this.page.locator('#txt_comment');
  readonly bookButton         = this.page.locator('#btn-book-appointment');

  async selectProgram(program: string) {
    if (program === 'Medicare') await this.medicareRadio.check();
    if (program === 'Medicaid') await this.medicaidRadio.check();
    if (program === 'None')     await this.noneRadio.check();
  }

  async enterDate(date: string) {
  if (!date) return;

  // Check if it's a valid dd/mm/yyyy format before using datepicker API
  const isValidFormat = /^\d{2}\/\d{2}\/\d{4}$/.test(date);

  if (isValidFormat) {
    // Valid format — use Bootstrap datepicker API (sets internal state correctly)
    await this.page.evaluate((d: string) => {
      const wrapper = document.querySelector('[data-provide="datepicker"]');
      if (wrapper) (window as any).$(wrapper).datepicker('setDate', d);
    }, date);
  } else {
    // Invalid format — just fill input directly, skip datepicker API
    // datepicker internal state stays null → form won't submit → stays on page
    await this.dateInput.fill(date);
  }
}

  async dismissDatepicker() {
    await this.page.evaluate(() => {
      const picker = document.querySelector('.datepicker-dropdown');
      if (picker) (picker as HTMLElement).style.display = 'none';
    });
  }

  async bookAppointment(
    facility: string,
    program: string,
    date: string,
    comment = ''
  ) {
    await this.facilityDropdown.selectOption(facility);
    await this.selectProgram(program);
    await this.enterDate(date);
    await this.dismissDatepicker();
    await this.commentInput.fill(comment);

    if (date) {
      // ✅ Positive flow: form.submit() bypasses button overlay issues
      await this.page.evaluate(() => {
        (document.querySelector('form') as HTMLFormElement).submit();
      });
    } else {
      // ❌ Negative flow (empty date): click the button so HTML5 required
      // validation fires and keeps us on #appointment
      await this.bookButton.click({ force: true });
    }
  }
}