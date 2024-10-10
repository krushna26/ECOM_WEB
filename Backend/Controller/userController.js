require('dotenv').config();
const User=require('../Model/userModel');
const { validationResult } = require('express-validator');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const SecretKey=process.env.KEY


// const express=require('express');

const Register=async (req,res)=> {   
    try {
        const error=validationResult(req);       
        if (!error.isEmpty()){
            return  res.status(400).json({
                success:false,
                msg:'error',
                error:error.array()
            })
        } 
               
        const email=req.body.email;
        const pass=req.body.password;
        hsdpass=await bcrypt.hash(pass,10);
        const userdata=await User.findOne({email});
         
        if (userdata){
            return  res.status(400).json({
                success:false,
                msg:'User Already registered'
            })
        }

        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hsdpass,
            cartitems:[]
        });
        
        await newUser.save();
        return res.status(200).json({
            msg:"New User Added Successfully !"
        })

        
    } catch (error) {
        return  res.status(500).json({
            success:false,
            msg:"Server Error"
        })
        
    }

    
}

const Login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const userdata=await User.findOne({email});
        if(!userdata){
            return res.status(400).json(
                {
                success:false,
                msg:"Enter Valid email or Password"
            }
            )
        }

        const isMatch=await bcrypt.compare(password,userdata.password);
        // console.log(isMatch);
        
        if(!isMatch){
            return res.status(400).json(
                {
                success:false,
                msg:"Enter Valid email or Password"
            }
            )

        }
        // console.log(SecretKey);
        

        const token = jwt.sign({id:userdata._id,email: userdata.email }, SecretKey, { expiresIn: "1h" });
        // console.log(token);
        

        return res.status(200).json(
            {
                success:true,
                msg:"Loggedin Successfully",
                token:token
            }
        )



    }
    catch(error){
        return res.status(500).json({
            success:true,
            msg:"Server Error"
        })
    }
}

module.exports={
    Register,Login
}