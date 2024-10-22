const express=require('express');
const router=express();
const productController=require('../Controller/productController')
const{productValidations}=require('../Helpers/validations')
const bodyParser=require('body-parser');
router.use(bodyParser.json())
router.use(express.json())

router.get('/:id',productController.getProductByID);
router.post('/add',productValidations,productController.addproduct);
router.get('/',productController.getallProducts);



module.exports=router