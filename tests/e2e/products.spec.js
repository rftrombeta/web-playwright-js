// const { connectToDatabase } = require('../db') // Importe a função de conexão com o banco de dados
const { faker } = require('@faker-js/faker')
const { test } = require('@playwright/test');

const { AllProductsPage } = require('../pages/AllProductsPage')
const { Cart } = require('../pages/ComponentesPage')
const { CartPage } = require('../pages/CartPage')
const { CheckoutPage } = require('../pages/CheckoutPage')
const { LoginPage } = require('../pages/LoginPage')
const { ProductDetailsPage } = require('../pages/ProductDetailsPage')

let allProductsPage
let cart
let cartPage
let checkoutPage
let loginPage
let productDetails

test.beforeEach(async ({ page }) => {
    allProductsPage = new AllProductsPage(page)
    cart = new Cart(page)
    cartPage = new CartPage(page)
    checkoutPage = new CheckoutPage(page)
    loginPage = new LoginPage(page)
    productDetails = new ProductDetailsPage(page)
})

test('deve selecionar um produto e mostrar os detalhes', async ({ page }) => {
    // é importante que o teste seja executado em uma página de produtos
    await loginPage.visit()
    await loginPage.login('standard_user', 'secret_sauce')
    await allProductsPage.loginSuccess()

    // Recuperar o texto de todos os produtos dentro da div com a classe 'inventory_list'
    const products = await allProductsPage.returnListOfProducts()

    // Selecionar um produto aleatório
    const randomIndex = Math.floor(Math.random() * products.length)
    const productName = products[randomIndex]

    allProductsPage.selectProduct(productName)
    productDetails.isProductDetailsPage(productName)

    const product = await productDetails.returnProductDetails()
    console.log(`Produto selecionado: ${product.name}`)
    console.log(`Descrição do produto: ${product.detail}`)
    console.log(`Preço do produto: ${product.price}`)
})

test('deve adicionar um produto no carrinho e realizar o checkout', async ({ page }) => {
    // é importante que o teste seja executado em uma página de produtos
    await loginPage.visit()
    await loginPage.login('standard_user', 'secret_sauce')
    await allProductsPage.loginSuccess()

    // Recuperar o texto de todos os produtos dentro da div com a classe 'inventory_list'
    const products = await allProductsPage.returnListOfProducts()

    // Selecionar um produto aleatório
    const randomIndex = Math.floor(Math.random() * products.length)
    const productName = products[randomIndex]

    allProductsPage.selectProduct(productName)
    productDetails.isProductDetailsPage(productName)

    const product = await productDetails.returnProductDetails()
    console.log(`Produto selecionado: ${product.name}`)
    console.log(`Descrição do produto: ${product.detail}`)
    console.log(`Preço do produto: ${product.price}`)

    await productDetails.addProductToCart()

    await cart.proceedToCart()

    await cartPage.isCartPage()

    await cartPage.proceedToCheckout()

    // await checkoutPage.isCheckoutYourInformationPage()
    await checkoutPage.isCheckoutPage('Your Information')

    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const zipCode = faker.location.zipCode()

    await checkoutPage.setYourInformation(firstName, lastName, zipCode)

    // await checkoutPage.isCheckoutOverviewPage()
    await checkoutPage.isCheckoutPage('Overview')

    //Listar os produtos as respectivas informações na página de overview
    const overviewProducts = await checkoutPage.listOverviewProducts()

    // Conectar ao banco de dados e armazenar os dados
    // const db = await connectToDatabase();
    // const collection = db.collection('orders'); // Substitua pelo nome da sua coleção
    // await collection.insertOne({
    //     firstName,
    //     lastName,
    //     zipCode,
    //     products: overviewProducts,
    //     date: new Date()
    // });
    
    await checkoutPage.finishCheckout()

    await checkoutPage.isCheckoutPage('Complete!')
})