const express=require('express');
const router=express();
const userController=require('../Controller/userController');
const {UserRegisterValidations}=require('../Helpers/validations')
router.use(express.json())


router.post('/register',UserRegisterValidations,userController.Register)
router.get('/Login',userController.Login)
module.exports=router