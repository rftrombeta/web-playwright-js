const { expect } = require('@playwright/test')

export class AllProductsPage {

    constructor(page) {
        this.page = page
    }

    async loginSuccess() {
        await this.page.waitForLoadState('networkidle')
        await expect(this.page.locator('.title')).toHaveText('Products')
    }

    async returnListOfProducts() {
        // return await this.page.locator('.inventory_list .inventory_item_name').allTextContents()
        const products = await this.page.locator('.inventory_list .inventory_item_name').allTextContents()
        return products.filter(product => product !== 'Sauce Labs Bolt T-Shirt')
    }

    async selectProduct(item) {
        // Clicar no item aleatório
        await this.page.locator(`text=${item}`).click();
    }
}