import { BasePage } from '../pages/base.page';
import { AddCommentModel } from '@_src/models/comment.model';
import { Locator, Page } from '@playwright/test';

export class EditCommentView extends BasePage {
  bodyInput: Locator;
  updateButton: Locator;

  constructor(page: Page) {
    super(page);
    this.bodyInput = this.page.locator('#body');
    this.updateButton = this.page.getByTestId('update-button');
  }
  async updateComment(commentData: AddCommentModel): Promise<void> {
    await this.bodyInput.fill(commentData.body);
    await this.updateButton.click();
  }
}
