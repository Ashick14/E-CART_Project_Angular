const wishlists=require('../Models/wishlistSchema')

exports.addToWishlist=async(req,res)=>{

    const{id,title,price,image}=req.body
    const userId = req.payload
    try{
        const wishlistItem = await wishlists.findOne({id})
        if(wishlistItem){
            res.status(404).json("Product already exists")
        }
        else{
            const newProduct = new wishlists({
                id,title,price,image,userId
            })
            await newProduct.save()
            res.status(200).json("Product Added Successfully")
        }
    }
    catch(err){
        res.status(400).json(err)
    }
}

exports.getallWishlists=async(req,res)=>{
    const userId=req.payload
    try{
        const getWishlist = await wishlists.find({userId:userId})
        res.status(200).json(getWishlist)
    }
    catch(err){
        res.status(400).json(err)
    }
}

exports.deleteWishlist=async(req,res)=>{
    const {id} = req.params
    const userId = req.payload
    try{
        const deleteAWishlist = await wishlists.deleteOne({id})
        if(deleteAWishlist){
            const AllProducts = await wishlists.find({userId:userId})
            res.status(200).json(AllProducts)
        }
    }
    catch(err){
        res.status(404).josn(err)
    }
}