import { BasePage } from './base.page';
import { MainMenuComponent } from '@_src/components/main-menu.component';
import { Locator, Page } from '@playwright/test';

interface ArticleComment {
  body: Locator;
  link: Locator;
}
export class ArticlePage extends BasePage {
  url = '/article.html';
  mainMenu: MainMenuComponent;
  articleTitle: Locator;
  articleBody: Locator;
  deleteIcon: Locator;
  addCommentButton: Locator;
  alertPopup: Locator;

  constructor(page: Page) {
    super(page);
    this.mainMenu = new MainMenuComponent(this.page);
    this.articleTitle = this.page.getByTestId('article-title');
    this.articleBody = this.page.getByTestId('article-body');
    this.deleteIcon = this.page.getByTestId('delete');
    this.addCommentButton = this.page.locator('#add-new-comment');
    this.alertPopup = this.page.getByTestId('alert-popup');
  }
  async deleteArticle(): Promise<void> {
    this.page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
  }

  getArticleComment(body: string): ArticleComment {
    const commentContainer = this.page
      .locator('.comment-container')
      .filter({ hasText: body });

    return {
      body: commentContainer.locator(':text("comment:")+span'),

      link: commentContainer.locator("[id^='gotoComment']"),
    };
  }
}
