const express=require('express');
const router=express();
const cartController=require('../Controller/cartController');
// const {UserRegisterValidations}=require('../Helpers/validations')
const bodyParser=require('body-parser');
router.use(bodyParser.json())
router.use(express.json())

router.length('/:id',cartController.getProductByID)


module.exports=router