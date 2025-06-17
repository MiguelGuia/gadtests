import { prepareRandomArticle } from '../../src/factories/article.factory';
import { AddArticle } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentPage } from '../../src/pages/comment.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { AddArticleView } from '../../src/views/add-article.view';
import { AddCommentView } from '../../src/views/add-comment.view';
import test, { expect } from '@playwright/test';

test.describe('Create,verify and delete comment', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticle;
  let articlePage: ArticlePage;
  let addCommentView: AddCommentView;
  let commentPage: CommentPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    articlePage = new ArticlePage(page);
    articleData = prepareRandomArticle();
    addCommentView = new AddCommentView(page);
    commentPage = new CommentPage(page);

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();
    await addArticleView.createArticle(articleData);
  });
  test('create new comment', { tag: '@GAD-R05-01' }, async ({ page }) => {
    //Create new comment

    //arrange
    const expectedAddCommentHeader = 'Add New Comment';
    const expectedCommentCreatedPopup = 'Comment was created';

    //act
    await articlePage.addCommentButton.click();
    await expect(addCommentView.addNewHeader).toHaveText(
      expectedAddCommentHeader,
    );
    const commentText = 'Hello!';
    await addCommentView.bodyInput.fill('Hello!');
    await addCommentView.saveButton.click();

    await expect(articlePage.alertPopup).toHaveText(
      expectedCommentCreatedPopup,
    );

    //verify comment
    const articleComment = articlePage.getArticleComment(commentText);

    await expect(articleComment.body).toHaveText(commentText);
    await articleComment.link.click();
    //arrange

    await expect(commentPage.commentBody).toHaveText(commentText);
  });
});
