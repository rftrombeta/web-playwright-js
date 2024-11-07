const { test } = require('@playwright/test');

const { AllProductsPage } = require('../pages/AllProductsPage')
const { Cart } = require('../pages/ComponentesPage')
const { LoginPage } = require('../pages/LoginPage')
const { ProductDetailsPage } = require('../pages/ProductDetailsPage')
const { CartPage } = require('../pages/CartPage')   

let allProductsPage
let loginPage
let productDetails
let cart

test.beforeEach(async ({ page }) => {
    allProductsPage = new AllProductsPage(page)
    cart = new Cart(page)
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

    // Adicionar o produto ao carrinho
    await productDetails.addProductToCart()

    await cart.proceedToCart()
})