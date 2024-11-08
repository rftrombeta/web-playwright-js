const { expect } = require('@playwright/test')

export class Checkout {

    constructor(page) {
        this.page = page
    }

    /**
     * Verifica se a página de checkout está carregada corretamente.
     * 
     * @param {string} checkoutPage - O título esperado da página de checkout.
     */
    async isCheckoutPage(checkoutPage) {
        await this.page.waitForLoadState('networkidle')
        await expect(this.page.locator('.title')).toHaveText(`Checkout: ${checkoutPage}`)
    }

    /**
     * Preenche as informações do usuário na página de checkout.
     * 
     * @param {string} firstName - O primeiro nome do usuário.
     * @param {string} lastName - O sobrenome do usuário.
     * @param {string} postalCode - O código postal do usuário.
     */
    async setYourInformation(firstName, lastName, postalCode) {
        await this.page.getByPlaceholder('First Name').fill(firstName)
        await this.page.getByPlaceholder('Last Name').fill(lastName)
        await this.page.getByPlaceholder('Zip/Postal Code').fill(postalCode)
        await this.page.getByRole('button', { name: 'Continue' }).click()
    }

    /**
     * Finaliza o processo de checkout.
     */
    async finishCheckout() {
        await this.page.getByRole('button', { name: 'finish' }).click()
    }

    /**
     * Lista os produtos e suas respectivas informações na página de overview.
     * 
     * @returns {Promise<Array<Object>>} - Uma promessa que devolve uma lista de objetos contendo os detalhes dos produtos.
     */
    async listOverviewProducts() {
        const products = await this.page.locator('.cart_list').all()
        const productDetails = []
        for (const product of products) {
            const name = await product.locator('.inventory_item_name').textContent()
            const description = await product.locator('.inventory_item_desc').textContent()
            const price = await product.locator('.inventory_item_price').textContent()
            console.log(`Produto: ${name}`)
            console.log(`Descrição: ${description}`)
            console.log(`Preço: ${price}`)
            productDetails.push({ name, description, price })
        }

        const subtotal = await this.page.locator('.summary_subtotal_label').textContent()
        const tax = await this.page.locator('.summary_tax_label').textContent()
        const total = await this.page.locator('.summary_total_label').textContent()

        console.log(`Subtotal: ${subtotal}`)
        console.log(`Taxa: ${tax}`)
        console.log(`Total: ${total}`)

        return { productDetails, subtotal, tax, total }
    }
}
