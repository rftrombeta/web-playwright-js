const { expect } = require('@playwright/test')

export class LoginPage {

    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('https://www.saucedemo.com')
        await this.isLoginIn()
    }

    async isLoginIn() {
        const loginForm = this.page.locator('.login-box')
        await expect(loginForm).toBeVisible()
    }

    async login(username, password) {
        await this.page.getByPlaceholder('Username').fill(username)
        await this.page.getByPlaceholder('Password').fill(password)
        await this.page.getByRole('button', { name: 'Login' }).click()
    }

    async loginUnsuccess(target) {
        await expect(this.page.locator('.error-message-container')).toContainText(target)
    }
}