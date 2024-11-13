require('dotenv').config();

const { expect } = require('@playwright/test')

export class Login {

    constructor(page) {
        this.page = page
    }

    /**
     * Realiza o login com sucesso.
     * 
     * @param {string} username - O nome de usuário.
     * @param {string} password - A senha.
     */
    async do(username, password) {
        await this.visit()
        await this.login(username, password)
        await this.loginSuccess()
    }

    /**
     * Tenta realizar o login e verifica se a mensagem de erro esperada é exibida.
     * 
     * @param {string} username - O nome de usuário.
     * @param {string} password - A senha.
     * @param {string} mensagem - A mensagem de erro esperada.
     */
    async notDo(username, password, mensagem) {
        await this.visit()
        await this.login(username, password)
        await this.loginUnsuccess(mensagem)
    }

    /**
     * Navega para a página de login e verifica se o formulário de login está visível.
     */
    async visit() {
        await this.page.goto(process.env.BASE_URL)
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
     * Verifica se o login foi bem-sucedido ao verificar se a página de produtos está carregada corretamente.
     */
    async loginSuccess() {
        await this.page.waitForLoadState('networkidle')
        await expect(this.page.locator('.title')).toHaveText('Products')
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