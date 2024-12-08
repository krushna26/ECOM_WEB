require("dotenv").config();
const User = require("../Model/userModel");
const Product = require("../Model/product");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SecretKey = process.env.KEY;

const Register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Validation Error",
        errors: errors.array(),
      });
    }

    const { username, email, password, useraddress } = req.body; // Destructure from request body
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        msg: "User already registered",
      });
    }

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      useraddress,
      cartitems: [],
    });
    await newUser.save();
    return res.status(201).json({
      success: true,
      msg: "New user added successfully!",
    });
  } catch (error) {
    console.error("Error in Register:", error);
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body; // Destructure from request body
    const userData = await User.findOne({ email });

    if (!userData) {
      return res.status(401).json({
        success: false,
        msg: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        msg: "Invalid email or password",
      });
    }

    if (!SecretKey) {
      return res.status(500).json({
        success: false,
        msg: "Server error: Secret key not defined",
      });
    }

    const token = jwt.sign(
      { id: userData._id, email: userData.email },
      SecretKey,
      { expiresIn: "0.1h" }
    );

    return res.status(200).json({
      success: true,
      msg: "Logged in successfully",
      token: token,
    });
  } catch (error) {
    // console.error("Error in Login:", error);
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

const getbyId = async function (req, res) {
  try {
    const itemId = req.params.id;
    const res1 = await User.findById(itemId);
    if (res1) {
      return res.status(200).json({
        success: true,
        data: res1,
      });
    } else {
      res.status(400).json({
        success: false,
        error: "Id is not Valid",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

const cartupdate = async (req, res) => {
  const userId = req.body.userId;
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  // console.log(userId);
  const usedata = await User.findById(userId);
  const productdata = await Product.findById(productId);
  if (!usedata | !productdata) {
    return res.status(400).json({
      success: false,
      msg: "No User/Product Found in the Database",
    });
  }

  let cartfromuser = usedata.cartitems;
  let c = [];
  for (let i = 0; i < cartfromuser.length; i++) {
    if (cartfromuser[i].productId == productId) {
      c.push(i);
      cartfromuser[i].quantity = cartfromuser[i].quantity + quantity;
    }
  }

  if (c.length == 0) {
    v = {
      productId: productId,
      quantity: quantity,
    };
    cartfromuser.push(v);
  }
  await User.findByIdAndUpdate({ _id: userId }, { cartitems: cartfromuser });

  return res.status(200).json({
    msg: "Added to cart !",
  });
};
const forgotpassword = async (req, res) => {
  try {
    const data = await User.findOne({ email: req.body.email });
    if (data) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      console.log(hashedPassword);

      await User.findByIdAndUpdate(
        { _id: data._id },
        {
          password: hashedPassword,
        }
      );

      console.log("Password Reseted Successfully !!");

      res.status(200).json({
        success: true,
        msg: "Password Reseted Successfully !",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: error,
    });
  }
};

const addnewaddress = async (req, res) => {        
  try {
    const id = req.params.id;
    const add = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Validation Error",
        errors: errors.array(),
      });
    }
    const data = await User.findById(id);

    if (!data) {
      return res.status(400).json({
        success: false,
        msg: "No User Found!",
      });
    }

    const add1 = [
      add.add_line1,
      add.add_line2,
      add.country,
      add.state,
      add.District,
      add.city,
      add.pincode,
    ];

    let oldadd = data.useraddress;
    oldadd.push(add1);
    const eer = await User.findByIdAndUpdate(id, data);
    return res.status(200).json({
      success: true,
      msg: "Added New address!",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: error,
    });
  }
};


const order=async(req,res)=>{
  

}



module.exports = {
  Register,
  Login,
  getbyId,
  cartupdate,
  forgotpassword,
  addnewaddress,
  order

};
