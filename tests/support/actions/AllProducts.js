export class AllProducts {

    constructor(page) {
        this.page = page
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