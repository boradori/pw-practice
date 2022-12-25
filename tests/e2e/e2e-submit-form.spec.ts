import { test, expect } from "@playwright/test"
import { FeedbackPage } from "../../pages/FeedbackPage"
import { HomePage } from "../../pages/HomePage"

test.describe.parallel("Feedback form", () => {
	let homePage: HomePage
	let feedbackPage: FeedbackPage

  test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page)
		feedbackPage = new FeedbackPage(page)
		await homePage.visit()
		await homePage.clickFeedbackLink()
	})

	// Reset feedback form
	test("Reset feedback form", async () => {
		await feedbackPage.fillForm("Some name", "email@email.com", "Some subject", "Lorem ipsum blah blah")
		await feedbackPage.resetForm()
		await feedbackPage.verifyEmptyForm()
	})

	// Submit feedback form
	test("Submit feedback form", async ({ page }) => {
		await feedbackPage.fillForm("Some name", "email@email.com", "Some subject", "Lorem ipsum blah blah")
		await feedbackPage.submitForm()
		await feedbackPage.verifyFeedbackFormSent()
	})
})