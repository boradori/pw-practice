import { test, expect } from "@playwright/test"
import { HomePage } from "../../pages/HomePage"
import { LoginPage } from "../../pages/LoginPage"

test.describe("Filter Transactions", () => {
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

	test("Verify the results for each account", async ({ page }) => {
		await page.click("#account_activity_tab")
		await page.selectOption("#aa_accountId", "2")

		const checkingAccount = page.locator("#all_transactions_for_account tbody tr")
		await expect(checkingAccount).toHaveCount(3)

		await page.selectOption("#aa_accountId", "4")
		const loanAccount = page.locator("#all_transactions_for_account tbody tr")
		await expect(loanAccount).toHaveCount(2)

		await page.selectOption("#aa_accountId", "6")
		const noResults = page.locator(".well")
		await expect(noResults).toHaveText("No results.")
	})
})