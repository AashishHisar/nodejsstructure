const User = require('../models/user');
const bcrypt = require('bcrypt');
const getUserProfile = async (req, res) => {
    try {
        const users = await User.findById("66759755fbc147c15fed774f");
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
}

const createUser = async (req, res) => {
    const { first_name, email, password } = req.body;

    if (!first_name) {
        return res.status(400).send({ error: 'First name is required.' });
    }
    if (!email) {
        return res.status(400).send({ error: 'Email is required.' });
    }
    if (!password) {
        return res.status(400).send({ error: 'Password is required.' });
    }
    try {
        const user = new User(req.body);
        console.log()
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        if (error.code === 11000) { // Duplicate email error
            return res.status(400).send({ error: 'Email already exists.' });
        }
        res.status(400).send(error);
    }
};
 
const loginUser=async(req,res)=>{
     const {email,password}=req.body;
     res.status(200).send({"message":"login user successfully"});
}

module.exports = { getUserProfile, createUser ,loginUser}