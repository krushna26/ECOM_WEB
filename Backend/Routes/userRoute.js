const express=require('express');
const router=express();
const userController=require('../Controller/userController');
const {UserRegisterValidations,forgotpasswordValidator}=require('../Helpers/validations')
const bodyParser=require('body-parser');
router.use(bodyParser.json())
router.use(express.json())


router.post('/register',UserRegisterValidations,userController.Register)
router.post('/Login',userController.Login)
router.get('/:id',userController.getbyId)
router.patch('/updateProduct',userController.cartupdate)
router.patch('/forgot-password',forgotpasswordValidator,userController.forgotpassword)
module.exports=router