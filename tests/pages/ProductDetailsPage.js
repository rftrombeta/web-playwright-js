const { expect } = require('@playwright/test')

export class ProductDetailsPage {

    constructor(page) {
        this.page = page
    }

    /**
     * Verifica se a página de detalhes do produto está carregada corretamente.
     * 
     * @param {string} product - O nome do produto esperado.
     */
    async isProductDetailsPage(product) {
        await this.page.waitForLoadState('networkidle')
        await expect(this.page.locator('.inventory_details_name')).toHaveText(product)
    }

    /**
     * Retorna os detalhes do produto.
     * 
     * @returns {Promise<Object>} - Um objeto contendo o nome, a descrição e o preço do produto.
     */
    async returnProductDetails() {
        return { 
            name: await this.page.locator('.inventory_details_name').textContent(),
            detail: await this.page.locator('.inventory_details_desc').textContent(),
            price: await this.page.locator('.inventory_details_price').textContent()
        }
    }

    /**
     * Adiciona o produto ao carrinho.
     */
    async addProductToCart() {
        await this.page.locator('#add-to-cart').click()
    }

    /**
     * Verifica se o produto foi adicionado ao carrinho.
     */
    async productAddedToCart() {
        expect(this.page.locator('#remove').toHaveText('Remove'))
    }
    
}