import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class CommentsPage extends BasePage {
  url = 'http://localhost:3000/comments.html';
  constructor(page: Page) {
    super(page);
  }
}
