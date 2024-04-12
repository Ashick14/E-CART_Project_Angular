const express = require('express')

const productController=require('../Controllers/productController')

const userController=require('../Controllers/userController')

const wishlistController=require('../Controllers/wishlistController')

const cartController=require('../Controllers/cartController')

const jwtMiddleware = require('../Middlewares/jwtMiddleware')

const router = new express.Router()
// http://localhost:3000
router.get('/all-products',productController.getAllProducts)

router.post('/user/register',userController.register)

router.post('/user/login',userController.login)

router.get('/view-product/:id',productController.viewAProduct)

router.post('/add-wishlist',jwtMiddleware,wishlistController.addToWishlist)

router.get('/get-wishlists',jwtMiddleware,wishlistController.getallWishlists)

router.delete('/delete-wishlist/:id',jwtMiddleware,wishlistController.deleteWishlist)

router.post('/add-cart',jwtMiddleware,cartController.addToCart)

router.get('/get-cart',jwtMiddleware,cartController.getAllCartItem)

router.delete('/delete-cart/:id',jwtMiddleware,cartController.deleteCartItem)

router.get('/increment-cart/:id',jwtMiddleware,cartController.incrementCart)

router.get('/decrement-cart/:id',jwtMiddleware,cartController.decrementCart)

module.exports = router