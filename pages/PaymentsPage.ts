import { expect, Page, Locator } from "@playwright/test"

export class PaymentsPage {
  readonly page: Page
  readonly payeeSelector: Locator
  readonly payeeDetailsButton: Locator
  readonly payeeDetail: Locator
  readonly accountSelector: Locator
  readonly amountField: Locator
  readonly dateField: Locator
  readonly descriptionField: Locator
  readonly submitPaymentButton: Locator
  readonly message: Locator

  constructor(page: Page) {
    this.page = page
    this.payeeSelector = this.page.locator("#sp_payee")
    this.payeeDetailsButton = this.page.locator("#sp_get_payee_details")
    this.payeeDetail = this.page.locator("#sp_payee_details")
    this.accountSelector = this.page.locator("#sp_account")
    this.amountField = this.page.locator("#sp_amount")
    this.dateField = this.page.locator("#sp_date")
    this.descriptionField = this.page.locator("#sp_description")
    this.submitPaymentButton = this.page.locator("#pay_saved_payees")
    this.message = this.page.locator("#alert_content > span")
  }

  async createPayment() {
    await this.payeeSelector.selectOption("apple")
    await this.payeeDetailsButton.click()
    await expect(this.payeeDetail).toBeVisible()
    await this.accountSelector.selectOption("6")
    await this.amountField.type("5000")
    await this.dateField.type("2022-12-31")
    await this.descriptionField.type("Some description")
    await this.submitPaymentButton.click()
  }

  async verifySuccessMessage() {
    await expect(this.message).toBeVisible()
    await expect(this.message).toHaveText("The payment was successfully submitted.")
  }
}