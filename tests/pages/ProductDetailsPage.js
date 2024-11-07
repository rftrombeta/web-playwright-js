const { expect } = require('@playwright/test')

export class ProductDetailsPage {

    constructor(page) {
        this.page = page
    }

    async isProductDetailsPage(product) {
        await this.page.waitForLoadState('networkidle')
        await expect(this.page.locator('.inventory_details_name')).toHaveText(product)
    }

    async returnProductDetails() {
        return { 
            name: await this.page.locator('.inventory_details_name').textContent(),
            detail: await this.page.locator('.inventory_details_desc').textContent(),
            price: await this.page.locator('.inventory_details_price').textContent()
        }
    }

    async addProductToCart() {
        await this.page.locator('#add-to-cart').click()
    }

    async productAddedToCart() {
        expect(this.page.locator('#remove').toHaveText('Remove'))
    }
    
}