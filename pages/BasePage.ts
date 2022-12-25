import { Page } from "@playwright/test"

export class BasePage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async wait(time: number) {
    await this.page.waitForTimeout(time)
  }
}