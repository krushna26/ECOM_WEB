const mongoose=require('mongoose');
const cartSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    product:[
        {
            product:{type:mongoose.Schema.Types.ObjectId,ref:'product'},
            quantity:{Type:Number,default:0}
        }
    ]

})

const Cart=new mongoose.model('carts',cartSchema);
module.exports=Cart;
