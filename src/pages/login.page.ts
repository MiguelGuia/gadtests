import { LoginUserModel } from '@_src/models/user.model';
import { BasePage } from '@_src/pages/base.page';
import { WelcomePage } from '@_src/pages/welcome.page';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '/login/';
  loginError = this.page.getByTestId('login-error');
  userEmailInput = this.page.getByPlaceholder('Enter User Email');
  userPasswordInput = this.page.getByPlaceholder('Enter Password');
  loginButton = this.page.getByRole('button', { name: 'LogIn' });

  constructor(page: Page) {
    super(page);
  }

  async login(LoginUserModelData: LoginUserModel): Promise<WelcomePage> {
    await this.userEmailInput.fill(LoginUserModelData.userEmail);
    await this.userPasswordInput.fill(LoginUserModelData.userPassword);
    await this.loginButton.click();
    return new WelcomePage(this.page);
  }

  async loginValid(loginUserData: LoginUserModel): Promise<WelcomePage> {
    await this.login(loginUserData);
    return new WelcomePage(this.page);
  }
  async loginInvalid(loginUserData: LoginUserModel): Promise<LoginPage> {
    await this.login(loginUserData);
    return this;
  }
}
