import { prepareRandomArticle } from '@_src/factories/article.factory';
import { AddArticle } from '@_src/models/article.model';
import { ArticlePage } from '@_src/pages/article.page';
import { ArticlesPage } from '@_src/pages/articles.page';
import { AddArticleView } from '@_src/views/add-article.view';
import test, { expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('Create,verify and delete article', () => {
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticle;
  let articlePage: ArticlePage;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    articlePage = new ArticlePage(page);

    await articlesPage.goto();
  });
  test('create new article', { tag: ['@GAD-R04-01', '@logged'] }, async () => {
    //.serial
    //arrange

    articleData = prepareRandomArticle();

    // Act
    await articlesPage.addArticleButtonLogged.click();
    await expect.soft(addArticleView.addNewHeader).toBeVisible();
    await addArticleView.createArticle(articleData);

    // Assert
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toHaveText(articleData.body, { useInnerText: true });
  });

  test(
    'user can access single article',
    { tag: ['@GAD-R04-03', '@logged'] },
    async () => {
      //act
      await articlesPage.gotoArticle(articleData.title);
      //assert
      await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
      await expect
        .soft(articlePage.articleBody)
        .toHaveText(articleData.body, { useInnerText: true });
    },
  );
  test(
    'user can delete his own article',
    { tag: ['@GAD-R04-04', '@logged'] },
    async () => {
      //arrange
      const expectedArticlesTitle = 'Articles';
      const expectedNoResultText = 'No data';
      await articlesPage.gotoArticle(articleData.title);
      await articlePage.deleteArticle();
      //act
      await articlePage.deleteIcon.click();
      //assert
      await articlesPage.waitforPageToLoadUrl();
      const title = await articlesPage.getTitle();
      expect(title).toContain(expectedArticlesTitle);

      await articlesPage.searchArticle(articleData.title);
      await expect(articlesPage.noResultText).toHaveText(expectedNoResultText);
    },
  );
});
