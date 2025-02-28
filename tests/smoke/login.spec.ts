import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { testUser1 } from '../../src/test-data/user.data';
import test, { expect } from '@playwright/test';

test.describe('Verify login', () => {
  test(
    'login with correct credentials',
    { tag: '@GAD_R02_01' },
    async ({ page }) => {
      //arrange
      const userEmail = testUser1.userEmail;
      const userPassword = 'test1';
      const loginPage = new LoginPage(page);
      await loginPage.goto();

      //act

      await loginPage.login(userEmail, userPassword);
      const welcomePage = new WelcomePage(page);
      const title = await welcomePage.title();

      //assert
      expect(title).toContain('Welcome');
    },
  );
});
