const { test: base, expect } = require('@playwright/test')

const { AllProducts } = require('./actions/AllProducts')
const { YourCart } = require('./actions/YourCart')
const { Checkout } = require('./actions/Checkout')
const { Login } = require('./actions/Login')
const { ProductDetails } = require('./actions/ProductDetails')

const test = base.extend({
    page: async ({ page }, use) => {
        
        const context = page

        context['allProducts'] = new AllProducts(page)
        context['yourCart'] = new YourCart(page)
        context['checkout'] = new Checkout(page)
        context['login'] = new Login(page)
        context['productDetails'] = new ProductDetails(page)

        await use(context)

    }
})
export { test, expect }