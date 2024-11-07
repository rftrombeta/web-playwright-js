const { expect } = require('@playwright/test')

export class CartPage {

    constructor(page) {
        this.page = page
    }

    async isCartPage() {
        await this.page.waitForLoadState('networkidle')
        await expect(this.page.locator('.inventory_details_name')).toHaveText('Your Cart')
    }    
}