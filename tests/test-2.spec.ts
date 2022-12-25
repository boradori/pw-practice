import { test, expect } from '@playwright/test'

test("Test invalid login", async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/index.html')
  await page.getByRole('button', { name: ' Signin' }).click()
  await page.getByLabel('Login').click()
  await page.getByLabel('Login').fill('incorrectUsername')
  await page.getByLabel('Password').click()
  await page.getByLabel('Password').fill('incorrectPassword')
  await page.getByLabel('Keep me signed in').check()
  await page.getByRole('button', { name: 'Sign in' }).click()

  const loginErrorAlert = page.locator(".alert-error:visible")
  await expect(loginErrorAlert).toHaveText("Login and/or password are wrong.")
})

test.describe.parallel.only("Hooks", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://example.com")
    await expect(page).toHaveTitle(/Example/)
  })

  test("Test screenshot of a page", async ({ page }) => {
    await page.screenshot({ path: "example_page.png", fullPage: true })
  })
  
  test("Test screenshot of an element", async ({ page }) => {  
    const header = page.locator("body > div > h1")
    await expect(header).toBeVisible()
  
    await header.screenshot({ path: "header.png" })
  })
})