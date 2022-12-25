import { Page, expect } from "@playwright/test"

const loadHomepage = async (page: Page) => {
	await page.goto("https://www.example.com")
	await expect(page).toHaveTitle(/Example/)
}

const assertTitle = async (page: Page) => {
	const header = page.locator("body > div > h1")
	await expect(header).toBeVisible()
	await expect(header).toHaveText("Example Domain")
	await expect(header).toHaveCount(1)
}

export { loadHomepage, assertTitle }