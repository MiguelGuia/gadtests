import { AddArticle } from '../models/article.model';
import { BasePage } from '../pages/base.page';
import { Locator, Page } from '@playwright/test';

export class AddArticleView extends BasePage {
  header: Locator;
  titleInput: Locator;
  bodyInput: Locator;
  saveButton: Locator;
  alertPopUp: Locator;

  constructor(page: Page) {
    super(page);
    this.header = this.page.getByRole('heading', { name: 'Add New Entry' });
    this.titleInput = this.page.getByTestId('title-input');
    this.bodyInput = this.page.getByTestId('body-text');
    this.saveButton = this.page.getByTestId('save');
    this.alertPopUp = this.page.getByTestId('alert-popup');
  }
  async createArticle(addArticle: AddArticle): Promise<void> {
    await this.titleInput.fill(addArticle.title);
    await this.bodyInput.fill(addArticle.body);
    await this.saveButton.click();
  }
}
