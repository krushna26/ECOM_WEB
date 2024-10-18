const express=require('express');
const router=express();
const userController=require('../Controller/userController');
const {UserRegisterValidations}=require('../Helpers/validations')
const bodyParser=require('body-parser');
router.use(bodyParser.json())
router.use(express.json())


router.post('/register',UserRegisterValidations,userController.Register)
router.post('/Login',userController.Login)
module.exports=router