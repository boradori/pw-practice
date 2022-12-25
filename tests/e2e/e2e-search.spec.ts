import { test, expect } from "@playwright/test"
import { HomePage } from "../../pages/HomePage"

test.describe("Search Results", () => {
  test("Should find search results", async ({ page }) => {
		const homePage = new HomePage(page)
		await homePage.visit()
		await homePage.search("bank")

		const numberOfLinks = page.locator("h2 ~ ul > li > a")
		await expect(numberOfLinks).toHaveCount(2)
	})
})