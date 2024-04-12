const carts = require('../Models/cartSchema')
const cart = require('../Models/cartSchema')

exports.addToCart=async(req,res)=>{
    const{id,title,price,image,quantity}=req.body
    const userId=req.payload

    try{
        const cartItem = await cart.findOne({id})
        if(cartItem){
            cartItem.quantity+=1
            cartItem.price=cartItem.quantity*cartItem.price
            res.status(200).json("Product details updated")
        }
        else{
            const newCartItem = new cart({id,title,price,image,quantity,userId})
            await newCartItem.save()
            res.status(200).json("Product Added To Cart")
        }
    }
    catch(err){
        res.status(404).json(err)
    }
}

exports.getAllCartItem=async(req,res)=>{
    const userId=req.payload
    try{
        const getCartItem = await cart.find({userId:userId})
        res.status(200).json(getCartItem)
    }
    catch(err){
        res.status(404).json(err)
    }
}

exports.deleteCartItem=async(req,res)=>{
    const userId=req.payload
    const {id}=req.params
    try{
        const deleteCart = await cart.deleteOne({id})
        if(deleteCart){
            const AllProducts = await cart.find({userId:userId})
            res.status(200).json(AllProducts)
        }
    }
    catch(err){
        res.status(404).josn(err)
    }
}

exports.incrementCart=async(req,res)=>{
    const {id} = req.params
    const userid=req.payload
    try{
        const incrementCartItem = await cart.findOne({id})
        if(incrementCartItem){
            incrementCartItem.quantity+=1
            incrementCartItem.grandTotal = incrementCartItem.price*incrementCartItem.quantity
            await incrementCartItem.save()
            const allcartItems = await carts.find({userId:userid})
            res.status(200).json(allcartItems)
        }
        else{
            res.status(402).json("Item not found")
        }
    }
    catch(err){
        res.status(402).json(err)
    }
}

exports.decrementCart=async(req,res)=>{
    const {id} = req.params
    const userid=req.payload
    try{
        const decrementCartItem = await cart.findOne({id})
        if(decrementCartItem){
            decrementCartItem.quantity-=1
            if(decrementCartItem.quantity===0){
                const deleteCart = await cart.deleteOne({id})
                if(deleteCart){
                    const AllProducts = await cart.find({userId:userId})
                    res.status(200).json(AllProducts)
                }
            }
            else{
                decrementCartItem.grandTotal = decrementCartItem.price*decrementCartItem.quantity
            
                await decrementCartItem.save()
                const allcartItems = await carts.find({userId:userid})
                res.status(200).json(allcartItems)
            }
          
        }
        else{
            res.status(402).json("Item not found")
        }
    }
    catch(err){
        res.status(402).json(err)
    }
}