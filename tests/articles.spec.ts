import { randomNewArticle } from '../src/factories/article.factory';
import { ArticlePage } from '../src/pages/article.page';
import { ArticlesPage } from '../src/pages/articles.page';
import { LoginPage } from '../src/pages/login.page';
import { testUser1 } from '../src/test-data/user.data';
import { AddArticleView } from '../src/views/add-article.view';
import test, { expect } from '@playwright/test';

test.describe('Verify articles', () => {
  test(
    'login with correct credentials',
    { tag: '@GAD-R04-01' },
    async ({ page }) => {
      //arrange
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(testUser1);

      const articlesPage = new ArticlesPage(page);
      await articlesPage.goto();

      // Act
      const addArticleView = new AddArticleView(page);

      await articlesPage.addArticleButtonLogged.click();
      await expect.soft(addArticleView.header).toBeVisible();

      const articleData = randomNewArticle();

      await addArticleView.createArticle(articleData);

      // Assert
      const articlePage = new ArticlePage(page);

      await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
      await expect
        .soft(articlePage.articleBody)
        .toHaveText(articleData.body, { useInnerText: true });
    },
  );
  test('reject creating article without body, {@GAD-R04-01}', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testUser1);

    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();
    const addArticleView = new AddArticleView(page);

    await articlesPage.addArticleButtonLogged.click();

    const addArticle = randomNewArticle();
    await addArticleView.titleInput.fill(addArticle.title);
    await addArticleView.saveButton.click();
    await expect(addArticleView.errorPopUp).toHaveText(
      'Article was not created',
    );
  });
  test('reject creating article without title, {@GAD-R04-02}', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testUser1);

    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();
    const addArticleView = new AddArticleView(page);

    await articlesPage.addArticleButtonLogged.click();

    const addArticle = randomNewArticle();
    await addArticleView.bodyInput.fill(addArticle.body);
    await addArticleView.saveButton.click();
    await expect(addArticleView.errorPopUp).toHaveText(
      'Article was not created',
    );
  });
});
