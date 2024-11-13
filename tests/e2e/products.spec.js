// const { faker } = require('@faker-js/faker')
const { insertProductDetailsInMongDb } = require('../support/database')
const { generateFakePeople } = require('../support/utils')
const { test } = require('../support')

test('deve adicionar um produto no carrinho e realizar o checkout', async ({ page }) => {

    await page.login.do('standard_user', 'secret_sauce')

    // Recuperar o texto de todos os produtos dentro da div com a classe 'inventory_list'
    const products = await page.allProducts.returnListOfProducts()

    // Selecionar um produto aleatório
    const randomIndex = Math.floor(Math.random() * products.length)
    const productName = products[randomIndex]

    page.allProducts.selectProduct(productName)
    page.productDetails.isProductDetailsPage(productName)

    await page.productDetails.addProductToCart()

    await page.yourCart.proceedToCart()

    await page.yourCart.isCartPage()

    await page.yourCart.proceedToCheckout()

    // await checkoutPage.isCheckoutYourInformationPage()
    await page.checkout.isCheckoutPage('Your Information')

    const people = generateFakePeople(1); // Gere 1 entrada de dados falsos
    const { firstName, lastName, zipCode } = people[0];

    await page.checkout.setYourInformation(firstName, lastName, zipCode)

    await page.checkout.isCheckoutPage('Overview')

    //Listar os produtos as respectivas informações na página de overview
    const overviewProducts = await page.checkout.listOverviewProducts()

    // Enviar para o banco de dados as iformações do usuário e os produtos
    await insertProductDetailsInMongDb(firstName, lastName, zipCode, overviewProducts)
    
    await page.checkout.finishCheckout()

    await page.checkout.isCheckoutPage('Complete!')
})