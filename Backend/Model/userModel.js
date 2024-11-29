    // const { type } = require('express/lib/response');
const mongoose=require('mongoose')
    const userSchema=new mongoose.Schema({
        username:String,
        email:String,
        password:String,
        useraddress:[
            [
            add_line1={
                type:String
            },
            add_line2={
                type:String
            },
            country={
                type:String
            },
            state={
                type:String
            },
            District={
                type:String
            },
            city={
                type:String
            },
            pincode={
                type:Number
            }
        ]
        ],
        cartitems:[
        {
            productId:{type:mongoose.Schema.Types.ObjectId,ref:'product'},
            quantity:{type:Number,default:0},
        }
        ],
        oders:[
            {
                add: {
                    add_line1:
                    String,
                    add_line2:String,
                    country:String,
                    state:String,
                    District:String,
                    city:String,
                    pincode:String
                },
                items:[
                    {
                        name:String,
                        price:String,
                        color:String,
                        Category:String,
                        Description:String,
                        ProductImageurl:String,        
                        quantity:Number
                    }
                ],
                payementdetails:{
                    payment_mode:String,

                }


            }
        ]
    });

    const User=mongoose.model('users',userSchema);

    module.exports=User
    