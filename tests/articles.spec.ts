import { prepareRandomArticle } from '../src/factories/article.factory';
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
    const articleData = prepareRandomArticle();

    // Act
    await addArticleView.createArticle(articleData);

    // Assert
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toHaveText(articleData.body, { useInnerText: true });
  });
  test(
    'reject creating article without title',
    { tag: '@GAD-R04-01' },
    async () => {
      //arrange
      const articleData = prepareRandomArticle();
      const expectedErrorMessage = 'Article was not created';
      articleData.title = '';

      // act
      await addArticleView.createArticle(articleData);

      //assert
      await expect(addArticleView.alertPopUp).toHaveText(expectedErrorMessage);
    },
  );
  test(
    'reject creating article without body',
    { tag: '@GAD-R04-02' },
    async () => {
      //arrange
      const articleData = prepareRandomArticle();
      const expectedErrorMessage = 'Article was not created';
      articleData.body = '';

      //act
      await addArticleView.createArticle(articleData);

      //assert
      await expect(addArticleView.alertPopUp).toHaveText(expectedErrorMessage);
    },
  );
  test('reject creating article with title exceeding 128 signs, {@GAD-R04-02}', async () => {
    //arrange
    const articleData = prepareRandomArticle(129);
    const expectedErrorMessage = 'Article was not created';

    // act
    await addArticleView.createArticle(articleData);

    //assert
    await expect(addArticleView.alertPopUp).toHaveText(expectedErrorMessage);
  });
  test(
    'user can access single article',
    { tag: '@GAD-R04-03' },
    async ({ page }) => {
      //arrange
      const articlePage = new ArticlePage(page);
      const articleData = prepareRandomArticle();
      await addArticleView.createArticle(articleData);
      await articlesPage.goto();

      //act
      await page.getByText(articleData.title).click();

      //assert
      await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
      await expect
        .soft(articlePage.articleBody)
        .toHaveText(articleData.body, { useInnerText: true });
    },
  );
});
