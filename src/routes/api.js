const express=require('express');
const routes=express.Router();
const jwt=require('../middleware/auth');
const{getUserProfile,createUser,loginUser,logoutUser}=require("../controller/userController");
const{getProduct,createProduct}=require("../controller/product")

//for user
routes.route('/create/user').post(createUser);
routes.route('/login/user').post(loginUser);
routes.route('/get/user/profile').get(jwt.jwtMiddleware,getUserProfile);
routes.route('/get/products').get(jwt.jwtMiddleware,getProduct);
//for Products api
routes.route('/create/product').post(jwt.jwtMiddleware,createProduct)

module.exports=routes;