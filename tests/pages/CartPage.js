const { expect } = require('@playwright/test')

export class CartPage {

    constructor(page) {
        this.page = page
    }

    async isCartPage() {
        await this.page.waitForLoadState('networkidle')
        await expect(this.page.locator('.title')).toHaveText('Your Cart')
    }

    async proceedToCheckout() {
        await this.page.locator('#checkout').click()
    }
}