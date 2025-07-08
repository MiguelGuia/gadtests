import { prepareRandomUser } from '@_src/factories/user.factory';
import { RegisterUserModel } from '@_src/models/user.model';
import { RegisterPage } from '@_src/pages/register.page';
import test, { expect } from '@playwright/test';

test.describe('Verify register', () => {
  let registerPage: RegisterPage;
  let registerUserData: RegisterUserModel;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    registerUserData = prepareRandomUser();
    await registerPage.goto();
  });
  test(
    'register with correct data and login',
    { tag: '@GAD-R03-01' },
    async () => {
      // Arrange

      const expectedWelcomeTitle = 'Welcome';
      const expectedAlertPopupText = 'User created';
      const expectedLoginTitle = 'Login';

      //act
      const loginPage = await registerPage.register(registerUserData);

      //assert
      await expect(registerPage.alertPopUp).toHaveText(expectedAlertPopupText);
      await loginPage.waitforPageToLoadUrl();
      const titleLogin = await loginPage.getTitle();
      expect.soft(titleLogin).toContain(expectedLoginTitle);

      // assert test login
      const welcomePage = await loginPage.login({
        userEmail: registerUserData.userEmail,
        userPassword: registerUserData.userPassword,
      });
      const titleWelcome = await welcomePage.getTitle();

      expect(titleWelcome).toContain(expectedWelcomeTitle);
    },
  );
  test(
    'not register with incorrect data - non valid email',
    { tag: '@GAD-R03-04' },
    async () => {
      // Arrange
      registerUserData.userEmail = '!@#$';
      const expectedErrorText = 'Please provide a valid email address';

      //act
      await registerPage.register(registerUserData);

      //assert
      await expect(registerPage.emailErrorText).toHaveText(expectedErrorText);
    },
  );

  test(
    'not register with incorrect data - email not provided',
    { tag: '@GAD-R03-04' },
    async () => {
      // Arrange
      const expectedErrorText = 'This field is required';

      //act
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
