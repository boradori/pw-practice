import { test, expect } from "@playwright/test"
import { HomePage } from "../../pages/HomePage"
import { LoginPage } from "../../pages/LoginPage"

test.describe("Transfer Funds and Make Payments", () => {
	let homePage: HomePage
	let loginPage: LoginPage

	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page)
		loginPage = new LoginPage(page)

		await homePage.visit()
		await homePage.clickSignInButton()
		await loginPage.login("username", "password")
		await homePage.gotoSummaryPage()
	})

	test("Transfer Funds", async ({ page }) => {
		await page.click("#transfer_funds_tab")
		await page.selectOption("#tf_fromAccountId", "2")
		await page.selectOption("#tf_toAccountId", "3")

		const amount = page.locator("#tf_amount")
		await amount.type("500")

		const description = page.locator("#tf_description")
		await description.type("Test message")

		const submitButton = page.locator("#btn_submit")
		await submitButton.click()

		const boardHeader = page.locator("h2.board-header")
		await expect(boardHeader).toContainText("Verify")
		await expect(amount).toHaveValue("500")
		await expect(description).toHaveValue("Test message")

		await submitButton.click()

		const successAlert = page.locator(".alert-success")
		await expect(successAlert).toContainText("You successfully submitted your transaction")
	})
})