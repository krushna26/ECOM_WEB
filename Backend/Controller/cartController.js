
const Product = require('../Model/product');
const User = require('../Model/userModel');


const getProductByID= async function (req,res){
    try {
        const id=req.params.id;
        const cartproductforParticularUser=await Product.findById({_id:id});
        if (cartproductforParticularUser){
            

            // Need to wrok here 
        }
    } catch (error) {
        return res.status(500).json({
            sucess:false,
            msg:'error',
            error:error
        })
        
    }

}
module.exports={
    getProductByID
}