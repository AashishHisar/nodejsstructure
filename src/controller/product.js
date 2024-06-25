const getProduct=async(req,res)=>{
     res.status(200).json({"message":"get api for products"});
}

module.exports={getProduct}