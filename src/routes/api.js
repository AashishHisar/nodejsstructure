const express=require('express');
const routes=express.Router();

const{getUserProfile,createUser,loginUser}=require("../controller/userController");
const{getProduct}=require("../controller/product")
//for user
routes.route('/create/user').post(createUser);
routes.route('/login/user').post(loginUser);
routes.route('/get/user/profile').get(getUserProfile);
routes.route('/get/products').get(getProduct);

module.exports=routes;