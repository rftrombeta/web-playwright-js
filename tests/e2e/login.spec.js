const { faker } = require('@faker-js/faker')
const { test } = require('@playwright/test')

const { AllProductsPage } = require('../pages/AllProductsPage')
const { Burger } = require('../pages/ComponentesPage')
const { LoginPage } = require('../pages/LoginPage')

let burger
let loginPage
let allProductsPage

test.beforeEach(async ({ page }) => {
  burger = new Burger(page)
  loginPage = new LoginPage(page)
  allProductsPage = new AllProductsPage(page)
})

test('realiza login', async ({ page }) => {
  await loginPage.visit()
  await loginPage.login('standard_user', 'secret_sauce')
  await allProductsPage.loginSuccess()
})

test.skip('realiza Logout', async ({ page }) => {
  await loginPage.visit()
  await loginPage.login('standard_user', 'secret_sauce')
  await allProductsPage.loginSuccess()
  await burger.logout()
  await loginPage.isLoginIn()
})

test.skip('não deve logar sem usuário', async ({ page }) => {
  await loginPage.visit()
  await loginPage.login('', 'secret_sauce')
  await loginPage.loginUnsuccess('Username is required')
})

test.skip('não deve logar sem senha', async ({ page }) => {
  await loginPage.visit()
  await loginPage.login('standard_user', '')
  await loginPage.loginUnsuccess('Password is required')
})

test.skip('não deve logar com usuário inexistente', async ({ page }) => {
  const username = faker.internet.username()

  await loginPage.visit()
  await loginPage.login(username, 'secret_sauce')
  await loginPage.loginUnsuccess('Username and password do not match any user in this service')
})

test.skip('não deve logar com senha incorreta', async ({ page }) => {
  const password = faker.internet.password()

  await loginPage.visit()
  await loginPage.login('standard_user', password)
  await loginPage.loginUnsuccess('Username and password do not match any user in this service')
})

test.skip('não deve logar sem preenchimento dos campos', async ({ page }) => {
  await loginPage.visit()
  await loginPage.login('', '')
  await loginPage.loginUnsuccess('Username is required')
})
