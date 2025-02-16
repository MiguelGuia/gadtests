import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentsPage } from '../../src/pages/comments.page';
import { HomePage } from '../../src/pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Verify main menu buttons', () => {
  test(
    'comments button navigates to comments page',
    { tag: '@GAD-R01-03' },
    async ({ page }) => {
      //arrange
      const articlesPage = new ArticlesPage(page);
      const commentsPage = new CommentsPage(page);

      //act
      await articlesPage.goto();
      await articlesPage.mainMenu.commentsButton.click();
      const title = await commentsPage.title();

      //assert
      expect(title).toContain('Comments');
    },
  );
  test(
    'articles button navigates to articles page',
    { tag: '@GAD-R01-03' },
    async ({ page }) => {
      //arrange
      const articlesPage = new ArticlesPage(page);
      const commentsPage = new CommentsPage(page);

      //act
      await commentsPage.goto();
      await commentsPage.mainMenu.articlesButton.click();
      const title = await articlesPage.title();

      //assert
      expect(title).toContain('Articles');
    },
  );
  test(
    'home page button navigates to main page',
    { tag: '@GAD-R01-03' },
    async ({ page }) => {
      //arrange
      const articlesPage = new ArticlesPage(page);

      //act
      await articlesPage.goto();
      await articlesPage.mainMenu.commentsButton.click();
      const homePage = new HomePage(page);
      const title = await homePage.title();

      //assert
      expect(title).toContain('GAD');
    },
  );
});
