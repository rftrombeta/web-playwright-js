const { test: base, expect } = require('@playwright/test')

const { AllProductsPage } = require('../pages/AllProductsPage')
const { Burger, Cart } = require('../pages/Components')
const { CartPage } = require('../pages/CartPage')
const { CheckoutPage } = require('../pages/CheckoutPage')
const { LoginPage } = require('../pages/LoginPage')
const { ProductDetailsPage } = require('../pages/ProductDetailsPage')

const test = base.extend({
    page: async ({ page }, use) => {
        await use({
            ...page,
            allProducts: new AllProductsPage(page),
            burguer: new Burger(page),
            cart: new Cart(page),
            myCart: new CartPage(page),
            checkout: new CheckoutPage(page),
            login: new LoginPage(page),
            productDetails: new ProductDetailsPage(page)
        })
    }
})
export { test, expect }