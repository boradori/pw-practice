import { test, expect } from "@playwright/test"
import { LoginPage } from "../../pages/LoginPage"
import { HomePage } from "../../pages/HomePage"

test.describe.parallel("Login / Logout Flow", () => {
	let loginPage: LoginPage
	let homePage: HomePage
	
	// Before hook
	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page)
		homePage = new HomePage(page)
		await homePage.visit()
	})

	// Negative test
	test("Negative login test", async () => {
		await homePage.clickSignInButton()
		await loginPage.login("invalid_username", "invalid_password")
		await loginPage.wait(1000)
		await loginPage.assertErrorMessage()
	})

	// Positive test + Logout
	test("Positive login and logout test", async ({ page }) => {
		await homePage.clickSignInButton()
		await loginPage.login("username", "password")
		await homePage.gotoSummaryPage()

		const accountSummaryTab = page.locator("#account_summary_tab")
		await expect(accountSummaryTab).toBeVisible()

		const settings = page.locator("li[class='dropdown'] > a[data-toggle='dropdown']").nth(0)
		const username = page.locator("li[class='dropdown'] > a[data-toggle='dropdown']").nth(1)

		await expect(settings).toHaveText("Settings")
		await expect(username).toHaveText("username")

		await page.goto("http://zero.webappsecurity.com/logout.html")
		await expect(page).toHaveURL("http://zero.webappsecurity.com/index.html")
	})
})