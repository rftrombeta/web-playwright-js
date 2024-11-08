export class Burger {
    
    constructor(page) {
        this.page = page
    }
    
    /**
     * Abre o menu de navegação.
     */
    async menu() {
        await this.page.locator('#react-burger-menu-btn').click()
    }
    
    /**
     * Realiza o logout do usuário.
     */
    async logout() {
        this.menu()
        await this.page.locator('#logout_sidebar_link').click()
    }
}

export class Cart {
    constructor(page) {
        this.page = page
    }

    /**
     * Navega para a página do carrinho.
     */
    async proceedToCart() {
        await this.page.locator('.shopping_cart_link').click()
    }

}
