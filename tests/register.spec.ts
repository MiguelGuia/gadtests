import { RegisterUser } from '../src/models/user.models';
import { LoginPage } from '../src/pages/login.page';
import { RegisterPage } from '../src/pages/register.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { faker } from '@faker-js/faker';
import test, { expect } from '@playwright/test';

test.describe('Verify register', () => {
  test(
    'register with correct data and login',
    { tag: '@GAD-R03-01' },
    async ({ page }) => {
      // Arrange

      const registerUserData: RegisterUser = {
        userFirstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
        userLastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
        userEmail: '',
        userPassword: faker.internet.password(),
      };
      registerUserData.userEmail = faker.internet.email({
        firstName: registerUserData.userFirstName,
        lastName: registerUserData.userLastName,
      });
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

      const registerUserData: RegisterUser = {
        userFirstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
        userLastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
        userEmail: '#$%',
        userPassword: faker.internet.password(),
      };

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

      // const registerUserData: RegisterUser = {
      //   userFirstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
      //   userLastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
      //   userEmail: '#$%',
      //   userPassword: faker.internet.password(),
      // };

      const registerPage = new RegisterPage(page);
      const expectedErrorText = 'This field is required';

      //act
      await registerPage.goto();
      await registerPage.registerButton.click();
      await registerPage.userFirstNameInput.fill(
        faker.person.firstName().replace(/[^A-Za-z]/g, ''),
      );
      await registerPage.userLastNameInput.fill(
        faker.person.lastName().replace(/[^A-Za-z]/g, ''),
      );
      await registerPage.userPasswordInput.fill(faker.internet.password());

      //assert
      await expect(registerPage.emailErrorText).toHaveText(expectedErrorText);
    },
  );
});
