import { MainMenuComponent } from '../components/main-menu.component';
import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class ArticlesPage extends BasePage {
  url = '/articles.html';
  mainMenu: MainMenuComponent;
  addArticleButtonLogged: Locator;

  constructor(page: Page) {
    super(page);
    this.mainMenu = new MainMenuComponent(this.page);
    this.addArticleButtonLogged = this.page.locator('#add-new');
  }
  async gotoArticle(title: string): Promise<void> {
    await this.page.getByText(title).click();
  }
}
