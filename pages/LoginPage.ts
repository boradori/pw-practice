import { expect, Locator, Page } from "@playwright/test"
import { BasePage } from "./BasePage"

export class LoginPage extends BasePage {
	// Define selectors
	readonly usernameInput: Locator
	readonly passwordInput: Locator
	readonly submitButton: Locator
	readonly errorMessage: Locator

	// Init selectors using constructor
	constructor(page: Page) {
		super(page)
		this.usernameInput = page.locator("#user_login")
		this.passwordInput = page.locator("#user_password")
		this.submitButton = page.locator("input", { hasText: "Sign in" })
		this.errorMessage = page.locator(".alert-error")
	}

	// Define page methods
	async login(username: string, password: string) {
		await this.usernameInput.type(username)
		await this.passwordInput.type(password)
		await this.submitButton.click()
	}

	async assertErrorMessage() {
		await expect(this.errorMessage).toHaveText("Login and/or password are wrong.")
	}
}