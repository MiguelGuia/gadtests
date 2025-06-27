import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { testUser1 } from '../../src/test-data/user.data';
import { expect, test as setup } from '@playwright/test';

setup('login with correct credentials', async ({ page }) => {
  //arrange
  const expectedWelcomeTitle = 'Welcome';
  const loginPage = new LoginPage(page);

  // Act
  await loginPage.goto();
  await loginPage.login(testUser1);

  const welcomePage = new WelcomePage(page);
  const title = await welcomePage.getTitle();

  // Assert
  expect(title).toContain(expectedWelcomeTitle);
});
