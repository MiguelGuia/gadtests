import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentsPage } from '@_src/pages/comments.page';
import { HomePage } from '@_src/pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Verify menu main buttons', () => {
  test('comments button navigates to comments page @GAD-R01-03', async ({
    page,
  }) => {
    // Arrange
    const expectedCommentsTitle = 'Comments';
    const articlesPage = new ArticlesPage(page);

    // Act
    await articlesPage.goto();
    await articlesPage.mainMenu.commentsButton.click();
    const commentsPage = new CommentsPage(page);
    const title = await commentsPage.getTitle();

    expect(title).toContain(expectedCommentsTitle);
    // Assert
  });

  test('articles button navigates to articles page @GAD-R01-03', async ({
    page,
  }) => {
    // Arrange
    const expectedArticlesTitle = 'Articles';
    const commentsPage = new CommentsPage(page);

    // Act
    await commentsPage.goto();
    await commentsPage.mainMenu.articlesButton.click();
    const articlesPage = new ArticlesPage(page);
    const title = await articlesPage.getTitle();

    // Assert
    expect(title).toContain(expectedArticlesTitle);
  });

  test('home page button navigates to main page @GAD-R01-03', async ({
    page,
  }) => {
    // Arrange
    const expectedHomePageTitle = 'GAD';
    const articlesPage = new ArticlesPage(page);

    // Act
    await articlesPage.goto();
    await articlesPage.mainMenu.homePage.click();
    const homePage = new HomePage(page);
    const title = await homePage.getTitle();

    // Assert
    expect(title).toContain(expectedHomePageTitle);
  });
});
