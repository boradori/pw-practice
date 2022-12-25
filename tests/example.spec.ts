import { test, expect } from '@playwright/test'
import { loadHomepage, assertTitle } from '../helpers'

// test.use({ viewport: { width: 1200, height: 800 } })
test('homepage has title and links to intro page', async ({ page }) => {
  await page.goto("https://www.example.com")
  await expect(page).toHaveTitle(/Example/)

  // create a locator
  const header = page.locator("body > div > h1")
  await expect(header).toBeVisible()
  await expect(header).toHaveText("Example Domain") // toContainText works as well
  await expect(header).toHaveCount(1)

  // non existing element
  const nonExistingElement = page.locator("h5")
  await expect(nonExistingElement).not.toBeVisible()

  // create a locator
  const moreInformation = page.getByRole("link", { name: "More information..." })
  
  await expect(moreInformation).toHaveAttribute("href", "https://www.iana.org/domains/example")
  await moreInformation.click()

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*reserved/)
})

test("Clicking on elements", async ({ page }) => {
  await page.goto("http://zero.webappsecurity.com/index.html")
  await expect(page).toHaveTitle(/Zero/)

  await page.click("#signin_button:visible")
  await expect(page).toHaveURL(/.*login.html/)

  // await page.click("input[value='Sign in']")
  await page.click("text=Sign in")
  
  const loginErrorAlert = page.locator(".alert-error:visible")
  await expect(loginErrorAlert).toHaveText("Login and/or password are wrong.")
})

test("Input test", async ({ page }) => {
  await page.goto("http://zero.webappsecurity.com/index.html")
  await expect(page).toHaveTitle(/Zero/)

  await page.click("#signin_button:visible")
  await expect(page).toHaveURL(/.*login.html/)

  const usernameField = page.locator("#user_login")
  await usernameField.fill("incorrectUsername")

  const passwordField = page.locator("#user_password")
  await passwordField.fill("incorrectPassword")
  
  await page.click("text=Sign in")

  const loginErrorAlert = page.locator(".alert-error:visible")
  await expect(loginErrorAlert).toHaveText("Login and/or password are wrong.")
})

test("Custom helpers", async ({ page }) => {
  await loadHomepage(page)
  await assertTitle(page)
})