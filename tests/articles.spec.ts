import { randomNewArticle } from '../src/factories/article.factory';
import { ArticlePage } from '../src/pages/article.page';
import { ArticlesPage } from '../src/pages/articles.page';
import { LoginPage } from '../src/pages/login.page';
import { testUser1 } from '../src/test-data/user.data';
import { AddArticleView } from '../src/views/add-article.view';
import test, { expect } from '@playwright/test';

test.describe('Verify articles', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  // eslint-disable-next-line prefer-const
  let articleData = randomNewArticle();

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();
  });
  test('create new article', { tag: '@GAD-R04-01' }, async ({ page }) => {
    //arrange
    const articlePage = new ArticlePage(page);

    // Act
    await addArticleView.createArticle(articleData);

    // Assert
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toHaveText(articleData.body, { useInnerText: true });
  });
  test('reject creating article without title, {@GAD-R04-01}', async () => {
    //arrange
    articleData.title = '';
    const expectedErrorMessage = 'Article was not created';

    // act
    await addArticleView.createArticle(articleData);

    //assert
    await expect(addArticleView.alertPopUp).toHaveText(expectedErrorMessage);
  });
  test('reject creating article without body, {@GAD-R04-02}', async () => {
    //arrange
    articleData.body = '';
    const expectedErrorMessage = 'Article was not created';

    //act
    await addArticleView.createArticle(articleData);

    //assert
    await expect(addArticleView.alertPopUp).toHaveText(expectedErrorMessage);
  });
});
