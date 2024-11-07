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
        return await this.page.locator('.inventory_list .inventory_item_name').allTextContents()
    }

    async selectProduct(item) {
        // Clicar no item aleatório
        await this.page.locator(`text=${item}`).click();
    }
}