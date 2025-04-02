import { LoginPage } from '../../src/pages/login.page';
import { RegisterPage } from '../../src/pages/register.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import test, { expect } from '@playwright/test';

test.describe('Verify register', () => {
  test(
    'register with correct data and login',
    { tag: '@GAD-R03-01' },
    async ({ page }) => {
      // Arrange
      const userFirstName = 'Janina';
      const userLastName = 'Nowak';
      const userPassword = 'testtest234';
      const userEmail = `jntest${new Date().getTime()}@test.test1`;

      const registerPage = new RegisterPage(page);

      //act
      await registerPage.goto();
      await registerPage.register(
        userFirstName,
        userLastName,
        userEmail,
        userPassword,
      );
      const expectedAlertPopupText = 'User created';
      //assert
      await expect(registerPage.alertPopUp).toHaveText(expectedAlertPopupText);
      const loginPage = new LoginPage(page);
      await loginPage.waitforPageToLoadUrl();
      const titleLogin = await loginPage.title();
      expect.soft(titleLogin).toContain('Login');

      // assert
      await loginPage.login(userEmail, userPassword);

      const welcomePage = new WelcomePage(page);
      const titleWelcome = await welcomePage.title();

      expect(titleWelcome).toContain('Welcome');
    },
  );
});
