const { faker } = require('@faker-js/faker')
const { test } = require('../support');

const { connectToDatabase } = require('../support/database')

test('deve adicionar um produto no carrinho e realizar o checkout', async ({ page }) => {
    // é importante que o teste seja executado em uma página de produtos
    await page.login.visit()
    await page.login.login('standard_user', 'secret_sauce')
    await page.allProducts.loginSuccess()

    // Recuperar o texto de todos os produtos dentro da div com a classe 'inventory_list'
    const products = await page.allProducts.returnListOfProducts()

    // Selecionar um produto aleatório
    const randomIndex = Math.floor(Math.random() * products.length)
    const productName = products[randomIndex]

    page.allProducts.selectProduct(productName)
    page.productDetails.isProductDetailsPage(productName)

    // const product = await page.productDetails.returnProductDetails()

    await page.productDetails.addProductToCart()

    await page.cart.proceedToCart()

    await page.myCart.isCartPage()

    await page.myCart.proceedToCheckout()

    // await checkoutPage.isCheckoutYourInformationPage()
    await page.checkout.isCheckoutPage('Your Information')

    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const zipCode = faker.location.zipCode()

    await page.checkout.setYourInformation(firstName, lastName, zipCode)

    // await checkoutPage.isCheckoutOverviewPage()
    await page.checkout.isCheckoutPage('Overview')

    //Listar os produtos as respectivas informações na página de overview
    const overviewProducts = await page.checkout.listOverviewProducts()

    // Conectar ao banco de dados e armazenar os dados
    const db = await connectToDatabase()
    const collection = db.collection('orders') // Substitua pelo nome da sua coleção
    await collection.insertOne({
        firstName,
        lastName,
        zipCode,
        products: overviewProducts,
        date: new Date()
    })
    
    await page.checkout.finishCheckout()

    await page.checkout.isCheckoutPage('Complete!')
})