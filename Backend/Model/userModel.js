    const mongoose=require('mongoose')

    const userSchema=new mongoose.Schema({
        username:String,
        email:String,
        password:String,
        cartitems:[
        {
            objectId:{type:mongoose.Schema.Types.ObjectId,ref:'product'},
            quantity:{type:Number,default:0},
        }
        ]
    });

    const User=mongoose.model('users',userSchema);

    module.exports=User
    