import { Page } from '@playwright/test';

export class ArticlesPage {
  url = 'http://localhost:3000/articles.html';
  constructor(private page: Page) {}
  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }
  async title(): Promise<string> {
    await this.page.waitForLoadState();
    return await this.page.title();
  }
}
