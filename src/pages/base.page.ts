import { Page } from '@playwright/test';

export class BasePage {
  url: string;

  constructor(protected page: Page) {
    this.url = '';
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  async getTitle(): Promise<string> {
    await this.page.waitForLoadState();
    return this.page.title();
  }
  async waitforPageToLoadUrl(): Promise<void> {
    await this.page.waitForURL(this.url);
  }
}
