const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findOne({ "_id": req.user._id }).select('-password -createdAt -updatedAt');
        console.log("data", user);
        res.status(200).send({ "data": user, "message": "user get profile successfully" });
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
}

const createUser = async (req, res) => {
    const { first_name, email, password } = req.body;
    // Validate input
    if (first_name || !email || !password) {
        return res.status(400).send({ "message": "Name, email, and password are required" });
    }
    const checkExist = await User.findOne({ email });
    if (checkExist) {
        res.status(400).send({ "message": "this email is already exist" });
    }
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const checkExist = await User.findOne({ email });
    if (!checkExist) {
        res.status(400).send({ "message": "Your Account is not exist" });
    } else {
        const isMatchPassword = await checkExist.comparePassword(String(password));
        if (!isMatchPassword) {
            return res.status(400).send({ "message": 'Invalid credentials' });
        }
        const token = jwt.sign({ _id: checkExist._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).header('Authorization', token).send({ "message": "login user successfully", 'token': token });
    }

}

module.exports = { getUserProfile, createUser, loginUser }