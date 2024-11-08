const { expect } = require('@playwright/test')

export class AllProductsPage {

    constructor(page) {
        this.page = page
    }

    /**
     * Verifica se o login foi bem-sucedido ao verificar se a página de produtos está carregada corretamente.
     */
    async loginSuccess() {
        await this.page.waitForLoadState('networkidle')
        await expect(this.page.locator('.title')).toHaveText('Products')
    }

    /**
     * Retorna a lista de produtos, excluindo o produto "Sauce Labs Bolt T-Shirt".
     * 
     * @returns {Promise<Array<string>>} - Uma promessa que devolve uma lista de nomes de produtos.
     */
    async returnListOfProducts() {
        const products = await this.page.locator('.inventory_list .inventory_item_name').allTextContents()
        return products.filter(product => product !== 'Sauce Labs Bolt T-Shirt')
    }

    /**
     * Seleciona um produto na lista de produtos.
     * 
     * @param {string} item - O nome do produto a ser selecionado.
     */
    async selectProduct(item) {
        await this.page.locator(`text=${item}`).click();
    }
}