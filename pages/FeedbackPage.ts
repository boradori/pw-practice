import { expect, Locator, Page } from "@playwright/test"

export class FeedbackPage {
  readonly page: Page
  readonly nameField: Locator
  readonly emailField: Locator
  readonly subjectField: Locator
  readonly commentField: Locator
  readonly clearButton: Locator
  readonly submitButton: Locator
  readonly feedbackTitle: Locator

  constructor(page: Page) {
    this.page = page
    this.nameField = page.locator("#name")
    this.emailField = page.locator("#email")
    this.subjectField = page.locator("#subject")
    this.commentField = page.locator("#comment")
    this.clearButton = page.locator("input[name='clear']")
    this.submitButton = page.locator("input[type='submit']")
    this.feedbackTitle = page.locator("#feedback-title")
  }

  async fillForm(name: string, email: string, subject: string, comment: string) {
    await this.nameField.type(name)
    await this.emailField.type(email)
    await this.subjectField.type(subject)
    await this.commentField.type(comment)
  }

  async resetForm() {
    await this.clearButton.click()
  }

  async submitForm() {
    await this.submitButton.click()
  }

  async verifyEmptyForm() {
    await expect(this.nameField).toBeEmpty()
    await expect(this.commentField).toBeEmpty()
  }

  async verifyFeedbackFormSent() {
    await expect(this.feedbackTitle).toBeVisible()
    await expect(this.feedbackTitle).toHaveText("Feedback")
  }
}