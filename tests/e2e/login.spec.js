const { faker } = require('@faker-js/faker')
const { test } = require('../support')

test('realiza login', async ({ page }) => {
  await page.login.do('standard_user', 'secret_sauce')
})

test('não deve logar sem usuário', async ({ page }) => {
  await page.login.notDo('', 'secret_sauce', 'Username is required')
})

test.skip('não deve logar sem senha', async ({ page }) => {
  await page.login.notDo('standard_user', '', 'Password is required')
})

test.skip('não deve logar com usuário inexistente', async ({ page }) => {
  const username = faker.internet.username()

  await page.login.notDo(username, 'secret_sauce', 'Username and password do not match any user in this service')
})

test.skip('não deve logar com senha incorreta', async ({ page }) => {
  const password = faker.internet.password()

  await page.login.notDo('standard_user', password, 'Username and password do not match any user in this service')
})

test.skip('não deve logar sem preenchimento dos campos', async ({ page }) => {
  await page.login.notDo('', '', 'Username is required')
})
