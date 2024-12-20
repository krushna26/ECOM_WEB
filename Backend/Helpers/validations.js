const { check } = require('express-validator');

exports.UserRegisterValidations = [
    check('username', 'Name is required and should be at least 5 characters long')
        .isLength({ min: 5 }), // Changed 'minLength' to 'min'
    
    check('email', 'Enter a valid email')
        .isEmail()
        .normalizeEmail(),
    
    check('password', 'Password must contain at least one uppercase letter, one special character, one digit, and be a minimum of 8 characters long')
        .isStrongPassword({
            minLength: 8, // Ensures minimum length matches your error message description
            minLowercase: 1,
            minUppercase: 1,
            minSymbols: 1,
            minNumbers: 1
        }),
];

exports.productValidations=[
    check('name','Name is Required').notEmpty(),
    check('price','Price is Required').notEmpty(),
    check('color','Color is Required').notEmpty(),
    check('Category','Category is Required').notEmpty(),
    check('Description','Description is Required').notEmpty(),
    check('ProductImageurl','ProductImageurl is Required').notEmpty(),
    check('quantity','quantity is Required').notEmpty()
]; 

exports.forgotpasswordValidator=[
    
    check('password', 'Password must contain at least one uppercase letter, one special character, one digit, and be a minimum of 8 characters long')
    .isStrongPassword({
        minLength: 8, // Ensures minimum length matches your error message description
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1
    })
    ,
    check('email', 'Enter a valid email')
    .isEmail()
    .normalizeEmail()
];
exports.addnewaddressValidator = [
    check('useraddress.*.add_line1', 'Address Line 1 should not be empty').notEmpty(),
    check('useraddress.*.add_line2', 'Address Line 2 should not be empty').notEmpty(),
    check('useraddress.*.country', 'Country should not be empty').notEmpty(),
    check('useraddress.*.state', 'State should not be empty').notEmpty(),
    check('useraddress.*.district', 'District should not be empty').notEmpty(),
    check('useraddress.*.city', 'City should not be empty').notEmpty(),
    check('useraddress.*.pincode', 'Pincode should be 6 digits long')
      .isLength({ min: 6, max: 6 })
      .withMessage('Pincode should be 6 digits'),
  ];