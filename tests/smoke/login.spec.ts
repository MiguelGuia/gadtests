import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { testUser1 } from '../../src/test-data/user.data';
import test, { expect } from '@playwright/test';

test.describe('Verify login', () => {
  test(
    'login with correct credentials',
    { tag: '@GAD-R02-01' },
    async ({ page }) => {
      // Arrange
      const userEmail = testUser1.userEmail;
      const userPassword = testUser1.userPassword;
      const loginPage = new LoginPage(page);

      // Act
      await loginPage.goto();
      await loginPage.login(userEmail, userPassword);

      const welcomePage = new WelcomePage(page);
      const title = await welcomePage.title();

      // Assert
      expect(title).toContain('Welcome');
    },
  );
  test(
    'reject login with incorrect password',
    { tag: '@login rejection' },
    async ({ page }) => {
      //Arrange
      const userEmail = testUser1.userEmail;
      const userPassword = 'wrong-password';
      const loginPage = new LoginPage(page);
      const title = await loginPage.title();

      //Act
      await loginPage.goto();
      await loginPage.login(userEmail, userPassword);

      //Assert
      await expect
        .soft(loginPage.loginError)
        .toHaveText('Invalid email or password');
      expect.soft(title).toContain('Login');
    },
  );
});
