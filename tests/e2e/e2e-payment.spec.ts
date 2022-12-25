import { test } from "@playwright/test"
import { HomePage } from "../../pages/HomePage"
import { LoginPage } from "../../pages/LoginPage"
import { PaymentsPage } from "../../pages/PaymentsPage"
import { Navbar } from "../../components/Navbar"

test.describe("New Payment", () => {
	let homePage: HomePage
	let loginPage: LoginPage
	let paymentsPage: PaymentsPage
	let navBar: Navbar

	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page)
		loginPage = new LoginPage(page)
		paymentsPage = new PaymentsPage(page)
		navBar = new Navbar(page)

		await homePage.visit()
		await homePage.clickSignInButton()
		await loginPage.login("username", "password")
		await homePage.gotoSummaryPage()
	})

	test("Should send new payment", async ({ page }) => {
		await navBar.clickTabByTabName("Pay Bills")
		await paymentsPage.createPayment()
		await paymentsPage.verifySuccessMessage()
	})
})