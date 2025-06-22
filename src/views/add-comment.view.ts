import { AddCommentModel } from '../models/comment.model';
import { BasePage } from '../pages/base.page';
import { Locator, Page } from '@playwright/test';

export class AddCommentView extends BasePage {
  bodyInput: Locator;
  saveButton: Locator;
  addNewHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.addNewHeader = this.page.getByRole('heading', {
      name: 'Add New Comment',
    });
    this.saveButton = this.page.getByRole('button', {
      name: 'Save',
    });
    this.bodyInput = this.page.locator('#body');
  }
  async createComment(commentData: AddCommentModel): Promise<void> {
    await this.bodyInput.fill(commentData.body);
    await this.saveButton.click();
  }
}
