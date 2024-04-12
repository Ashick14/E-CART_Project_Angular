const products = require('../Models/productsSchema')

// get all products
exports.getAllProducts=async(req,res)=>{
    try{
        const AllProducts = await products.find()
        res.status(200).json(AllProducts)
    }
    catch(err){
        res.status(404).json(err)
    }
}

exports.viewAProduct=async(req,res)=>{
    const {id}=req.params
    try{
        const viewProduct = await products.findOne({id}) 
        res.status(200).json(viewProduct)
    }
    catch(err){
        res.status(404).json(err)
    }
}