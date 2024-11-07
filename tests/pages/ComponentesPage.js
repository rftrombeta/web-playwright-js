export class Burger {
    
    constructor(page) {
        this.page = page
    }
    
    async menu() {
        await this.page.locator('#react-burger-menu-btn').click()
    }
    
    async logout() {
        this.menu()
        await this.page.locator('#logout_sidebar_link').click()
    }
}

export class Cart {
    constructor(page) {
        this.page = page
    }

    async proceedToCart() {
        await this.page.locator('.shopping_cart_link').click()
    }

}
