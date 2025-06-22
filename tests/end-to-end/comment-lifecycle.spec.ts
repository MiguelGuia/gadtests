import { prepareRandomArticle } from '../../src/factories/article.factory';
import { prepareRandomComment } from '../../src/factories/comment.factory';
import { AddArticle } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentPage } from '../../src/pages/comment.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { AddArticleView } from '../../src/views/add-article.view';
import { AddCommentView } from '../../src/views/add-comment.view';
import { EditCommentView } from '../../src/views/edit-comment.view';
import test, { expect } from '@playwright/test';

test.describe('Create,verify and delete comment', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticle;
  let articlePage: ArticlePage;
  let addCommentView: AddCommentView;
  let commentPage: CommentPage;
  let editCommentView: EditCommentView;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    articlePage = new ArticlePage(page);
    articleData = prepareRandomArticle();
    addCommentView = new AddCommentView(page);
    commentPage = new CommentPage(page);
    editCommentView = new EditCommentView(page);

    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();
    await addArticleView.createArticle(articleData);
  });
  test('create new comment', { tag: '@GAD-R05-01' }, async () => {
    //Create new comment

    //arrange
    const expectedAddCommentHeader = 'Add New Comment';
    const expectedCommentCreatedPopup = 'Comment was created';
    const newCommentData = prepareRandomComment();
    const expectedCommentEditedPopup = 'Comment was updated';

    //act
    await articlePage.addCommentButton.click();
    await expect(addCommentView.addNewHeader).toHaveText(
      expectedAddCommentHeader,
    );
    await addCommentView.createComment(newCommentData);

    await expect(articlePage.alertPopup).toHaveText(
      expectedCommentCreatedPopup,
    );

    //verify comment
    const articleComment = articlePage.getArticleComment(newCommentData.body);

    await expect(articleComment.body).toHaveText(newCommentData.body);
    await articleComment.link.click();
    //arrange
    const editCommentData = prepareRandomComment();

    await expect(commentPage.commentBody).toHaveText(newCommentData.body);
    await commentPage.editButton.click();
    await editCommentView.updateComment(editCommentData);
    await expect(commentPage.commentBody).toHaveText(editCommentData.body);
    await expect(commentPage.alertPopup).toHaveText(expectedCommentEditedPopup);

    // await page.getByTestId('return').click();
  });
});
