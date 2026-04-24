import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput = this.page.locator('#txt-username');
  readonly passwordInput = this.page.locator('#txt-password');
  readonly loginButton   = this.page.locator('#btn-login');
  // Error shown on invalid credentials — Bootstrap alert inside #login section
  readonly errorMessage  = this.page.locator('#login p.text-danger');

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginWithEnter(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.passwordInput.press('Enter');
  }
}