const { faker } = require('@faker-js/faker')
const { test } = require('../support')

test('realiza login', async ({ page }) => {
  await page.login.visit()
  await page.login.login('standard_user', 'secret_sauce')
  await page.allProducts.loginSuccess()
})

test.skip('realiza Logout', async ({ page }) => {
  await page.login.visit()
  await page.login.login('standard_user', 'secret_sauce')
  await page.allProducts.loginSuccess()
  await page.burger.logout()
  await page.login.isLoginIn()
})

test.skip('não deve logar sem usuário', async ({ page }) => {
  await page.login.visit()
  await page.login.login('', 'secret_sauce')
  await page.login.loginUnsuccess('Username is required')
})

test.skip('não deve logar sem senha', async ({ page }) => {
  await page.login.visit()
  await page.login.login('standard_user', '')
  await page.login.loginUnsuccess('Password is required')
})

test.skip('não deve logar com usuário inexistente', async ({ page }) => {
  const username = faker.internet.username()

  await page.login.visit()
  await page.login.login(username, 'secret_sauce')
  await page.login.loginUnsuccess('Username and password do not match any user in this service')
})

test.skip('não deve logar com senha incorreta', async ({ page }) => {
  const password = faker.internet.password()

  await page.login.visit()
  await page.login.login('standard_user', password)
  await page.login.loginUnsuccess('Username and password do not match any user in this service')
})

test.skip('não deve logar sem preenchimento dos campos', async ({ page }) => {
  await page.login.visit()
  await page.login.login('', '')
  await page.login.loginUnsuccess('Username is required')
})
