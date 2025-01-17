const mongoose=require('mongoose');

const CartSchema = new mongoose.Schema({
  id:{
    type:Number,
    required:true,
    unique:true
  },
  title:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  image:{
    type:String,
    required:true
  },
  quantity:{
    type:Number
  },
  grandTotal:{
    type:Number
  },
  userId:{
    type:String,
    required:true
  }
})

const carts = mongoose.model('carts',CartSchema)
module.exports = carts