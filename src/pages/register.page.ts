import { RegisterUserModel } from '@_src/models/user.model';
import { BasePage } from '@_src/pages/base.page';
import { Page } from '@playwright/test';

export class RegisterPage extends BasePage {
  url = '/register.html';
  userFirstNameInput = this.page.getByTestId('firstname-input');
  userLastNameInput = this.page.getByTestId('lastname-input');
  userEmailInput = this.page.getByTestId('email-input');
  userPasswordInput = this.page.getByPlaceholder('Enter Password');
  registerButton = this.page.getByRole('button', { name: 'Register' });

  alertPopUp = this.page.getByTestId('alert-popup');
  emailErrorText = this.page.locator('#octavalidate_email');

  constructor(page: Page) {
    super(page);
  }

  async register(registerUserData: RegisterUserModel): Promise<void> {
    await this.userFirstNameInput.fill(registerUserData.userFirstName);
    await this.userLastNameInput.fill(registerUserData.userLastName);
    await this.userEmailInput.fill(registerUserData.userEmail);
    await this.userPasswordInput.fill(registerUserData.userPassword);
    await this.registerButton.click();
  }
}
