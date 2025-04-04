import { randomUser } from '../src/factories/user.factory';
import { LoginPage } from '../src/pages/login.page';
import { RegisterPage } from '../src/pages/register.page';
import { WelcomePage } from '../src/pages/welcome.page';
import test, { expect } from '@playwright/test';

test.describe('Verify register', () => {
  test(
    'register with correct data and login',
    { tag: '@GAD-R03-01' },
    async ({ page }) => {
      // Arrange

      const registerUserData = randomUser();
      const registerPage = new RegisterPage(page);

      //act
      await registerPage.goto();
      await registerPage.register(registerUserData);
      const expectedAlertPopupText = 'User created';

      //assert
      await expect(registerPage.alertPopUp).toHaveText(expectedAlertPopupText);
      const loginPage = new LoginPage(page);
      await loginPage.waitforPageToLoadUrl();
      const titleLogin = await loginPage.title();
      expect.soft(titleLogin).toContain('Login');

      // assert
      await loginPage.login({
        userEmail: registerUserData.userEmail,
        userPassword: registerUserData.userPassword,
      });

      const welcomePage = new WelcomePage(page);
      const titleWelcome = await welcomePage.title();

      expect(titleWelcome).toContain('Welcome');
    },
  );
  test(
    'not register with incorrect data - non valid email',
    { tag: '@GAD-R03-04' },
    async ({ page }) => {
      // Arrange

      const registerUserData = randomUser();
      registerUserData.userEmail = '!@#$';
      const registerPage = new RegisterPage(page);
      const expectedErrorText = 'Please provide a valid email address';

      //act
      await registerPage.goto();
      await registerPage.register(registerUserData);

      //assert
      await expect(registerPage.emailErrorText).toHaveText(expectedErrorText);
    },
  );

  test(
    'not register with incorrect data - email not provided',
    { tag: '@GAD-R03-04' },
    async ({ page }) => {
      // Arrange

      const registerPage = new RegisterPage(page);
      const registerUserData = randomUser();

      const expectedErrorText = 'This field is required';

      //act
      await registerPage.goto();
      await registerPage.registerButton.click();
      await registerPage.userFirstNameInput.fill(
        registerUserData.userFirstName,
      );
      await registerPage.userLastNameInput.fill(registerUserData.userLastName);
      await registerPage.userPasswordInput.fill(registerUserData.userPassword);

      //assert
      await expect(registerPage.emailErrorText).toHaveText(expectedErrorText);
    },
  );
});
