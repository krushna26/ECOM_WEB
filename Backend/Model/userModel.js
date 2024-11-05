    const { type } = require('express/lib/response');
const mongoose=require('mongoose')
    const userSchema=new mongoose.Schema({
        username:String,
        email:String,
        password:String,
        useraddress:[
            address={
                type:String
            },
            state={
                type:String
            },
            district={
                type:String
            },
            pin={
                type:Number
            }
        ],
        cartitems:[
        {
            productId:{type:mongoose.Schema.Types.ObjectId,ref:'product'},
            quantity:{type:Number,default:0},
        }
        ]
    });

    const User=mongoose.model('users',userSchema);

    module.exports=User
    