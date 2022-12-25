import { Locator, Page } from "@playwright/test"

export class HomePage {
  readonly page: Page
  readonly signInButton: Locator
  readonly searchField: Locator
  readonly linkFeedback: Locator

  constructor(page: Page) {
    this.page = page
    this.signInButton = page.locator("#signin_button")
    this.searchField = page.locator("#searchTerm")
    this.linkFeedback = page.locator("#feedback")
  }

  async clickFeedbackLink() {
    await this.linkFeedback.click()
  }

  async clickSignInButton() {
    await this.signInButton.click()
  }

  async gotoSummaryPage() {
    await this.page.goto("http://zero.webappsecurity.com/bank/account-summary.html")
  }
  
  async search(term: string) {
    await this.searchField.type(term)
		await this.searchField.press("Enter")
  }

  async visit() {
    await this.page.goto("http://zero.webappsecurity.com/")
  }
}