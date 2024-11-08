const { expect } = require('@playwright/test')

export class LoginPage {

    constructor(page) {
        this.page = page
    }

    /**
     * Navega para a página de login e verifica se o formulário de login está visível.
     */
    async visit() {
        await this.page.goto('https://www.saucedemo.com')
        await this.isLoginIn()
    }

    /**
     * Verifica se o formulário de login está visível na página.
     */
    async isLoginIn() {
        const loginForm = this.page.locator('.login-box')
        await expect(loginForm).toBeVisible()
    }

    /**
     * Realiza o login com o nome de usuário e senha fornecidos.
     * 
     * @param {string} username - O nome de usuário.
     * @param {string} password - A senha.
     */
    async login(username, password) {
        await this.page.getByPlaceholder('Username').fill(username)
        await this.page.getByPlaceholder('Password').fill(password)
        await this.page.getByRole('button', { name: 'Login' }).click()
    }

    /**
     * Verifica se a mensagem de erro esperada está presente na página após uma tentativa de login mal sucedida.
     * 
     * @param {string} mensagem - O texto esperado da mensagem de erro.
     */
    async loginUnsuccess(mensagem) {
        await expect(this.page.locator('.error-message-container')).toContainText(mensagem)
    }
}