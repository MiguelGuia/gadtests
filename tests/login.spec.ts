import { LoginUserModel } from '../src/models/user.model';
import { LoginPage } from '../src/pages/login.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { testUser1 } from '../src/test-data/user.data';
import test, { expect } from '@playwright/test';

test.describe('Verify login', () => {
  test(
    'login with correct credentials',
    { tag: '@GAD-R02-01' },
    async ({ page }) => {
      //arrange
      const loginPage = new LoginPage(page);

      // Act
      await loginPage.goto();
      await loginPage.login(testUser1);

      const welcomePage = new WelcomePage(page);
      const title = await welcomePage.getTitle();

      // Assert
      expect(title).toContain('Welcome');
    },
  );
  test(
    'reject login with incorrect password',
    { tag: '@login rejection' },
    async ({ page }) => {
      //Arrange

      const loginUserData: LoginUserModel = {
        userEmail: testUser1.userEmail,
        userPassword: 'incorrectPassword',
      };

      const loginPage = new LoginPage(page);

      //Act
      await loginPage.goto();
      await loginPage.login(loginUserData);

      //Assert
      await expect
        .soft(loginPage.loginError)
        .toHaveText('Invalid username or password');
      const title = await loginPage.getTitle();
      await expect.soft(title).toContain('Login');
    },
  );
});
