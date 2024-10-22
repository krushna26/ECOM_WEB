const mongoose=require('mongoose');

const productsSchema=new mongoose.Schema({
        name:String,
        price:String,
        color:String,
        Category:String,
        Description:String,
        ProductImageurl:String,        
        quantity:Number
});

const Product=new mongoose.model('products',productsSchema);
module.exports=
    Product

