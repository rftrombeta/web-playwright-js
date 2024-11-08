const { expect } = require('@playwright/test')

export class YourCart {

    constructor(page) {
        this.page = page
    }

    /**
     * Navega para a página do carrinho.
     */
    async proceedToCart() {
        await this.page.locator('.shopping_cart_link').click()
    }
    
    /**
     * Verifica se a página do carrinho está carregada corretamente.
     */
    async isCartPage() {
        await this.page.waitForLoadState('networkidle')
        await expect(this.page.locator('.title')).toHaveText('Your Cart')
    }

    /**
     * Prossegue para a página de checkout a partir do carrinho.
     */
    async proceedToCheckout() {
        await this.page.locator('#checkout').click()
    }
}