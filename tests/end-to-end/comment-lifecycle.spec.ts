import { prepareRandomArticle } from '../../src/factories/article.factory';
import { prepareRandomComment } from '../../src/factories/comment.factory';
import { AddArticle } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentPage } from '../../src/pages/comment.page';
import { AddArticleView } from '../../src/views/add-article.view';
import { AddCommentView } from '../../src/views/add-comment.view';
import { EditCommentView } from '../../src/views/edit-comment.view';
import test, { expect } from '@playwright/test';

test.describe('Create,verify and delete comment', () => {
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticle;
  let articlePage: ArticlePage;
  let addCommentView: AddCommentView;
  let commentPage: CommentPage;
  let editCommentView: EditCommentView;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    articlePage = new ArticlePage(page);
    articleData = prepareRandomArticle();
    addCommentView = new AddCommentView(page);
    commentPage = new CommentPage(page);
    editCommentView = new EditCommentView(page);

    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();
    await addArticleView.createArticle(articleData);
  });
  test('operate on comments', { tag: ['@GAD-R05-01', '@logged'] }, async () => {
    //arrange
    const newCommentData = prepareRandomComment();

    await test.step('create new comment', async () => {
      //arrange
      const expectedCommentCreatedPopup = 'Comment was created';
      const expectedAddCommentHeader = 'Add New Comment';
      //act
      await articlePage.addCommentButton.click();
      await expect
        .soft(addCommentView.addNewHeader)
        .toHaveText(expectedAddCommentHeader);

      await addCommentView.createComment(newCommentData);
      //assert
      await expect
        .soft(articlePage.alertPopup)
        .toHaveText(expectedCommentCreatedPopup);
    });

    await test.step('verify comment', async () => {
      const articleComment = articlePage.getArticleComment(newCommentData.body);
      await expect(articleComment.body).toHaveText(newCommentData.body);
      await articleComment.link.click();

      await expect(commentPage.commentBody).toHaveText(newCommentData.body);
    });

    const editCommentData = prepareRandomComment();
    await test.step('update comment', async () => {
      //arrange
      const expectedCommentUpdatedPopup = 'Comment was updated';

      //act
      await commentPage.editButton.click();
      await editCommentView.updateComment(editCommentData);
      await expect
        .soft(commentPage.alertPopup)
        .toHaveText(expectedCommentUpdatedPopup);
      await expect(commentPage.commentBody).toHaveText(editCommentData.body);
    });
    await test.step('verify updated comment', async () => {
      //act
      await commentPage.returnLink.click();
      const updatedArticleComment = articlePage.getArticleComment(
        editCommentData.body,
      );
      await expect(updatedArticleComment.body).toHaveText(editCommentData.body);
    });
    await test.step('create and verify second comment', async () => {
      //arrange
      const secondCommentData = prepareRandomComment();

      //act
      await articlePage.addCommentButton.click();
      await addCommentView.createComment(secondCommentData);

      //assert
      const articleComment = articlePage.getArticleComment(
        secondCommentData.body,
      );
      await expect(articleComment.body).toHaveText(secondCommentData.body);
    });
  });
  test(
    'user can add more than one comment to article',
    { tag: ['@GAD-R05-01', '@logged'] },
    async () => {
      await test.step('create first comment', async () => {
        //arrange
        const newCommentData = prepareRandomComment();

        const expectedCommentCreatedPopup = 'Comment was created';
        //act
        await articlePage.addCommentButton.click();

        await addCommentView.createComment(newCommentData);
        //assert
        await expect
          .soft(articlePage.alertPopup)
          .toHaveText(expectedCommentCreatedPopup);
      });
      await test.step('create and verify second comment', async () => {
        const secondCommentData = prepareRandomComment();
        const secondCommentBody =
          await test.step('create second comment', async () => {
            //arrange

            //act
            await articlePage.addCommentButton.click();
            await addCommentView.createComment(secondCommentData);
            return secondCommentData.body;
          });

        //assert
        await test.step('verify comment', async () => {
          const articleComment =
            articlePage.getArticleComment(secondCommentBody);
          await expect(articleComment.body).toHaveText(secondCommentBody);
          await articleComment.link.click();
          await expect(commentPage.commentBody).toHaveText(secondCommentBody);
        });
      });
    },
  );
});
