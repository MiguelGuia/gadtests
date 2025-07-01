import { prepareRandomArticle } from '@_src/factories/article.factory';
import { ArticlePage } from '@_src/pages/article.page';
import { ArticlesPage } from '@_src/pages/articles.page';
import { AddArticleView } from '@_src/views/add-article.view';
import test, { expect } from '@playwright/test';

test.describe('Verify articles', () => {
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);

    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();
  });
  test(
    'create new article',
    { tag: ['@GAD-R04-01', '@logged'] },
    async ({ page }) => {
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
    },
  );
  test(
    'reject creating article without title',
    { tag: ['@GAD-R04-01', '@logged'] },
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
    { tag: ['@GAD-R04-02', '@logged'] },
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
  test(
    'reject creating article with title exceeding 128 signs',
    { tag: ['@GAD-R04-02', '@logged'] },
    async () => {
      //arrange
      const articleData = prepareRandomArticle(129);
      const expectedErrorMessage = 'Article was not created';

      // act
      await addArticleView.createArticle(articleData);

      //assert
      await expect(addArticleView.alertPopUp).toHaveText(expectedErrorMessage);
    },
  );
  test(
    'user can access single article',
    { tag: ['@GAD-R04-03', '@logged'] },
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
