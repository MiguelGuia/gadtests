import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentsPage } from '../../src/pages/comments.page';
import { HomePage } from '../../src/pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Verify service main pages', () => {
  test('home page title', { tag: '@GAD-R01-01' }, async ({ page }) => {
    //arrange
    const homePage = new HomePage(page);

    // act
    await homePage.goto();

    //assert
    const title = await homePage.title();
    expect(title).toContain('GAD');
  });

  test('articles page title', { tag: '@GAD-R01-02' }, async ({ page }) => {
    //arrange
    const articlesPage = new ArticlesPage(page);

    // act
    await articlesPage.goto();

    //assert
    const title = await articlesPage.title();
    expect(title).toContain('Articles');
  });

  test('comments page title', { tag: '@GAD-R01-03' }, async ({ page }) => {
    //arrange
    const commentsPage = new CommentsPage(page);

    // act
    await commentsPage.goto();

    //assert
    const title = await commentsPage.title();
    expect(title).toContain('Comments');
  });
  test('home page title simple', async ({ page }) => {
    //act
    await page.goto('http://localhost:3000');
    // assert
    await expect(page).toHaveTitle(/GAD/);
  });
});
