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
        })
];
